package grouphome.webapp.dto.requests.office;

import lombok.Data;
import lombok.EqualsAndHashCode;
import java.util.Map;

import grouphome.webapp.dto.requests.blc_common.PagerDto;
@Data
@EqualsAndHashCode(callSuper=false)
public class DocRequestDto extends PagerDto {
    private Filter filter;

    @Data
    public static class Filter {
        private Integer id;
        
        private Integer docId;

        private Integer pathId;
        
        private String docName;

        private String fileName;

        private String ext;

        private byte[] data;

        private String comment;

        private String created_at;

        private String updated_at;
    }
}
