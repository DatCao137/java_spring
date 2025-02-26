package grouphome.webapp.service.impl;

import grouphome.webapp.dto.requests.office.GeneralRequestDto;
import grouphome.webapp.dto.requests.office.SaveStructureRequestDto;
import grouphome.webapp.dto.responses.office.branch.SaveStructureResponseDto;
import grouphome.webapp.dto.responses.office.branch.StructureResponseDto;
import grouphome.webapp.entity.OfficeHomeEntity;
import grouphome.webapp.entity.OfficeStructureEntity;
import grouphome.webapp.exception.ApiException;
import grouphome.webapp.repository.define.office.BranchRepository;
import grouphome.webapp.repository.define.office.StructureRepository;
import grouphome.webapp.repository.define.office.StructureRepositoryCustom;
import grouphome.webapp.service.define.StructureService;
import grouphome.webapp.utils.Exchanger;
import grouphome.webapp.utils.ResponseCodeAndMsg;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class StructureServiceImpl implements StructureService {
    private final StructureRepository structureRepository;
    private final StructureRepositoryCustom structureRepositoryCustom;

    @Autowired
    private BranchRepository branchRepository;

    @Autowired
    public StructureServiceImpl(StructureRepository structureRepository,
            StructureRepositoryCustom structureRepositoryCustom) {
        this.structureRepository = structureRepository;
        this.structureRepositoryCustom = structureRepositoryCustom;
    }

    /**
     * Get office personnel struct info
     * 
     * @param request BranchRequestDto
     * @return StructureResponseDto
     */
    @Override
    public StructureResponseDto getStructure(GeneralRequestDto request) {
        if (request.getBranchId() == null) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, "ID is required");
        }

        if (structureRepository.existsByBranchInfoId(Long.valueOf(request.getBranchId()))) {
            Object result = this.structureRepositoryCustom.getPerson(request);
            return this.getStructureDto(result);
        } else {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST,
                    "Personnel struct info with branch ID: " + request.getBranchId() + " does not exist or is deleted");
        }
    }

    /**
     * Get office personnel struct info entity
     * 
     * @param request GeneralRequestDto(id)
     * @return OfficeStructureEntity
     */
    @Override
    public OfficeStructureEntity getEntity(GeneralRequestDto request) {
        if (request.getId() == null) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, "ID is required");
        }
        Long id = request.getId();
        OfficeStructureEntity entity = structureRepository.findById(id)
                    .orElseThrow(() -> new ApiException(ResponseCodeAndMsg.BAD_REQUEST,
                                                        "Struct info with id " + id + " not found"));
        return entity;
    }

    /**
     * saveStructureInfo
     * 
     * @param request SaveStructureRequestDto
     * @return SaveStructureResponseDto
     */
    @Override
    @Transactional
    public SaveStructureResponseDto saveStructureInfo(SaveStructureRequestDto request) {
        if (!branchRepository.existsById(request.getBranchId())) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST,
                    "Branch info with ID: " + request.getBranchId() + " does not exist or is deleted");
        }

        Long id = saveOfficeStructureEntity(request);
        return new SaveStructureResponseDto(id, request.getBranchId());
    }

    @Transactional
    private Long saveOfficeStructureEntity(SaveStructureRequestDto request) {
        Long id = request.getId();
        OfficeStructureEntity entity = (id == null)
                ? new OfficeStructureEntity()
                : structureRepository.findById4Update(id).orElseGet(OfficeStructureEntity::new);

        if(((entity.getUpdatedAt() != null)
            && (!entity.getUpdatedAt().isEqual(request.getUpdatedAt())))
        || (id == null && structureRepository.existsByBranchInfoId(Long.valueOf(request.getBranchId())))) {
            throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
        }
        entity.setBranchId(request.getBranchId());
        entity.setManagerName(request.getManagerName());
        entity.setService1(request.getService1());
        entity.setService2(request.getService2());
        entity.setLifeSupporter(request.getLifeSupporter());
        entity.setWelfareWorker(request.getWelfareWorker());
        entity.setNurse(request.getNurse());
        entity.setVisitingContract(request.getVisitingContract());

        OfficeStructureEntity res = structureRepository.save(entity);
        return res.getId();
    }

    /**
     * Soft delete a Personnel Struct Info
     * 
     * @param id Long
     * @return Long
     */
    @Override
    @Transactional
    public Long deletePersonnelStructInfo(Long id) {
        Optional<OfficeStructureEntity> optionalPersonnelStructInfo = structureRepository.findById(id);
        if (optionalPersonnelStructInfo.isPresent()) {
            OfficeStructureEntity personnelStructInfo = optionalPersonnelStructInfo.get();

            personnelStructInfo.setDeletedAt(LocalDateTime.now());
            try {
                structureRepository.save(personnelStructInfo);
                return id;
            } catch (OptimisticLockingFailureException e) {
                throw new OptimisticLockingFailureException(e.getMessage());
            }
        } else {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST,
                    "Personnel Struct Info with id " + id + " not found");
        }
    }

    private StructureResponseDto getStructureDto(Object data) {
        if (data == null)
            return null;
        Object[] row;
        try {
            row = (Object[]) data;
        } catch (Exception e) {
            return null;
        }
        if (row.length == 0)
            return null;
        int nPos = 0;
        StructureResponseDto dto = new StructureResponseDto();
        dto.setId(Exchanger.toLong(row[nPos++]));
        dto.setManagerName(Exchanger.toString(row[nPos++]));
        dto.setService1Name(Exchanger.toString(row[nPos++]));
        dto.setTraining1Type(Exchanger.toString(row[nPos++]));
        dto.setTraining1Impl(Exchanger.toString(row[nPos++]));
        dto.setTraining1Limit(Exchanger.toString(row[nPos++]));
        dto.setService2Name(Exchanger.toString(row[nPos++]));
        dto.setTraining2Type(Exchanger.toString(row[nPos++]));
        dto.setTraining2Impl(Exchanger.toString(row[nPos++]));
        dto.setTraining2Limit(Exchanger.toString(row[nPos++]));
        dto.setSupporter(Exchanger.toString(row[nPos++]));
        dto.setWelfare(Exchanger.toString(row[nPos++]));
        dto.setNurse(Exchanger.toString(row[nPos++]));
        dto.setNurseAmount(Exchanger.toInt(row[nPos++]));
        dto.setVisitingAmount(Exchanger.toInt(row[nPos++]));
        return dto;
    }

}
