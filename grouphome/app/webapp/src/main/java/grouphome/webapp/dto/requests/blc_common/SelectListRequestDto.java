package grouphome.webapp.dto.requests.blc_common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class SelectListRequestDto {
    private String[] type;
    private Params[] param;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Params {
        private String  key;
        private Para[]  params;
    }
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Para {
        public String name;
        public String value;
    }
}
