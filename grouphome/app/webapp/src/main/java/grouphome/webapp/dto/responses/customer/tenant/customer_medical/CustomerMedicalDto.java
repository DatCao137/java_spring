package grouphome.webapp.dto.responses.customer.tenant.customer_medical;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerMedicalDto {
    private Long id;
    private Long customerId;
    private Integer insuranceTypeId;
    private String number;
    private List<CustomerMedicalDetailDto> details;
    private LocalDateTime updatedAt;
}
