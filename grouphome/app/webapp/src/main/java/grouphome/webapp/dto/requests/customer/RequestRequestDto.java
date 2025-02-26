package grouphome.webapp.dto.requests.customer;

import grouphome.webapp.dto.requests.office.StaffListRequestDto;
import lombok.Data;

import grouphome.webapp.dto.requests.blc_common.PagerDto;
import lombok.EqualsAndHashCode;

import java.util.Map;

@Data
@EqualsAndHashCode(callSuper = true)
public class RequestRequestDto extends PagerDto {
    private Long id;
}
