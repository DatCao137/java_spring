package grouphome.webapp.dto.responses.blc_common;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@Data
@EqualsAndHashCode(callSuper = true)
public class PagerResponse<T> extends BaseResponse<T> {
    private Integer totalRecord;
    private Integer totalPage;

    public PagerResponse(T data) {
        super(data);
    }

    public PagerResponse(T data, HttpStatus code) {
        super(data, code);
    }

    public PagerResponse() {
        super();
    }

}
