package grouphome.webapp.dto.requests.office;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import jakarta.validation.constraints.Min;

@Data
public class StaffDetailRequestDto {
    @Min(value = 0, message = "ID must be 0 or greater")
    @NotNull(message = "ID must not be empty")
    private Long id;
}
