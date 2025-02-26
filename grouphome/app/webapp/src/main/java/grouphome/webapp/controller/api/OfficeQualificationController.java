package grouphome.webapp.controller.api;

import grouphome.webapp.controller.BaseController;
import grouphome.webapp.dto.responses.blc_common.BaseResponse;
import grouphome.webapp.dto.responses.blc_common.PagerResponse;
import grouphome.webapp.dto.responses.office.qualification.OfficeQualificationListResponseDto;
import grouphome.webapp.service.define.OfficeQualificationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class OfficeQualificationController extends BaseController {

    private final OfficeQualificationService officeQualificationService;

    @Autowired
    public OfficeQualificationController(OfficeQualificationService officeQualificationService) {
        this.officeQualificationService = officeQualificationService;
    }

    @PostMapping("/qualification/list")
    @ResponseBody
    public ResponseEntity<BaseResponse<List<OfficeQualificationListResponseDto>>> list() {
        List<OfficeQualificationListResponseDto> res = this.officeQualificationService.getList();
        return returnSuccess(new BaseResponse<>(res));
    }
}
