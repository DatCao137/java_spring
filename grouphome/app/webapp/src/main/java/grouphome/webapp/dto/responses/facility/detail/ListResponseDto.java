package grouphome.webapp.dto.responses.facility.detail;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
public class ListResponseDto {
    private Long homeId;
   
    private String homeDate;

    private List<ListUnitResponseDto> listUnits;

    private List<ListDetailUnitResponseDto> listDetailUnits;
}