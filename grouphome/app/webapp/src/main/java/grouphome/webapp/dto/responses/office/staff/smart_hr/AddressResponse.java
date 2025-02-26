package grouphome.webapp.dto.responses.office.staff.smart_hr;

import java.util.Map;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressResponse {
    private String zip_code;
    private String pref;
    private String city;
    private String street;
    private String building;

    public void setAddress(Map<String, String> vals) {
        zip_code = vals.get("zip_code");
        pref = vals.get("pref");
        city = vals.get("city");
        street = vals.get("street");
        building = vals.get("building");
    }
}
