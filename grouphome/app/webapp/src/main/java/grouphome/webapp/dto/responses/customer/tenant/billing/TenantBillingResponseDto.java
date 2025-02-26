package grouphome.webapp.dto.responses.customer.tenant.billing;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TenantBillingResponseDto {
    private Long id;
   
    private Long customerId;
  
    private LocalDate movein1stAt;

    private LocalDate originalRequestAt;

    private LocalDate rpInputAt;

    private LocalDate transfer1stAt;

    private String remark;

    private LocalDateTime updatedAt;

    private List<TenantBillingDetailResponseDto> tenantBillingDetails;
}