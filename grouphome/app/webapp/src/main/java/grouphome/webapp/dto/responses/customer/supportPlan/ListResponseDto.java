package grouphome.webapp.dto.responses.customer.supportPlan;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ListResponseDto {
    private Long id;
    private String name;
    private String createDate;
    private String planStartDate;
    private String planStartEnd;
    private String homeName;
    private String heldDate;
    private String creator;
    private String applyDate;
    private String status;
    private String additionalInfo;
}
