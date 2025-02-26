package grouphome.webapp.service.impl;

import grouphome.webapp.dto.requests.office.*;
import grouphome.webapp.dto.responses.blc_common.PagerResponse;
import grouphome.webapp.dto.responses.office.branch.*;
import grouphome.webapp.entity.*;
import grouphome.webapp.exception.ApiException;
import grouphome.webapp.repository.define.office.*;
import grouphome.webapp.service.define.BranchService;
import grouphome.webapp.utils.Exchanger;
import grouphome.webapp.utils.ResponseCodeAndMsg;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
public class BranchServiceImpl extends AddressServiceImpl implements BranchService {
    private final BranchRepository branchRepository;

    protected final Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    public BranchServiceImpl(BranchRepository branchRepository) {
        this.branchRepository = branchRepository;
    }

    /**
     * Get office info list
     * 
     * @param request BranchRequestDto
     * @return PagerResponse<List<ListResponseDto>>
     */
    @Override
    public PagerResponse<List<ListResponseDto>> getBranchList(GeneralRequestDto request) {
        Map<String, Object> result = branchRepository.getBranchList(request);
        List<ListResponseDto> branchList = new ArrayList<>();

        @SuppressWarnings("unchecked")
        List<Object[]> data = (List<Object[]>)result.get("data");
        for (Object[] row : data) {
            ListResponseDto dto = this.getListResponseDto(row);
            if (dto == null)
                continue;
            branchList.add(dto);
        }
        PagerResponse<List<ListResponseDto>> ret = new PagerResponse<List<ListResponseDto>>(branchList);
        ret.setTotalRecord((Integer)result.get("total"));
        ret.setTotalPage((Integer)result.get("totalPage"));
        return ret;
    }

    /**
     * Get office detail basic
     * 
     * @param request BranchRequestDto
     * @return DetailResponseDto
     */
    @Override
    public DetailResponseDto getBranchDetail(GeneralRequestDto request) {
        if (request.getBranchId() == null) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, "ID is required");
        }

        if (branchRepository.existsById(Long.valueOf(request.getBranchId()))) {
            Object result = this.branchRepository.getBranchDetail(request);
            return this.getBranchDetailResponseDto(result);
        } else {
            throw new ApiException(ResponseCodeAndMsg.NOT_FOUND,
                    "Branch ID: " + request.getBranchId() + " does not exist or is deleted");
        }
    }

    @Override
    @Transactional
    public DetailResponseDto saveBranchInfo(SaveBranchRequestDto request) {
        if ( branchRepository.existsByNo(request.getNo(), request.getBranchId())) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, "重複するNoは登録できません");
        }
        Long addrId = this.saveBlcAddrEntity(request);
        request.setAddrId(addrId);
        Long branchId = this.saveOfficeBranchEntity(request);
        GeneralRequestDto requestDto = new GeneralRequestDto();
        requestDto.setBranchId(branchId);
        return this.getBranchDetail(requestDto);
    }

    @Transactional
    protected Long saveOfficeBranchEntity(SaveBranchRequestDto dto) {
        Long id = dto.getBranchId();
        /* TODO : idが指定されて無いのは論理削除のため、新規インスタンス作成は暫定 */
        OfficeBranchEntity entity = (id == null)
                ? new OfficeBranchEntity()
                : this.branchRepository.findById4Update(id).orElseGet(OfficeBranchEntity::new);

        if((entity.getUpdatedAt() != null)
        && (!entity.getUpdatedAt().isEqual(dto.getUpdatedAtBranch()))) {
            throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
        }

        entity.setNo(dto.getNo());
        entity.setName(dto.getName());
        entity.setAddrId(dto.getAddrId());
        entity.setContents(dto.getContents());
        entity.setMemo(dto.getMemo());
        entity.setUpdatedAt(dto.getUpdatedAtBranch());
        OfficeBranchEntity ret = this.branchRepository.save(entity);
        return ret.getId();
    }

    /**
     * Delete an office info
     * 
     * @param id Long
     */
    @Override
    @Transactional
    public Long deleteBranchInfo(Long id) {
        // soft delete office info
        OfficeBranchEntity officeInfo = branchRepository.findById(id)
                .orElseThrow(() -> new ApiException(ResponseCodeAndMsg.BAD_REQUEST,
                        "Branch info with id " + id + " not found"));

        officeInfo.setDeletedAt(LocalDateTime.now());
        branchRepository.save(officeInfo);

        // Soft delete office address
        Optional<BlcAddrEntity> addr = addressRepository.findById(officeInfo.getAddrId());
        addr.ifPresent(x -> {
            x.setDeletedAt(LocalDateTime.now());
            addressRepository.save(x);
        });

        // Soft delete home info
        // Optional<BranchHomeEntity> homeInfo =
        // homeRepository.findById(officeInfo.getHomeId());
        // homeInfo.ifPresent(x -> {
        // x.setDeletedAt(LocalDateTime.now());
        // homeRepository.save(x);
        // });
        return id;
    }

    private ListResponseDto getListResponseDto(Object[] row) {
        if (row == null)
            return null;
        if (row.length == 0)
            return null;
        int nPos = 0;
        ListResponseDto dto = new ListResponseDto();
        dto.setId(Exchanger.toInt(row[nPos++]));
        dto.setNo(Exchanger.toInt(row[nPos++]));
        dto.setBranchName(Exchanger.toString(row[nPos++]));
        dto.setHomeId(Exchanger.toInt(row[nPos++]));
        dto.setHomeName(Exchanger.toString(row[nPos++]));
        dto.setPostNo(Exchanger.toString(row[nPos++]));
        dto.setPrefId(Exchanger.toInt(row[nPos++]));
        dto.setPrefName(Exchanger.toString(row[nPos++]));
        dto.setCity(Exchanger.toString(row[nPos++]));
        dto.setTown(Exchanger.toString(row[nPos++]));
        dto.setAddrId(Exchanger.toInt(row[nPos++]));
        dto.setContents(Exchanger.toString(row[nPos++]));
        dto.setCapacity(Exchanger.toString(row[nPos++]));
        dto.setFeatures(Exchanger.toString(row[nPos++]));
        dto.setServices(Exchanger.toString(row[nPos++]));
        dto.setGroupHomeTypeId(Exchanger.toInt(row[nPos++]));
        dto.setGroupHomeName(Exchanger.toString(row[nPos++]));
        return dto;
    }

    private DetailResponseDto getBranchDetailResponseDto(Object data) {
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
        DetailResponseDto dto = new DetailResponseDto();
        dto.setNo(Exchanger.toString(row[nPos++]));
        dto.setBranchId(Exchanger.toLong(row[nPos++]));
        dto.setBranchName(Exchanger.toString(row[nPos++]));
        dto.setAddrId(Exchanger.toLong(row[nPos++]));
        dto.setPostNo(Exchanger.toString(row[nPos++]));
        dto.setPrefId(Exchanger.toInt(row[nPos++]));
        dto.setPrefName(Exchanger.toString(row[nPos++]));
        dto.setCity(Exchanger.toString(row[nPos++]));
        dto.setTown(Exchanger.toString(row[nPos++]));
        dto.setTel(Exchanger.toString(row[nPos++]));
        dto.setFax(Exchanger.toString(row[nPos++]));
        dto.setContents(Exchanger.toString(row[nPos++]));
        dto.setMemo(Exchanger.toString(row[nPos++]));
        dto.setUpdatedAtBranch(Exchanger.toString(row[nPos++]));
        dto.setUpdatedAtAddr(Exchanger.toString(row[nPos++]));
        dto.setGroupHomeTypeName(Exchanger.toString(row[nPos++]));
        dto.setClassDivisionName(Exchanger.toString(row[nPos++]));
        dto.setUnitsGH(Exchanger.toString(row[nPos++]));
        dto.setUnitsSS(Exchanger.toString(row[nPos++]));
        return dto;
    }

    @Override
    public PagerResponse<List<FacilityDailyListResponseDto>> getFacilityDailyList(FacilityDailyListRequestDto request) {
        Pageable pageable = PageRequest.of(request.getPageNumber() - 1, request.getPageSize());

        Page<FacilityDailyListResponseDto> pageResult = branchRepository.getFacilityDailyList(request, pageable);

        PagerResponse<List<FacilityDailyListResponseDto>> response = new PagerResponse<>();
        response.setData(pageResult.getContent());
        response.setTotalRecord((int) pageResult.getTotalElements());
        response.setTotalPage(pageResult.getTotalPages());
        return response;
    }
}
