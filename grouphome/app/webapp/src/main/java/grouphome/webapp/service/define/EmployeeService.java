package grouphome.webapp.service.define;

import grouphome.webapp.dto.requests.employee.*;
import grouphome.webapp.dto.requests.office.SaveHomeRequestDto;
import grouphome.webapp.dto.responses.blc_common.PagerResponse;
import grouphome.webapp.dto.responses.office.home.*;
import grouphome.webapp.dto.responses.employee.*;
import java.util.List;
import grouphome.webapp.entity.EmployeeEntity;
// import grouphome.webapp.dto.requests.office.SaveEmployeeRequestDto;
// import grouphome.webapp.dto.responses.employee.SaveInfoEmployeeResponseDto;
public interface EmployeeService {
    PagerResponse<List<ListEmployeeResponseDto>> getEmployeeList(EmployeeRequestDto request);

    SaveInfoEmployeeResponseDto saveEmployeeInfo(SaveEmployeeRequestDto request);

    Long deleteEmployeeInfo(Long id);

   List<EmployeeEntity> getAll();
}
