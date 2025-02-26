package grouphome.webapp.dto.responses.customer.tenant.billing;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TenantBillingDetailResponseDto {
    private Long id;

    private Long billingId;

    private String yyyymm;

    private LocalDate nationalAt;

    private LocalDate selfGoverningAt;

    private LocalDate otherAt;

    private LocalDate issueAt;

    private String memo;

    private LocalDateTime updatedAt;
}