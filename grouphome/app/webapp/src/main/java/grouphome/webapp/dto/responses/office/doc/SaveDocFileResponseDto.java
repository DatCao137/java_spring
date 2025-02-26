package grouphome.webapp.dto.responses.office.doc;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveDocFileResponseDto {
    private Long id;
    
    private Long docId;

    private Long pathId;
}
