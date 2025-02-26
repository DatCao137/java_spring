package grouphome.webapp.dto.responses.office.doc;

import lombok.Data;

@Data
public class ListResponseDto {
    private Integer id;

    private Integer docId;

    private String docName;

    private String fileName;
    
    private String ext;

    private byte[] dataFile;

    private String comment;

    private String created_at;

    private String updated_at;

}
