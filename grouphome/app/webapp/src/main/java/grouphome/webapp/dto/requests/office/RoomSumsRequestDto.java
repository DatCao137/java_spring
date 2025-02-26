package grouphome.webapp.dto.requests.office;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

import java.util.Map;

@Data
public class RoomSumsRequestDto {
    private String startDate;
    private String endDate;
    private Long unitId;
}
