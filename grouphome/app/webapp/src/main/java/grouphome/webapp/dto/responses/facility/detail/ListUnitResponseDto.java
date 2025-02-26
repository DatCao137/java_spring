package grouphome.webapp.dto.responses.facility.detail;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.fasterxml.jackson.annotation.JsonProperty;

@Data
public class ListUnitResponseDto {
    
    private Long unitId;
   
    private String unitName;

}