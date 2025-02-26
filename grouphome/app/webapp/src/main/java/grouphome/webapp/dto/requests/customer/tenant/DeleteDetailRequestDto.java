package grouphome.webapp.dto.requests.customer.tenant;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeleteDetailRequestDto {
    private Long customerId;
    private LocalDateTime updatedAt;
}
