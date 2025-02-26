package grouphome.webapp.dto.responses.customer.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveResponseDto {
    private Long requestInfoId;
    private Long requestInfoDetailId;
}
