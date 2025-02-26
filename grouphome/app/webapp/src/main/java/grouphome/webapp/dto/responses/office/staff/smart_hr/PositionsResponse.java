package grouphome.webapp.dto.responses.office.staff.smart_hr;

import java.util.Map;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PositionsResponse {
    private String id;
    private String name;
    private Integer rank;
    private String code;

    public void setPosition(Map<String, String> vals) {
        id = vals.get("id");
        name = vals.get("name");
        rank = Integer.parseInt(vals.get("rank"));
        code = vals.get("code");
    }
}
