package grouphome.webapp.service.define;

import grouphome.webapp.dto.requests.employee.*;
import grouphome.webapp.dto.requests.office.SaveHomeRequestDto;
import grouphome.webapp.dto.responses.blc_common.PagerResponse;
import grouphome.webapp.dto.responses.office.home.*;
import grouphome.webapp.dto.responses.employee.*;
import java.util.List;

public interface EmployeeService {
    PagerResponse<List<ListEmployeeResponseDto>> getEmployeeList(EmployeeRequestDto request);

   // SaveInfoResponseDto saveHomeInfo(SaveHomeRequestDto request);

    //Long deleteHomeInfo(Long id);

   // List<OfficeHomeEntity> getAll();
}
