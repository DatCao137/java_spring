package grouphome.webapp.dto.responses.office.branch;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ListResponseDto {
    private Integer id;

    private Integer no;

    private String branchName;

    private Integer homeId;
    private String homeName;

    private String capacity;

    private Integer groupHomeTypeId;
    private String groupHomeName;

    private String features;
    private String services;

    private String postNo;
    private Integer prefId;
    private String prefName;
    private Integer addrId;
    private String city;
    private String town;

    private String contents;
}
