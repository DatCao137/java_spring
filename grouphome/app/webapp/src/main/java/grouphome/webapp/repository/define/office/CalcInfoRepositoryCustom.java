package grouphome.webapp.repository.define.office;

import java.util.List;
import grouphome.webapp.dto.requests.office.GeneralRequestDto;
import grouphome.webapp.dto.responses.office.branch.CalcListResponseDto;
import grouphome.webapp.entity.OfficeCalcInfoEntity;

public interface CalcInfoRepositoryCustom {
    List<CalcListResponseDto> getList(GeneralRequestDto request);
}
