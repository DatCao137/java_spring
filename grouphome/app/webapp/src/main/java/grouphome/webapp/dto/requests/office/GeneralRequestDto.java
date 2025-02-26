package grouphome.webapp.dto.requests.office;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Map;

import grouphome.webapp.dto.requests.blc_common.PagerDto;

@Data
@EqualsAndHashCode(callSuper=true)
public class GeneralRequestDto extends PagerDto {
    private Long id;
    private Long branchId;
    private Long homeId;
    private Long staffId;
    private Long calcId;
    private Long inquiryId;
    private Long customerId;
    private Long roomId;
    private Long unitId;

    private Map<String, String> filter;
}
