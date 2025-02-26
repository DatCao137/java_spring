package grouphome.webapp.dto.requests.customer.inquiry;

import lombok.Data;
import lombok.EqualsAndHashCode;
import java.util.Map;
import grouphome.webapp.dto.requests.blc_common.PagerDto;

@Data
@EqualsAndHashCode(callSuper = true)
public class InquiryDetailRequestDto extends PagerDto {
    private Long id;
    private Filter filter;

    @Data
    public static class Filter {
        private Long id;
    }
}


