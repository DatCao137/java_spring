package grouphome.webapp.dto.responses.customer.tenant.customer_care;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerCareDetailDto {
    private Long id;
    private Long careId;
    private Integer sub;
    private String serviceName;
    private String useCompany;
    private Integer status;
    private Integer pace;
    private LocalDateTime updatedAt;
}
