package grouphome.webapp.utils;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ResponseCodeAndMsg {
    SUCCESS(HttpStatus.OK, "SUCCESS"),
    BAD_REQUEST(HttpStatus.BAD_REQUEST, "BAD REQUEST"),
    CONFLICT(HttpStatus.CONFLICT, "CONFLICTED"),
    NOT_FOUND(HttpStatus.NOT_FOUND, "404 NOT FOUND"),
    INVALID_VALIDATION(HttpStatus.UNPROCESSABLE_ENTITY, "1つ以上のフィールドの検証に失敗しました"),
    TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "Token Expiration"),
    ACCESS_IS_DENIED(HttpStatus.FORBIDDEN, "You do not have access to this data");

    private HttpStatus code;
    private String message;

    public void setCode(HttpStatus code) {
        this.code = code;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    ResponseCodeAndMsg(HttpStatus code, String message) {
        this.code = code;
        this.message = message;
    }
}
