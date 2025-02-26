package grouphome.webapp.dto.requests.customer.tenant;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveCustomerRequestDto {
    @Min(value = 1, message = "customerInfoIdは1以上である必要があります")
    private Long id;

    @Size(max = 128, message = "nameは128文字以内である必要があります")
    private String name;

    @Size(max = 128, message = "nameGanaは128文字以内である必要があります")
    @Pattern(regexp = "^[\\u30A0-\\u30FF\\uFF65-\\uFF9F\\u3040-\\u309F]*$", message = "nameGanaはカナ文字でなければなりません")
    private String nameGana;

    @Valid
    private Personal personal;

    @Valid
    private Details details;

    @Min(value = 1, message = "categoryは1以上である必要があります")
    @Max(value = 255, message = "categoryは255以下である必要があります")
    private Integer category;

    private Long baseCustomerId;

    private LocalDateTime updatedAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Personal {
        @Size(max = 255, message = "nicknameは255文字以内でなければなりません")
        private String nickname;

        @Pattern(regexp = "^(\\d{4}-\\d{2}-\\d{2})?$", message = "生年月日はyyyy-MM-dd形式でなければなりません")
        private String birthDay;

        @Pattern(regexp = "^([0-2])?$", message = "性別は0（女性）、1（男性）、または2（その他）でなければなりません")
        private String sex;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Details {
        @Size(max = 255, message = "disabilityTypeは255文字以内である必要があります")
        private String disabilityType;

        private Boolean mentallyDisabled;

        private Boolean severelyDisabled;

        private Boolean behavioralDisorder;

        private Boolean homeCare;

        @Size(max = 255, message = "disabilityTypeは255文字以内である必要があります")
        private String usedOffice;

        @Min(value = 1, message = "usedPaceは1以上である必要があります")
        @Max(value = 255, message = "usedPaceは255以下である必要があります")
        private Integer usedPace;

        @Size(max = 255, message = "disabilityTypeは255文字以内である必要があります")
        private String beforePlace;

        @Size(max = 255, message = "disabilityTypeは255文字以内である必要があります")
        private String beforeOffice;

        @Size(max = 255, message = "disabilityTypeは255文字以内である必要があります")
        private String beforeService2;

        @Size(max = 255, message = "disabilityTypeは255文字以内である必要があります")
        private String beforeServiceOffice2;

        @Size(max = 255, message = "disabilityTypeは255文字以内である必要があります")
        private String beforeService3;

        @Size(max = 255, message = "disabilityTypeは255文字以内である必要があります")
        private String beforeServiceOffice3;

        private String memo;
    }
}
