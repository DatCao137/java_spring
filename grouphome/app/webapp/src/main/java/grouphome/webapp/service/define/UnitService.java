package grouphome.webapp.service.define;

import grouphome.webapp.dto.requests.office.GeneralRequestDto;
import grouphome.webapp.dto.requests.office.SaveUnitRequestDto;
import grouphome.webapp.dto.responses.office.branch.SaveUnitResponseDto;
import grouphome.webapp.dto.responses.office.branch.UnitResponseDto;
import grouphome.webapp.entity.OfficeUnitEntity;

import java.util.List;

public interface UnitService {
    List<UnitResponseDto> getUnit(GeneralRequestDto request);

    SaveUnitResponseDto saveUnitInfo(SaveUnitRequestDto request);

    Long deleteUnit(Long id);

    void deleteUnits(List<OfficeUnitEntity> units);
}
