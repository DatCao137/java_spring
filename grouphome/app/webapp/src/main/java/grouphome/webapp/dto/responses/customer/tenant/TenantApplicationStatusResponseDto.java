package grouphome.webapp.dto.responses.customer.tenant;

import grouphome.webapp.dto.requests.customer.tenant.SaveCustomerApplicationStatusRequestDto.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TenantApplicationStatusResponseDto {
    private Long id;
    private Long customerId;
    private String government;
    private NationalRentSubsidy nationalRentSubsidy;
    private MunicipalRentSubsidy municipalRentSubsidy;
    private IndividualMunicipality individualMunicipality;
    private LifeInsurancePension lifeInsurancePension;
    private PersonalLiability personalLiability;
    private LocalDateTime updatedAt;
}
