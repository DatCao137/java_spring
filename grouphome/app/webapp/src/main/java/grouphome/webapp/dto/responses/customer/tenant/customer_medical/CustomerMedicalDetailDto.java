package grouphome.webapp.dto.responses.customer.tenant.customer_medical;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerMedicalDetailDto {
    private Long id;
    private Long medicalId;
    private Integer sub;
    private String serviceName;
    private String institution;
    private Integer status;
    private Integer pace;
    private LocalDateTime updatedAt;
}
