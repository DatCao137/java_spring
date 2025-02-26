package grouphome.webapp.controller.api;

import grouphome.webapp.controller.BaseController;
import grouphome.webapp.dto.requests.office.GeneralRequestDto;
import grouphome.webapp.dto.requests.office.SaveUnitRequestDto;
import grouphome.webapp.dto.responses.blc_common.BaseResponse;
import grouphome.webapp.dto.responses.office.branch.UnitResponseDto;
import grouphome.webapp.dto.responses.office.branch.SaveUnitResponseDto;
import grouphome.webapp.service.define.UnitService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UnitInfoController extends BaseController {
    private final UnitService unitService;

    @Autowired
    public UnitInfoController(UnitService unitService) {
        this.unitService = unitService;
    }

    @PostMapping("/unit")
    @ResponseBody
    public ResponseEntity<BaseResponse<List<UnitResponseDto>>> unit(@RequestBody GeneralRequestDto request) {
        List<UnitResponseDto> unitList = unitService.getUnit(request);
        return returnSuccess(new BaseResponse<>(unitList));
    }

    @PostMapping("/unit/save")
    public ResponseEntity<BaseResponse<SaveUnitResponseDto>> saveUnitInfo(@Valid @RequestBody SaveUnitRequestDto request) {
        SaveUnitResponseDto officeInfo = unitService.saveUnitInfo(request);
        return returnSuccess(new BaseResponse<>(officeInfo));
    }

    @DeleteMapping("/unit/delete/{id}")
    public ResponseEntity<BaseResponse<String>> deleteUnitInfo(@PathVariable(value = "", name = "id", required = true) Long id) {
        return returnSuccess(new BaseResponse<>("Delete unit info with ID: " + unitService.deleteUnit(id) + " successfully!"));
    }
}
