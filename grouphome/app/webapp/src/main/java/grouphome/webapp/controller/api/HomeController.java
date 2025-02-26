package grouphome.webapp.controller.api;

import grouphome.webapp.controller.BaseController;
import grouphome.webapp.dto.requests.office.*;
import grouphome.webapp.dto.responses.blc_common.BaseResponse;
import grouphome.webapp.dto.responses.blc_common.PagerResponse;
import grouphome.webapp.dto.responses.office.home.*;
import grouphome.webapp.entity.OfficeHomeEntity;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import grouphome.webapp.service.define.HomeService;

import java.util.List;

@RestController
public class HomeController extends BaseController {
    private final HomeService homeService;

    @Autowired
    public HomeController(HomeService homeService) {
        this.homeService = homeService;
    }

    @PostMapping("/home")
	public ResponseEntity<BaseResponse<List<ListResponseDto>>> list(@RequestBody HomeRequestDto request) {
        PagerResponse<List<ListResponseDto>> homeList = homeService.getHomeList(request);
        return returnSuccess(homeList);
	}

    @PostMapping("/home/save")
    @Operation(
        summary = "Save a home & Address",
        description = "Save a home & Address",
        responses = {
            @ApiResponse(
                responseCode = "200",
                description = "HomeInfo save successfully",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = BaseResponse.class))
            ),
            @ApiResponse(
                responseCode = "400",
                description = "Invalid input",
                content = @Content(mediaType = "application/json")
            )
        }
    )
    public ResponseEntity<BaseResponse<SaveInfoResponseDto>> save(@Valid @RequestBody SaveHomeRequestDto request) {
        SaveInfoResponseDto homeInfo = homeService.saveHomeInfo(request);
        return returnSuccess(new BaseResponse<>(homeInfo));
    }

    @DeleteMapping("/home/delete/{id}")
    @Operation(
        summary = "Delete an home",
        description = "Delete an home by its ID",
        responses = {
            @ApiResponse(
                responseCode = "200",
                description = "Home deleted successfully",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = BaseResponse.class))
            ),
            @ApiResponse(
                responseCode = "404",
                description = "Home not found",
                content = @Content(mediaType = "application/json")
            )
        }
    )
    public ResponseEntity<BaseResponse<String>> delete(@PathVariable(value = "", name = "id", required = true) Long id) {
        return returnSuccess(new BaseResponse<>("Delete home info with ID: " + homeService.deleteHomeInfo(id) + " successfully!"));
    }

    @GetMapping("/home/list")
    public ResponseEntity<BaseResponse<List<OfficeHomeEntity>>> getAll() {
        return returnSuccess(new BaseResponse<>(homeService.getAll()));
    }
}
