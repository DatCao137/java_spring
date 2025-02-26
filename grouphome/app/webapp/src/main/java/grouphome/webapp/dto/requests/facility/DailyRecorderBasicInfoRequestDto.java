package grouphome.webapp.dto.requests.facility;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class DailyRecorderBasicInfoRequestDto {
    @NotNull(message = "Home ID cannot be null")
    @Min(value = 1, message = "Home ID must be greater than 0")
    private Long homeId;

    @NotNull(message = "Date cannot be null")
    @Pattern(regexp = "^\\d{8}$", message = "Date must be in yyyyMMdd format")
    private String date;
}
