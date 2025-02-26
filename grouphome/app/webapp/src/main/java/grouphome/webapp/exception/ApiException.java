package grouphome.webapp.exception;

import grouphome.webapp.utils.ResponseCodeAndMsg;
import lombok.Getter;
import org.springframework.http.HttpStatus;


@Getter
public class ApiException extends RuntimeException {
    private HttpStatus code;
    private String message = "";
    private Object data;

    public ApiException(HttpStatus code) {
        this.code = code;
        this.message = "";
    }

    public ApiException(ResponseCodeAndMsg exception) {
        super(exception.getMessage());
        this.code = exception.getCode();
        this.message = exception.getMessage();
    }

    public ApiException(ResponseCodeAndMsg exception, Object data) {
        super(exception.getMessage());
        this.code = exception.getCode();
        this.message = exception.getMessage();
        this.data = data;
    }

    public ApiException(ResponseCodeAndMsg exception, String errorMsg) {
        super(errorMsg);
        this.code = exception.getCode();
        this.message = errorMsg;
    }

    public ApiException(ResponseCodeAndMsg exception, String errorMsg, Object data) {
        super(errorMsg);
        this.code = exception.getCode();
        this.message = errorMsg;
        this.data = data;
    }

    public ApiException(HttpStatus code, String message) {
        super(message);
        this.code = code;
        this.message = message;
    }

    public ApiException() {
        this.message = "";
    }
}
