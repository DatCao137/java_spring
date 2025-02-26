package grouphome.webapp.dto.responses.office.qualification;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class OfficeQualificationListResponseDto {
    private Long id;
    private String type;
    private String name;

    @JsonIgnore
    private String limitJson;

    private Limit limit;

    @Data
    @NoArgsConstructor
    public static class Limit {
        private Boolean period;
        private Integer rangeYear;
    }
}