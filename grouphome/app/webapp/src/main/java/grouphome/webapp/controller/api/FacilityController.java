package grouphome.webapp.controller.api;

import grouphome.webapp.controller.BaseController;
import grouphome.webapp.dto.requests.facility.DailyRecorderBasicInfoRequestDto;
import grouphome.webapp.dto.requests.office.FacilityDailyListRequestDto;
import grouphome.webapp.dto.responses.blc_common.BaseResponse;
import grouphome.webapp.dto.responses.blc_common.PagerResponse;
import grouphome.webapp.dto.responses.facility.DailyRecorderBasicInfoResponseDto;
import grouphome.webapp.dto.responses.office.branch.FacilityDailyListResponseDto;
import grouphome.webapp.service.define.BranchService;
import grouphome.webapp.service.define.FacilityDailyService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import grouphome.webapp.dto.responses.facility.detail.*;
import grouphome.webapp.dto.requests.facility.detail.*;

import java.util.List;

@RestController
public class FacilityController extends BaseController {
    @Autowired
    private BranchService branchService;

    @Autowired
    private FacilityDailyService facilityDailyService;

    @PostMapping("/facility-daily")
	public ResponseEntity<BaseResponse<List<FacilityDailyListResponseDto>>> getFacilityDailyList(@RequestBody FacilityDailyListRequestDto req) {
        PagerResponse<List<FacilityDailyListResponseDto>> requestList = branchService.getFacilityDailyList(req);
        return returnSuccess(requestList);
    }

    @PostMapping("/daily-unit/list")
    public ResponseEntity<BaseResponse<ListResponseDto>> getListUnits(@RequestBody ListUnitRequestDto param) {
        ListResponseDto responseDto = this.facilityDailyService.getListUnits(param);
        return returnSuccess(new BaseResponse<>(responseDto));
    }

    @PostMapping("/facility-daily/customer-items")
    public ResponseEntity<BaseResponse<List<ListCustomerItemsResponseDto>>> getListCustomerItems(@Valid @RequestBody ListCustomerItemsRequestDto request) {
        return returnSuccess(facilityDailyService.getListCustomerItems(request));
    }

    @PostMapping("/facility-daily/customer-items/save")
    public ResponseEntity<BaseResponse<SaveCustomerItemsResponseDto>> saveCustomerItems(@Valid @RequestBody SaveCustomerItemsRequestDto request) {
        SaveCustomerItemsResponseDto result = facilityDailyService.saveCustomerItems(request);
        return returnSuccess(new BaseResponse<>(result));
    }

    @GetMapping("/facility-daily-recorder/basic-info")
    public ResponseEntity<BaseResponse<DailyRecorderBasicInfoResponseDto>> getFacilityDailyRecorderBasicInfo(
        @Valid @ModelAttribute DailyRecorderBasicInfoRequestDto req
    ) {
        DailyRecorderBasicInfoResponseDto result = facilityDailyService.getFacilityDailyRecorderBasicInfo(req);
        return returnSuccess(new BaseResponse<>(result));
    }
}
