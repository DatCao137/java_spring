package grouphome.webapp.repository.define.office;

import java.util.List;
import grouphome.webapp.dto.requests.office.GeneralRequestDto;

public interface UnitRepositoryCustom {
    List<Object[]> getUnit(GeneralRequestDto request);
}
