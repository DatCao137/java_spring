package grouphome.webapp.dto.requests.customer.tenant;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveCustomerMonitoringRequestDto {
    private Long id;

    @NotNull(message = "顧客IDは必須項目です。")
    private Long customerId;

    @NotBlank(message = "提供月は必須項目です。")
    @Pattern(
            regexp = "^[1-2]\\d{3}(0[1-9]|1[0-2])$",
            message = "提供月はYYYYMM形式（例: 202401、199912）で入力してください。年は1000～2999、月は01～12の範囲です。"
    )
    private String yyyymm;

    @NotNull(message = "情報は必須項目です。")
    @Valid
    private MonitoringInfo info;

    private LocalDateTime updatedAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MonitoringInfo {
        private LocalDate lastUpdatedAt;

        @Valid
        private PlanDto plan;

        @Valid
        private MonitoringDto monitoring;

        @Valid
        private DraftDto draft;

        @Valid
        private MeetingDto meeting;

        @Valid
        private MainDto main;

        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        public static class PlanDto {
            private LocalDate start;

            private LocalDate end;

            private String season;
        }

        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        public static class MonitoringDto {
            private Boolean store;

            private Boolean sign;

            @Min(value = 0, message = "継続値は0以上である必要があります。")
            private Integer continueValue;

            private LocalDate createdAt;

            @Min(value = 1, message = "ファイルIDは1以上である必要があります。")
            private Integer fileId;
        }

        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        public static class DraftDto {
            private Boolean store;

            private Boolean sign;

            @Min(value = 1, message = "担当者IDは1以上である必要があります。")
            private Integer staff;

            private LocalDate createdAt;

            @Min(value = 1, message = "ファイルIDは1以上である必要があります。")
            private Integer fileId;
        }

        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        public static class MeetingDto {
            private Boolean store;

            private Boolean writeCheck;


            private LocalDate createdAt;

            @Min(value = 1, message = "ファイルIDは1以上である必要があります。")
            private Integer fileId;
        }

        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        public static class MainDto {
            private Boolean store;

            private Boolean sign;

            @Min(value = 1, message = "担当者IDは1以上である必要があります。")
            private Integer staff;

            private LocalDate createdAt;

            @Min(value = 1, message = "ファイルIDは1以上である必要があります。")
            private Integer fileId;
        }
    }
}
