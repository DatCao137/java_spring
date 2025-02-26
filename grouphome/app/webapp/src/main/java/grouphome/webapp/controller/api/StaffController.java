package grouphome.webapp.controller.api;

import grouphome.webapp.controller.BaseController;
import grouphome.webapp.dto.requests.office.GeneralRequestDto;
import grouphome.webapp.dto.requests.office.StaffDetailRequestDto;
import grouphome.webapp.dto.requests.office.StaffListRequestDto;
import grouphome.webapp.dto.requests.office.StaffSaveQualificationRequestDto;
import grouphome.webapp.dto.requests.office.StaffSaveRequestDto;
import grouphome.webapp.dto.responses.blc_common.BaseResponse;
import grouphome.webapp.dto.responses.blc_common.PagerResponse;
import grouphome.webapp.dto.responses.office.branch.ListOfNameAndIdResponseDto;
import grouphome.webapp.dto.responses.office.staff.InfoResponseDto;
import grouphome.webapp.dto.responses.office.staff.DetailResponseDto;
import grouphome.webapp.dto.responses.office.staff.ListResponseDto;
import grouphome.webapp.service.define.SmartHRService;
import grouphome.webapp.service.define.StaffService;
import io.swagger.v3.oas.annotations.Operation;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StaffController extends BaseController {
    private final StaffService staffService;
    private final SmartHRService smartHrService;

    @Autowired
    public StaffController(StaffService staffService, SmartHRService smartHRService) {
        this.staffService = staffService;
        this.smartHrService = smartHRService;
    }

    @GetMapping("/staff/smartHR")
    @ResponseBody
    public ResponseEntity<BaseResponse<String>> syncSmartHR(@RequestBody GeneralRequestDto para) {
        smartHrService.sync();
        return returnSuccess(new BaseResponse<>("OK"));
    }

    @Operation(
        summary = "Retrieve paginated staff list",
        description = "Fetches a list of staff members based on filter parameters such as home ID, branch ID, and name."
    )
    @PostMapping("/staff/list")
    @ResponseBody
    public ResponseEntity<BaseResponse<List<ListResponseDto>>> list(@Valid @RequestBody StaffListRequestDto param) {
        PagerResponse<List<ListResponseDto>> res = this.staffService.getList(param);
        return returnSuccess(res);
    }

    @Operation(
        summary = "Retrieve staff details",
        description = "Fetches detailed information about a staff member."
    )
    @PostMapping("/staff/detail")
    @ResponseBody
    public ResponseEntity<BaseResponse<DetailResponseDto>> detail(@Valid @RequestBody StaffDetailRequestDto request) {
        DetailResponseDto res = this.staffService.getDetail(request);
        return returnSuccess(new BaseResponse<>(res));
    }

    @Operation(
        summary = "Delete staff",
        description = "Deletes a staff member."
    )
    @DeleteMapping("/staff/{id}")
    @ResponseBody
    public ResponseEntity<BaseResponse<String>> delete(@PathVariable(name = "id") Long id) {
        return returnSuccess(new BaseResponse<>("Delete request info with ID: " + this.staffService.delete(id) + " successfully!"));
    }

    @PostMapping("/staff/save")
    @ResponseBody
    public ResponseEntity<BaseResponse<DetailResponseDto>> save(@Valid @RequestBody StaffSaveRequestDto request) {
        DetailResponseDto res = this.staffService.save(request);
        return returnSuccess(new BaseResponse<>(res));
    }

    @PostMapping("/staff/saveQualification")
    @ResponseBody
    public ResponseEntity<BaseResponse<List<DetailResponseDto.Qualification>>> save(@Valid @RequestBody StaffSaveQualificationRequestDto request) {
        List<DetailResponseDto.Qualification> res = this.staffService.saveQualification(request);
        return returnSuccess(new BaseResponse<>(res));
    }

    @GetMapping("/staff/list/{branchId}")
    public ResponseEntity<BaseResponse<List<ListOfNameAndIdResponseDto>>> getListByBranchId(@PathVariable(name = "branchId") Integer branchId) {
        List<ListOfNameAndIdResponseDto> res = this.staffService.getListByBranchId(branchId);
        return returnSuccess(new BaseResponse<>(res));
    }
}
