package grouphome.webapp.dto.responses.customer.tenant;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveTenantResponseDto {
    private Long customerInfoId;
    private Long customerUnitId;
}
