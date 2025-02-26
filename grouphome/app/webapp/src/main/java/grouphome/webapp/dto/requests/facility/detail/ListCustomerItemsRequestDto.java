package grouphome.webapp.dto.requests.facility.detail;

import grouphome.webapp.dto.requests.blc_common.PagerDto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ListCustomerItemsRequestDto extends PagerDto {
    @Valid
    private Filter filter;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Filter {
        @NotNull
        private Long homeId;

        private Long unitId;

        @NotNull
        private Long customerId;
        @Pattern(regexp = "^(\\d{4})(0[1-9]|1[0-2])(0[1-9]|[12]\\d|3[01])$",
                message = "年月日の形式が正しくありません (例: 20240101)。")
        @NotNull
        private String yyyymmdd;

        private Integer type; // 1: recorder, 2: user specific
    }
}
