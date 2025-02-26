package grouphome.webapp.dto.responses.office.staff.smart_hr;

import java.util.Map;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DepartmentsResponse {
    private String id;
    private String name;
    private String fullName;
    private Integer position;
    private String code;

    public void setDepartment(Map<String, String> vals) {
        id = vals.get("id");
        name = vals.get("name");
        fullName = vals.get("full_name");
        position = Integer.parseInt(vals.get("position"));
        code = vals.get("code");
    }
}
