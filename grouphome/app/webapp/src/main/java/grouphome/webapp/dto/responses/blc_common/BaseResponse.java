package grouphome.webapp.dto.responses.blc_common;

import grouphome.webapp.utils.ResponseCodeAndMsg;
import org.springframework.http.HttpStatus;
import lombok.Data;

@Data
public class BaseResponse<T> {
    private HttpStatus code = HttpStatus.OK;
    private String message = "SUCCESS";
    private T data;

    public BaseResponse(T data) {
        super();
        this.data = data;
    }

    public BaseResponse(T data, HttpStatus code) {
        super();
        this.code = code;
        this.data = data;
    }

    public BaseResponse() {
        super();
    }

    public void setCodeAndMsg(ResponseCodeAndMsg msg) {
        this.code = msg.getCode();
        this.message = msg.getMessage();
    }
}
