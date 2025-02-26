package grouphome.webapp.exception;

import grouphome.webapp.dto.responses.blc_common.BaseResponse;
import grouphome.webapp.dto.responses.blc_common.ValidationErrorResponse;
import grouphome.webapp.utils.ResponseCodeAndMsg;
import jakarta.persistence.PessimisticLockException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.exception.LockAcquisitionException;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.TransactionSystemException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalControllerExceptionHandler {

    private static final Logger LOGGER = LogManager.getLogger(GlobalControllerExceptionHandler.class);

    @ExceptionHandler(Throwable.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<BaseResponse<?>> handleException(Throwable ex) {
        LOGGER.error("ERROR: {}", ex.getMessage());
        BaseResponse<Object> response = new BaseResponse<>();
        response.setMessage(ex.getMessage());

        if (ex instanceof ApiException apiException) {
            response.setCode(apiException.getCode());
            response.setMessage(apiException.getMessage());
            response.setData(apiException.getData());
        } else {
            response.setCode(HttpStatus.INTERNAL_SERVER_ERROR);
            response.setMessage(ex.getMessage());
        }

        return new ResponseEntity<>(response, response.getCode());
    }

    /**
     * Func: handleValidationExceptions
     * 
     * @param ex MethodArgumentNotValidException
     * @return ValidationErrorResponse
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ValidationErrorResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
        ValidationErrorResponse response = new ValidationErrorResponse();

        Map<String, String> errors = new HashMap<>();

        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errors.put(error.getField(), error.getDefaultMessage());
        }

        response.setMessage(ResponseCodeAndMsg.INVALID_VALIDATION.getMessage());
        response.setCode(ResponseCodeAndMsg.INVALID_VALIDATION.getCode());
        response.setErrors(errors);
        return new ResponseEntity<>(response, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    @ExceptionHandler(OptimisticLockingFailureException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ResponseEntity<BaseResponse<?>> handleOptimisticLockingFailure(OptimisticLockingFailureException ex) {
        LOGGER.error("Optimistic locking failure: {}", ex.getMessage());
        BaseResponse<Object> response = new BaseResponse<>();
        response.setCode(HttpStatus.CONFLICT); // code = 409
        response.setMessage("Optimistic locking failure. The record was updated by someone else.");
        return new ResponseEntity<>(response, HttpStatus.CONFLICT);
    }

    @ExceptionHandler({PessimisticLockException.class, LockAcquisitionException.class, TransactionSystemException.class})
    @ResponseStatus(HttpStatus.CONFLICT)
    public ResponseEntity<BaseResponse<?>> handlePessimisticLockException(PessimisticLockException ex) {
        LOGGER.error("Pessimistic locking failure: {}", ex.getMessage());
        BaseResponse<Object> response = new BaseResponse<>();
        response.setCode(HttpStatus.CONFLICT); // code = 409
        response.setMessage("他のユーザに更新されています。");
        return new ResponseEntity<>(response, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(TokenExpiredException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ResponseEntity<BaseResponse<?>> handleTokenExpiredException(TokenExpiredException ex) {
        LOGGER.error("Token expired: {}", ex.getMessage());

        BaseResponse<Object> response = new BaseResponse<>();
        // set response code = 401
        response.setCode(HttpStatus.UNAUTHORIZED);
        response.setMessage("Token has expired. Please login again.");

        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }
}
