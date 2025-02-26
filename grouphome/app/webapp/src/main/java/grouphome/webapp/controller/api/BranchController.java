package grouphome.webapp.controller.api;

import grouphome.webapp.controller.BaseController;
import grouphome.webapp.dto.requests.office.*;
import grouphome.webapp.dto.responses.blc_common.BaseResponse;
import grouphome.webapp.dto.responses.blc_common.PagerResponse;
import grouphome.webapp.dto.responses.office.branch.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import grouphome.webapp.service.define.BranchService;

import java.util.List;

@RestController
public class BranchController extends BaseController {
    private final BranchService branchService;

    @Autowired
    public BranchController(BranchService branchService) {
        this.branchService = branchService;
    }

    @PostMapping("/branch")
    public ResponseEntity<BaseResponse<List<ListResponseDto>>> list(@RequestBody GeneralRequestDto request) {
        PagerResponse<List<ListResponseDto>> res = branchService.getBranchList(request);
        return returnSuccess(res);
    }

    @PostMapping("/branch/detail")
    public ResponseEntity<BaseResponse<DetailResponseDto>> getDetail(@RequestBody GeneralRequestDto request) {
        DetailResponseDto detailResponseDto = this.branchService.getBranchDetail(request);
        return returnSuccess(new BaseResponse<>(detailResponseDto));
    }

    @PostMapping("/branch/save")
    @Operation(summary = "Save a branch & branchDetail & Address", description = "Save a branch & branchDetail & Address", responses = {
            @ApiResponse(responseCode = "200", description = "Branch save successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = BaseResponse.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content(mediaType = "application/json"))
    })
    public ResponseEntity<BaseResponse<DetailResponseDto>> save(@Valid @RequestBody SaveBranchRequestDto request) {
        DetailResponseDto branchInfo = branchService.saveBranchInfo(request);
        return returnSuccess(new BaseResponse<>(branchInfo));
    }

    @DeleteMapping("/branch/delete/{id}")
    @Operation(summary = "Delete an branch", description = "Delete an branch by its ID", responses = {
            @ApiResponse(responseCode = "200", description = "Branch deleted successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = BaseResponse.class))),
            @ApiResponse(responseCode = "404", description = "Branch not found", content = @Content(mediaType = "application/json"))
    })
    public ResponseEntity<BaseResponse<String>> deleteBranch(
            @PathVariable(value = "", name = "id", required = true) Long id) {
        return returnSuccess(new BaseResponse<>(
                "Delete branch info with ID: " + branchService.deleteBranchInfo(id) + " successfully!"));
    }
}
