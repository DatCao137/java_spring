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
import grouphome.webapp.service.define.EmployeeService;
import grouphome.webapp.dto.responses.employee.ListEmployeeResponseDto;
import grouphome.webapp.dto.requests.employee.EmployeeRequestDto;

import grouphome.webapp.dto.responses.employee.*;
import grouphome.webapp.dto.requests.employee.*;
import java.util.List;
import grouphome.webapp.entity.EmployeeEntity;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class EmployeeController extends BaseController {
    private final HomeService homeService;
    private final EmployeeService employeeService;

    @Autowired
    public EmployeeController(HomeService homeService, EmployeeService employeeService) {
        this.homeService = homeService; 
        this.employeeService = employeeService;
    }

    // @PostMapping("/employee")
	// public ResponseEntity<BaseResponse<List<ListResponseDto>>> list(@RequestBody HomeRequestDto request) {
    //     PagerResponse<List<ListResponseDto>> homeList = homeService.getHomeList(request);
    //     return returnSuccess(homeList);
	// }

    @PostMapping("/employee")
	public ResponseEntity<BaseResponse<List<ListEmployeeResponseDto>>> list(@RequestBody EmployeeRequestDto request) {
        PagerResponse<List<ListEmployeeResponseDto>> employeeList = employeeService.getEmployeeList(request);
        return returnSuccess(employeeList);
	}

    
    @PostMapping("/employee/save")
    @Operation(
        summary = "Save a employee",
        description = "Save a employee",
        responses = {
            @ApiResponse(
                responseCode = "200",
                description = "Employee save successfully",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = BaseResponse.class))
            ),
            @ApiResponse(
                responseCode = "400",
                description = "Invalid input",
                content = @Content(mediaType = "application/json")
            )
        }
    )
   
    public ResponseEntity<BaseResponse<SaveInfoEmployeeResponseDto>> save(@Valid @ModelAttribute SaveEmployeeRequestDto request) {
        SaveInfoEmployeeResponseDto employeeInfo = employeeService.saveEmployeeInfo(request);
        return returnSuccess(new BaseResponse<>(employeeInfo));
    }

    @DeleteMapping("/employee/delete/{id}")
    @Operation(
        summary = "Delete an employee",
        description = "Delete an employee by its ID",
        responses = {
            @ApiResponse(
                responseCode = "200",
                description = "employee deleted successfully",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = BaseResponse.class))
            ),
            @ApiResponse(
                responseCode = "404",
                description = "employee not found",
                content = @Content(mediaType = "application/json")
            )
        }
    )
    public ResponseEntity<BaseResponse<String>> delete(@PathVariable(value = "", name = "id", required = true) Long id) {
        return returnSuccess(new BaseResponse<>("Delete employee info with ID: " + employeeService.deleteEmployeeInfo(id) + " successfully!"));
    }

    @GetMapping("/employee/list")
    public ResponseEntity<BaseResponse<List<EmployeeEntity>>> getAll() {
        return returnSuccess(new BaseResponse<>(employeeService.getAll()));
    }
}
