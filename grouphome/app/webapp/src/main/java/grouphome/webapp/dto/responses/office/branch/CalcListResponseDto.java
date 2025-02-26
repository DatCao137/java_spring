package grouphome.webapp.dto.responses.office.branch;

import lombok.Data;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class CalcListResponseDto {
    private Long id;

    private Long branchId;

    private String name;

    private String classification;

    private LocalDate startDate;

    private LocalDate notificationDate;

    private LocalDate validStartDate;

    private LocalDate validEndDate;

    private String remark;
}
