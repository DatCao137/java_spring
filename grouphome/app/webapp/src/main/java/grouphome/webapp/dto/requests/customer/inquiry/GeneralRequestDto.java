package grouphome.webapp.dto.requests.customer.inquiry;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Map;

import grouphome.webapp.dto.requests.blc_common.PagerDto;

@Data
@EqualsAndHashCode(callSuper = true)
public class GeneralRequestDto extends PagerDto {
    private Long id;

    private Filter filter;

    @Data
    public static class Filter {
        private String name;

        private String gana;

        private String sex;

        private String age;

        private String inquirySrcName;

        private String inquirySrcStaff;

        private String inquirySrcRoute;

        private String inquirySrcPhone;

        private String inquirySrcLink;

        private String status;

        private String nextAction;
    }
}


