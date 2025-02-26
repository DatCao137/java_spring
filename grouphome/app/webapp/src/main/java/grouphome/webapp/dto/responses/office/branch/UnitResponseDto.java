package grouphome.webapp.dto.responses.office.branch;

import lombok.Data;

@Data
public class UnitResponseDto {
    private Long unitId;
    private Long homeId;
    private String unitName;
    private Long addrId;
    private String postNo;
    private Integer prefId;
    private String prefName;
    private String city;
    private String town;
    private String tel;
    private String fax; 
    private String mail;
    private String contents;
    private String updatedAtUnit;
    private String updatedAtAddr;
}
