package grouphome.webapp.dto.responses.office.branch;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FacilityDailyListResponseDto {
    private Long homeId;
    private Long branchId;
    private String homeName;
    private String branchName;
    private Long addrId;
    private String prefName;
    private String postNo;
    private Long prefId;
    private String city;
    private String town;
    private String tel;
    private String fax;
    private LocalDateTime updatedAt;
}
