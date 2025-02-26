package grouphome.webapp.dto.responses.office.room;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OfficeRoomIsFreeResponseDto {
    private Boolean isFree;
    private String startDate;
    private String endDate;
}
