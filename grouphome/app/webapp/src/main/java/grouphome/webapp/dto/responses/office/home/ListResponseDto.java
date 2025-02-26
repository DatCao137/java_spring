package grouphome.webapp.dto.responses.office.home;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ListResponseDto {
    private Integer id;

    private String homeName;

    private Integer branchId;
    private String branchName;

    private String postNo;
    private Integer addrId;
    private Integer prefId;
    private String prefName;
    private String city;
    private String town;
    private String tel;
    private String units;
    private String updatedAtHome;
    private String updatedAtAddr;
}
