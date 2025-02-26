package grouphome.webapp.controller.api;

import grouphome.webapp.controller.BaseController;
import grouphome.webapp.entity.OfficeDocPathEntity;
import grouphome.webapp.entity.OfficeDocFileEntity;
import grouphome.webapp.service.define.DocManageService;
import grouphome.webapp.dto.requests.office.DocRequestDto;
import grouphome.webapp.dto.requests.office.DocSaveRequestDto;
import grouphome.webapp.dto.responses.blc_common.BaseResponse;
import grouphome.webapp.dto.responses.office.doc.*;
import grouphome.webapp.dto.responses.blc_common.PagerResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Base64;
import java.util.List;

@RestController
public class DocManageController extends BaseController {
    private final DocManageService docService;
    @Autowired
    public DocManageController(DocManageService docService) {
        this.docService = docService;
    }

    @PostMapping("/doc/file/list")
    @ResponseBody
	public ResponseEntity<BaseResponse<List<ListResponseDto>>> list(@RequestBody DocRequestDto para) {
        PagerResponse<List<ListResponseDto>> lst = docService.getDocManageList(para);
        return returnSuccess(lst);
	}

    @GetMapping("/doc/file/data")
    public FileResponseDto file(@RequestParam Integer id) {

        OfficeDocFileEntity detailFile = docService.getDocFileDetail(id);
        FileResponseDto dto = new FileResponseDto();

        dto.setId(detailFile.getId());
        dto.setFileName(detailFile.getFilename());
        dto.setExt(detailFile.getExt());
        dto.setData(this.encodeBase64(detailFile.getData(), detailFile.getExt()));

        return dto;
    }

    private String encodeBase64(byte[] byData, String contentType) {
        
        String base64String = Base64.getEncoder().encodeToString(byData);
        StringBuilder sb = new StringBuilder();
        sb.append("data:").append(contentType).append(";base64,").append(base64String);
        return sb.toString();
    }

    @GetMapping("/doc/path/list")
    public ResponseEntity<BaseResponse<List<OfficeDocPathEntity>>> docPathList() {
        List<OfficeDocPathEntity> list = docService.getAllDocPath();
        return returnSuccess(new BaseResponse<>(list));
    }

    @GetMapping("/doc/file/hist")
    public ResponseEntity<BaseResponse<List<OfficeDocFileEntity>>> getDocFileHistory(
                                                            @RequestParam Integer id, 
                                                            @RequestParam Integer docId, 
                                                            @RequestParam Integer pathId) {
        
        List<OfficeDocFileEntity> docFileHistory = docService.getDocFileHistory(id, docId, pathId);

        return returnSuccess(new BaseResponse<>(docFileHistory));
    }

    @PostMapping("/doc/file/save")
    @Operation(
        summary = "Save a Doc File",
        description = "Save a Doc File",
        responses = {
            @ApiResponse(
                responseCode = "200",
                description = "FileInfo save successfully",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = BaseResponse.class))
            ),
            @ApiResponse(
                responseCode = "400",
                description = "Invalid input",
                content = @Content(mediaType = "application/json")
            )
        }
    )
    public ResponseEntity<BaseResponse<SaveDocFileResponseDto>> save(@Valid @ModelAttribute DocSaveRequestDto request) {
        SaveDocFileResponseDto fileInfo = docService.saveDocFileInfo(request);
        return returnSuccess(new BaseResponse<>(fileInfo));
    }

    @DeleteMapping("/doc/file/delete/{id}")
    @Operation(summary = "Delete an file", description = "Delete an file by its ID", responses = {
            @ApiResponse(responseCode = "200", description = "File deleted successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = BaseResponse.class))),
            @ApiResponse(responseCode = "404", description = "File not found", content = @Content(mediaType = "application/json"))
    })
    public ResponseEntity<BaseResponse<String>> deleteDocFile(
            @PathVariable(value = "", name = "id", required = true) Long id) {
        return returnSuccess(new BaseResponse<>(
                "Delete branch info with ID: " + docService.deleteDocFile(id) + " successfully!"));
    }
}
