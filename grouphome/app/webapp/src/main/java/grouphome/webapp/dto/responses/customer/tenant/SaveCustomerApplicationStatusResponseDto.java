package grouphome.webapp.dto.responses.customer.tenant;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveCustomerApplicationStatusResponseDto {
    private Long id;
    private Long customerId;
}
