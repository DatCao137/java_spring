package grouphome.webapp.dto.requests.customer;

import lombok.Data;

import grouphome.webapp.dto.requests.blc_common.PagerDto;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class RequestListRequestDto extends PagerDto {
    private Long id;

    private Filter filter;

    @Data
    public static class Filter {
        private String id;

        private String name;

        private String requestDate;

        private String homeName;

        private String desiredDate;

        private String requestType;

        private String requestItem;

        private String representativeName;

        private String representativeCall;

        private String remark;
    }
}
