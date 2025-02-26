package grouphome.webapp.dto.responses.facility.detail;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveCustomerItemsResponseDto {
    Long id;
    LocalDateTime updatedAt;
}
