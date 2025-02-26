package grouphome.webapp.dto.responses.office.staff.smart_hr;

import java.util.Map;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CrewCustomFieldTemplate {
    private String id;
    private String name;
    private CrewCustomFieldElements[] elements;
}
