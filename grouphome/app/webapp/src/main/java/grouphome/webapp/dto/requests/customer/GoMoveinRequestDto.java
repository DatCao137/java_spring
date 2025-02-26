package grouphome.webapp.dto.requests.customer;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class GoMoveinRequestDto {
    private Long id;
    private LocalDateTime updatedAt;
}
