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
public class SaveCustomerApplicationStatusRequestDto {
    @Min(value = 1, message = "IDは1以上である必要があります")
    private Long id;

    @Min(value = 1, message = "CustomerIDは1以上である必要があります")
    private Long customerId;

    @Size(max = 32, message = "nameは32文字以内である必要があります")
    private String government;

    @Valid
    private NationalRentSubsidy nationalRentSubsidy;

    @Valid
    private MunicipalRentSubsidy municipalRentSubsidy;

    @Valid
    private IndividualMunicipality individualMunicipality;

    @Valid
    private LifeInsurancePension lifeInsurancePension;

    @Valid
    private PersonalLiability personalLiability;

    private LocalDateTime updatedAt;
      
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class NationalRentSubsidy {
        private Boolean specialBenefit;

        @Pattern(regexp = "^(\\d{4}-\\d{2}-\\d{2})?$", message = "補足給付期限はyyyy-MM-dd形式でなければなりません")
        private String limit;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MunicipalRentSubsidy {
        private Boolean subject;

        @Pattern(regexp = "^(\\d{4}-\\d{2}-\\d{2})?$", message = "申請日はyyyy-MM-dd形式でなければなりません")
        private String requestAt;

        private Integer amount;

        private String memo;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class IndividualMunicipality {
        @Pattern(regexp = "^(\\d{4}-\\d{2}-\\d{2})?$", message = "申請日はyyyy-MM-dd形式でなければなりません")
        private String requestAt;

        private String[] addition;

        private String memo;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LifeInsurancePension {
        private Boolean basic;

        private Boolean special;

        private Boolean disabled;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PersonalLiability {
        private String status;

        private Long insuranceType;
        
        private String insuranceName;

        private String agency;

        private String staff;

        private String contact;
       
    }
}
