package grouphome.webapp.dto.responses.office.branch;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveInfoResponseDto {
    private Long branchId;
    private Long addrId;
}
