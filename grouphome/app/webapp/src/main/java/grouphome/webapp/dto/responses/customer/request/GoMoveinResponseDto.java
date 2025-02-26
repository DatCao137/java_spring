package grouphome.webapp.dto.responses.customer.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GoMoveinResponseDto {
    private Long id;
    private Long customerId;
    private Integer result;
}
