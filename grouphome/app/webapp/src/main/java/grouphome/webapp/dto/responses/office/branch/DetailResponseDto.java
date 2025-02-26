package grouphome.webapp.dto.responses.office.branch;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetailResponseDto {
    private String No;
    private Long branchId;
    private String branchName;

    private Long addrId;
    private String postNo;
    private Integer prefId;
    private String prefName;
    private String city;
    private String town;
    private String tel;
    private String fax;

    private String contents;
    private String memo;

    private String updatedAtBranch;
    private String updatedAtAddr;

    private String groupHomeTypeName;
    private String classDivisionName;
    private String unitsGH;
    private String unitsSS;
}
