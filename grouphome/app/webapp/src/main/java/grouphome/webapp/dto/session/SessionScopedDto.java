package grouphome.webapp.dto.session;

import lombok.Data;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

import java.io.Serializable;

@Component
@SessionScope
@Data
public class SessionScopedDto implements Serializable {
    private String data;
}
