package grouphome.webapp.controller;

import grouphome.webapp.dto.responses.blc_common.BaseResponse;
import grouphome.webapp.utils.ResponseCodeAndMsg;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class BaseController {
    protected final Logger log = LoggerFactory.getLogger(this.getClass());

    protected <T> ResponseEntity<BaseResponse<T>> returnSuccess(BaseResponse<T> response) {
        response.setCodeAndMsg(ResponseCodeAndMsg.SUCCESS);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    protected <T> ResponseEntity<BaseResponse<T>> returnSuccess() {
        BaseResponse<T> response = new BaseResponse<>();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
