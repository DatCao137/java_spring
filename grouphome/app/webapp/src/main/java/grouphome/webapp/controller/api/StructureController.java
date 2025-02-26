package grouphome.webapp.controller.api;

import grouphome.webapp.controller.BaseController;
import grouphome.webapp.dto.requests.office.GeneralRequestDto;
import grouphome.webapp.dto.requests.office.SaveStructureRequestDto;
import grouphome.webapp.dto.responses.blc_common.BaseResponse;
import grouphome.webapp.dto.responses.office.branch.StructureResponseDto;
import grouphome.webapp.dto.responses.office.branch.SaveStructureResponseDto;
import grouphome.webapp.entity.OfficeStructureEntity;
import grouphome.webapp.service.define.StructureService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class StructureController extends BaseController {
    private final StructureService structureService;

    @Autowired
    public StructureController(StructureService structureService) {
        this.structureService = structureService;
    }

    @PostMapping("/structure")
    @ResponseBody
    public ResponseEntity<BaseResponse<StructureResponseDto>> getStructure(@RequestBody GeneralRequestDto request) {
        StructureResponseDto dto = this.structureService.getStructure(request);
        return returnSuccess(new BaseResponse<>(dto));
    }

    @PostMapping("/structure/info")
    @ResponseBody
    public ResponseEntity<BaseResponse<OfficeStructureEntity>> getStructEntity(@RequestBody GeneralRequestDto request) {
        OfficeStructureEntity entity = this.structureService.getEntity(request);
        return returnSuccess(new BaseResponse<>(entity));
    }

    @PostMapping("/structure/save")
    public ResponseEntity<BaseResponse<SaveStructureResponseDto>> createPersonnelStructInfo(@Valid @RequestBody SaveStructureRequestDto request) {
        SaveStructureResponseDto dto = structureService.saveStructureInfo(request);
        return returnSuccess(new BaseResponse<>(dto));
    }


    @DeleteMapping("/personnel-struct-info/delete/{id}")
    public ResponseEntity<BaseResponse<String>> deletePersonnelStructInfo(@PathVariable(value = "", name = "id", required = true) Long id) {
        return returnSuccess(new BaseResponse<>("Delete personnel struct info with ID: " + structureService.deletePersonnelStructInfo(id) + " successfully!"));
    }
}
