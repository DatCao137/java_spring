package grouphome.webapp.dto.requests.office;

import grouphome.webapp.dto.requests.blc_common.PagerDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class StaffListRequestDto extends PagerDto {
    private Filter filter;

    @Data
    @NoArgsConstructor
    public static class Filter {
        private String branchId;
        private String mainHomeId;
        private String subHomeId;
        private String name;
        private String employeeNo;
        private List<Integer> enrollmentStatus;
        private String occupationTypeId;
        private String employeeTypeId;
        private Integer hasQualification;
        private String enrollmentPeriod;
    }
}
