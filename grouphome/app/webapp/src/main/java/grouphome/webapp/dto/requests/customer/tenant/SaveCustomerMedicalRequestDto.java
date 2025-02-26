package grouphome.webapp.dto.requests.customer.tenant;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveCustomerMedicalRequestDto {
    private Long id;

    private Long customerId;

    @NotNull()
    private Integer insuranceTypeId;

    @NotNull()
    @NotEmpty()
    @Size(max = 15)
    private String number;

    private LocalDateTime updatedAt;
}
