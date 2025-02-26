package grouphome.webapp.dto.responses.office.room;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SumsResponseDto {
    private Long unitId;
    private String startYYYYMMDD;
    private Integer days;
    private Integer total;
    private Integer category3;
    private Integer category4;
    private Integer category5;
    private Integer category6;
}
