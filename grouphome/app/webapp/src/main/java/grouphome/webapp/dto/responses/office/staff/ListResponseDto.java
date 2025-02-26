package grouphome.webapp.dto.responses.office.staff;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ListResponseDto {
    private Long id;
    private String employeeNo;
    private String name;
    private String enrollmentStatus;
    private String occupation;
    private String branchNames;
    private String homeNames;
    private String unitNames;
    private String employeeType;
    private String enrollmentPeriod;
    private String hasQualification;
}