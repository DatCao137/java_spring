package grouphome.webapp.dto.responses.customer.tenant.customer_care;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerCareDto {
    private Long id;
    private Long customerId;
    private String careNo;
    private Integer careTypeId;
    private Long limit;
    private List<CustomerCareDetailDto> details;
    private LocalDateTime updatedAt;
}
