package grouphome.webapp.dto.responses.office.room;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OfficeRoomDetailResponseDto {
    private Long id;
    private Long unitId;
    private String name;
    private String contents;
    private LocalDateTime updatedAt;
}
