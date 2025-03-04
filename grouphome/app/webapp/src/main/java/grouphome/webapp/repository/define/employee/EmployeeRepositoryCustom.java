package grouphome.webapp.repository.define.employee;

import grouphome.webapp.dto.requests.employee.*;
import grouphome.webapp.repository.define.blc_common.PagerRepository;

import java.util.Map;

public interface EmployeeRepositoryCustom extends PagerRepository {
    Map<String, Object> getEmployeeList(EmployeeRequestDto request);
}
