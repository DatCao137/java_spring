package grouphome.webapp.dto.responses.customer.tenant;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveCustomerMedicalDetailResponseDto {
    private Long id;
    private Long medicalId;
    private LocalDateTime updatedAt;
}
