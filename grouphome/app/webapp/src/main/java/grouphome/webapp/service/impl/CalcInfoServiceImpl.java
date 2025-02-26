package grouphome.webapp.service.impl;

import grouphome.webapp.dto.requests.office.GeneralRequestDto;
import grouphome.webapp.dto.requests.office.SaveCalcInfoRequestDto;
import grouphome.webapp.dto.responses.office.branch.CalcListResponseDto;
import grouphome.webapp.dto.responses.office.branch.SaveCalcInfoResponseDto;
import grouphome.webapp.entity.OfficeCalcItemsEntity;
import grouphome.webapp.entity.OfficeCalcInfoEntity;
import grouphome.webapp.exception.ApiException;
import grouphome.webapp.service.define.CalcInfoService;
import grouphome.webapp.repository.define.office.CalcMasterRepository;
import grouphome.webapp.repository.define.office.CalcInfoRepository;
import grouphome.webapp.utils.JsonUtils;
import grouphome.webapp.utils.ResponseCodeAndMsg;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.ArrayList;

@Service
public class CalcInfoServiceImpl implements CalcInfoService {
    private final CalcMasterRepository calcMasterRepository;
    private final CalcInfoRepository calcInfoRepository;
    
    @Autowired
    public CalcInfoServiceImpl(CalcMasterRepository master, CalcInfoRepository details) {
        this.calcMasterRepository = master;
        this.calcInfoRepository = details;
    }

    @Override
    public List<OfficeCalcItemsEntity> getMaster(GeneralRequestDto request) {
        return this.calcMasterRepository.findByBranchId(request.getBranchId());
    }

    @Override
    public List<CalcListResponseDto> getCalcList(GeneralRequestDto request) {
        return this.calcInfoRepository.getList(request);
    }

    @Override
    public List<OfficeCalcInfoEntity> getCalcInfo(GeneralRequestDto request) {
        return this.calcInfoRepository.findByBranchId(request.getBranchId());
    }

    @Override
    @Transactional
    public SaveCalcInfoResponseDto saveCalcInfo(SaveCalcInfoRequestDto[] request) {
        List<OfficeCalcInfoEntity> entities = new ArrayList<>();
        for(int i=0; i<request.length; i++) {
            entities.add(this.makeCalcInfoEntity(request[i]));
        }
        this.calcInfoRepository.saveAll(entities);
        return new SaveCalcInfoResponseDto();
    }

    @Transactional
    protected OfficeCalcInfoEntity makeCalcInfoEntity(SaveCalcInfoRequestDto dto) {
        Long id = dto.getId();
        OfficeCalcInfoEntity entity = (id == null)
            ? new OfficeCalcInfoEntity()
            : this.calcInfoRepository.findById4Update(id).orElseGet(OfficeCalcInfoEntity::new);
        
        if((entity.getUpdatedAt() != null)
        && (!entity.getUpdatedAt().isEqual(dto.getUpdatedAt()))) {
            throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
        }

        entity.setBranchId(dto.getBranchId());
        entity.setStartDate(dto.getStartDate());
        entity.setNotificationDate(dto.getNotificationDate());
        entity.setValidStartDate(dto.getValidStartDate());
        entity.setValidEndDate(dto.getValidEndDate());
        entity.setCalcItemsId(dto.getCalcItemsId());
        entity.setValue(JsonUtils.toJson(dto.getValue()));
        entity.setRemark(dto.getRemark());
        entity.setUpdatedAt(dto.getUpdatedAt());
        return entity;
    }
}
