package grouphome.webapp.dto.responses.office.room;

import grouphome.webapp.dto.responses.blc_common.PagerMapperResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class OfficeRoomMapResponseDto extends PagerMapperResponse {
    private Long roomId;
    private String roomName;
    private Long unitId;
    private String unitName;
    private String period;
}
