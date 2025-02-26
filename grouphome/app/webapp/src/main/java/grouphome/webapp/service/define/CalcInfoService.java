package grouphome.webapp.service.define;

import grouphome.webapp.dto.requests.office.GeneralRequestDto;
import grouphome.webapp.dto.requests.office.SaveCalcInfoRequestDto;
import grouphome.webapp.dto.responses.office.branch.CalcListResponseDto;
import grouphome.webapp.dto.responses.office.branch.SaveCalcInfoResponseDto;
import grouphome.webapp.entity.OfficeCalcInfoEntity;
import grouphome.webapp.entity.OfficeCalcItemsEntity;

import java.util.List;

public interface CalcInfoService {
    List<OfficeCalcItemsEntity> getMaster(GeneralRequestDto request);
    
    List<CalcListResponseDto> getCalcList(GeneralRequestDto request);

    List<OfficeCalcInfoEntity> getCalcInfo(GeneralRequestDto request);

    SaveCalcInfoResponseDto saveCalcInfo(SaveCalcInfoRequestDto[] request);

}
