package grouphome.webapp.dto.responses.blc_common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ValidationErrorResponse {
    private HttpStatus code = HttpStatus.UNPROCESSABLE_ENTITY;
    private String message;
    private Map<String, String> errors;
}
