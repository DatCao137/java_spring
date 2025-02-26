package grouphome.webapp.dto.requests.office;

import com.fasterxml.jackson.annotation.JsonFormat;
import grouphome.webapp.dto.requests.blc_common.AddressDto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OfficeRoomDetailRequestDto {
    @Min(value = 0, message = "ID must be 0 or greater")
    @NotNull(message = "ID must not be empty")
    private Long id;
}