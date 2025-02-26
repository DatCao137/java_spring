package grouphome.webapp.service.impl;

import grouphome.webapp.entity.OfficeDocPathEntity;
import grouphome.webapp.entity.OfficeDocEntity;
import grouphome.webapp.entity.OfficeDocFileEntity;
import grouphome.webapp.repository.define.office.OfficeDocPathRepository;
import grouphome.webapp.repository.define.office.OfficeDocRepository;
import grouphome.webapp.repository.define.office.OfficeDocFileRepository;
import grouphome.webapp.repository.define.office.OfficeDocFileRepositoryCustom;
import grouphome.webapp.service.define.DocManageService;
import grouphome.webapp.dto.responses.office.doc.ListResponseDto;
import grouphome.webapp.dto.responses.office.doc.SaveDocFileResponseDto;
import grouphome.webapp.dto.requests.office.DocRequestDto;
import grouphome.webapp.dto.requests.office.DocSaveRequestDto;
import grouphome.webapp.dto.responses.blc_common.PagerResponse;
import grouphome.webapp.utils.Exchanger;
import grouphome.webapp.utils.ResponseCodeAndMsg;

import grouphome.webapp.exception.ApiException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDateTime;
import java.io.Console;
import java.util.ArrayList;
import java.util.List;
import java.util.Base64;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

@Service
public class DocManageServiceImpl implements DocManageService {
    @Autowired
    private OfficeDocPathRepository officeDocPathRepository;

    @Autowired
    private OfficeDocRepository officeDocRepository;

    @Autowired
    private OfficeDocFileRepository officeDocFileRepository;

    private final OfficeDocFileRepositoryCustom officeDocFileRepositoryCustom;

    @Autowired
    public DocManageServiceImpl(OfficeDocFileRepositoryCustom officeDocFileRepositoryCustom) {
        this.officeDocFileRepositoryCustom = officeDocFileRepositoryCustom;
    }

    public List<Object[]> findAll() {
        List<Object[]> lst = new ArrayList<Object[]>();
        return lst;
    }

    /**
     * getAllDocPath
     *
     * @return List<OfficeDocPathEntity>
     */
    @Override
    public List<OfficeDocPathEntity> getAllDocPath() {
        return officeDocPathRepository.findAll();
    }

    /**
     * getDocManageList
     *
     * @return List<ListResponseDto>
     */
    @Override
    public PagerResponse<List<ListResponseDto>> getDocManageList(DocRequestDto request) {
        Pageable page = PageRequest.of(request.getPageNumber() - 1, request.getPageSize());
        
        Page<ListResponseDto> pageResult = officeDocFileRepositoryCustom.findAll(request, page);

        PagerResponse<List<ListResponseDto>> response = new PagerResponse<>();
        response.setData(pageResult.getContent());
        response.setTotalRecord((int) pageResult.getTotalElements());
        response.setTotalPage(pageResult.getTotalPages());
        return response;

    }

    /**
     * getDocFileDetail
     *
     * @return OfficeDocFileEntity
     */
    @Override
    public OfficeDocFileEntity getDocFileDetail(Integer id) {
        return officeDocFileRepository.getDocFileDetail(id);
    }

    /**
     * getDocFileHistory
     *
     * @return List<OfficeDocFileEntity>
     */
    @Override
    public List<OfficeDocFileEntity> getDocFileHistory(Integer id, Integer docId, Integer pathId) {
        
        return officeDocFileRepository.getDocFileHistory(pathId, docId );

    }

    @Override
    @Transactional
    public SaveDocFileResponseDto saveDocFileInfo(DocSaveRequestDto request) {
        // Check if homeInfoId exists and is not deleted
        if (request.getId() != null && request.getId() != 0 && !officeDocFileRepository.existsById(request.getId())) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST,
                    "File Info with ID: " + request.getId() + " does not exist or is deleted");
        }

        // save table d_office_doc
        Long docId = this.saveDocEntity(request);
        request.setDocId(docId);

        // save table d_office_doc_file
        Long fileId = this.saveDocFileEntity(request);

        return new SaveDocFileResponseDto(fileId, docId, request.getPathId());
    }

    @Transactional
    private Long saveDocEntity(DocSaveRequestDto request) {
        Long docId = request.getDocId();

        OfficeDocEntity entity = (docId == null)
                ? new OfficeDocEntity()
                : officeDocRepository.findById4Update(docId).orElseGet(OfficeDocEntity::new);

        // if((entity.getUpdated_at() != null)
        // && (!entity.getUpdated_at().isEqual(dto.getUpdatedAtAddr()))) {
        //     throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
        // }
        entity.setPathId(request.getPathId());
        entity.setName(request.getDocName());

        // entity.setUpdatedAt(request.getUpdatedAtAddr());
        OfficeDocEntity ret = officeDocRepository.save(entity);
        return ret.getId();
    }

    @Transactional
    private Long saveDocFileEntity(DocSaveRequestDto request) {
        Long fileId = request.getId();
        Long oldId = request.getOldId();
        String comment = request.getComment();

        if(fileId == oldId && oldId != 0){
            // update File info
            LocalDateTime updateddAt = LocalDateTime.now();
            officeDocFileRepository.updateFileInfo(fileId, comment, updateddAt);

            return request.getId();
        }

        if(oldId != 0){
            // delete File info old
            LocalDateTime deletedAt = LocalDateTime.now();
            officeDocFileRepository.deleteFileInfo(oldId, deletedAt);
        }

        OfficeDocFileEntity entity = (fileId == null)
                ? new OfficeDocFileEntity()
                : officeDocFileRepository.findById4Update(fileId).orElseGet(OfficeDocFileEntity::new);

        MultipartFile file = request.getDataFile();

        try {
            if (file == null || file.isEmpty()) {
                entity.setData(null);
                entity.setFilename("");
                entity.setExt("");
            } else {
                entity.setData(file.getBytes());
                entity.setFilename(file.getOriginalFilename());
                entity.setExt(file.getContentType());
            }
            
        } catch (IOException e) {
            // Ghi log lỗi và ném ngoại lệ
            throw new RuntimeException("Error while reading file bytes", e);
        }

        // if((entity.getUpdated_at() != null)
        // && (!entity.getUpdated_at().isEqual(dto.getUpdatedAtAddr()))) {
        //     throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
        // }

        entity.setDocId(request.getDocId());
        entity.setComment(request.getComment());
        // entity.setUpdatedAt(request.getUpdatedAtAddr());
        OfficeDocFileEntity ret = officeDocFileRepository.save(entity);
        return ret.getId();
    }

    /**
     * deleteDocFile
     * 
     * @param id Long
     */
    @Override
    @Transactional
    public Long deleteDocFile(Long id) {
        // soft delete File info
        OfficeDocFileEntity fileInfo = officeDocFileRepository.findById(id)
                .orElseThrow(() -> new ApiException(ResponseCodeAndMsg.BAD_REQUEST, "File info with id " + id + " not found"));

        fileInfo.setDeletedAt(LocalDateTime.now());
        officeDocFileRepository.save(fileInfo);

        // Soft delete Doc Info
        Optional<OfficeDocEntity> docInfo = officeDocRepository.findById(fileInfo.getDocId());
        docInfo.ifPresent(row -> {
            row.setDeletedAt(LocalDateTime.now());
            officeDocRepository.save(row);
        });

        return id;
    }
}
