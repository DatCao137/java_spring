package grouphome.webapp.dto.responses.customer.tenant;

import grouphome.webapp.dto.requests.customer.tenant.SaveCustomerRequestDto.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TenantDetailResponseDto {
    private Long id;
    private Integer category;
    private String name;
    private String nameGana;
    private Personal personal;
    private Details details;
    private Long branchId;
    private LocalDateTime infoUpdatedAt;
    private Long customerUnitId;
    private LocalDateTime unitUpdatedAt;
}
