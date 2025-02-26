package grouphome.webapp.controller.api;

import grouphome.webapp.controller.BaseController;
import grouphome.webapp.dto.requests.office.GeneralRequestDto;
import grouphome.webapp.dto.requests.office.SaveCalcInfoRequestDto;
import grouphome.webapp.dto.responses.blc_common.BaseResponse;
import grouphome.webapp.dto.responses.office.branch.CalcListResponseDto;
import grouphome.webapp.dto.responses.office.branch.SaveCalcInfoResponseDto;
import grouphome.webapp.entity.OfficeCalcInfoEntity;
import grouphome.webapp.entity.OfficeCalcItemsEntity;
import grouphome.webapp.service.define.CalcInfoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.ArrayList;

@RestController
public class CalcInfoController extends BaseController {
    private final CalcInfoService calcInfoService;

    @Autowired
    public CalcInfoController(CalcInfoService calcInfoService) {
        this.calcInfoService = calcInfoService;
    }

    @PostMapping("/calc/master")
    public ResponseEntity<BaseResponse<List<OfficeCalcItemsEntity>>> master(
            @Valid @RequestBody GeneralRequestDto req) {
        List<OfficeCalcItemsEntity> ret = this.calcInfoService.getMaster(req);
        return returnSuccess(new BaseResponse<>(ret));
    }

    @PostMapping("/calc")
    @ResponseBody
    public ResponseEntity<BaseResponse<List<CalcListResponseDto>>> calcInfoList(@RequestBody GeneralRequestDto request) {
        List<CalcListResponseDto> result = calcInfoService.getCalcList(request);
        return returnSuccess(new BaseResponse<>(result));
    }
    
    @PostMapping("/calc/item")
    @ResponseBody
    public ResponseEntity<BaseResponse<List<OfficeCalcInfoEntity>>> calcInfo(@RequestBody GeneralRequestDto request) {
        List<OfficeCalcInfoEntity> result = calcInfoService.getCalcInfo(request);
        return returnSuccess(new BaseResponse<>(result));
    }

    @PostMapping("/calc/save")
    public ResponseEntity<BaseResponse<SaveCalcInfoResponseDto>> saveCalcInfo(
            @Valid @RequestBody SaveCalcInfoRequestDto[] request) {
        SaveCalcInfoResponseDto officeInfo = calcInfoService.saveCalcInfo(request);
        return returnSuccess(new BaseResponse<>(officeInfo));
    }
}
