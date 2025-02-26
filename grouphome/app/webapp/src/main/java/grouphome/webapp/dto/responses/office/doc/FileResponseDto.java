package grouphome.webapp.dto.responses.office.doc;

import lombok.Data;

@Data
public class FileResponseDto {
    private Long id;

    private String fileName;

    private String ext;

    private String data;
}
