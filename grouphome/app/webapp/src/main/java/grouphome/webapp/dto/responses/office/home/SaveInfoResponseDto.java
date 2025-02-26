package grouphome.webapp.dto.responses.office.home;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveInfoResponseDto {
    private Long homeId;
    private Long addrId;
}
