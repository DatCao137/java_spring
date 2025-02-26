package grouphome.webapp.dto.responses.office.staff;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InfoResponseDto {
    private Integer id;
    private String name;
    private String seiMeiName;
}
