package grouphome.webapp.dto.requests.office;

import grouphome.webapp.dto.requests.blc_common.PagerDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class FacilityDailyListRequestDto extends PagerDto {
    private Filter filter;

    @Data
    @NoArgsConstructor
    public static class Filter {
        private String branchId;
        private String homeId;
        private String branchName;
        private String homeName;
        private String location;
    }
}
