package grouphome.webapp.dto.responses.customer.tenant;

import grouphome.webapp.dto.requests.customer.tenant.SaveCustomerRequestDto.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TenantListResponseDto {
    private Long id;
    private Long customerUnitId;
    private Long brunchId;
    private String brunchName;
    private Long unitId;
    private String unitName;
    private String roomNo;
    private String name;
    private String nameGana;
    private Integer status;
    private LocalDate moveInAt;
    private LocalDate leavingAt;
    private Integer category;
    private Personal personal;
}
