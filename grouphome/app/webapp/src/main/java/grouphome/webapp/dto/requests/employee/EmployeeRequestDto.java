package grouphome.webapp.dto.requests.employee;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

import java.util.Map;

import grouphome.webapp.dto.requests.blc_common.PagerDto;

@Data
@EqualsAndHashCode(callSuper=true)
public class EmployeeRequestDto extends PagerDto {
    private String name;
}
