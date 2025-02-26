package grouphome.webapp.dto.responses.office.branch;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StructureResponseDto {
    private Long id;

    private String managerName;
    private String service1Name;
    private String training1Type;
    private String training1Impl;
    private String training1Limit;
    private String service2Name;
    private String training2Type;
    private String training2Impl;
    private String training2Limit;

    private String supporter;
    private String welfare;
    private String nurse;
    private Integer nurseAmount;
    private Integer visitingAmount;
}
