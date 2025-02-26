package grouphome.webapp.dto.requests.office;

import lombok.Data;
import lombok.EqualsAndHashCode;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

@Data
@EqualsAndHashCode(callSuper=false)
public class DocSaveRequestDto{

    private Long id;

    private Long oldId;
        
    private Long docId;

    private Long pathId;
    
    private String docName;

    private String fileName;

    private String ext;

    private MultipartFile dataFile;

    private String comment;

    private String created_at;

    private String updated_at;
}
