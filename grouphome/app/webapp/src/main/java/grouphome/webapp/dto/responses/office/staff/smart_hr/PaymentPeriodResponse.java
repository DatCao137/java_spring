package grouphome.webapp.dto.responses.office.staff.smart_hr;

import java.util.Map;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentPeriodResponse {
    private String id;
    private String name;
    private String periodType;
    private String updated_at;
    private String created_at;

    public void setPosition(Map<String, String> vals) {
        id = vals.get("id");
        name = vals.get("name");
        periodType = vals.get("period_type");
        updated_at = vals.get("updated_at");
        created_at = vals.get("created_at");
    }
}
