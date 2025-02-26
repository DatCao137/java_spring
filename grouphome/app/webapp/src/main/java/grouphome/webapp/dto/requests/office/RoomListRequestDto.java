package grouphome.webapp.dto.requests.office;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Map;

@Data
public class RoomListRequestDto {
    private Long homeId;
    private String baseDate;
}
