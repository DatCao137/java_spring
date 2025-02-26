package grouphome.webapp.controller.api;

import grouphome.webapp.controller.BaseController;
import grouphome.webapp.dto.requests.office.GeneralRequestDto;
import grouphome.webapp.dto.requests.office.RoomIsFreeRequestDto;
import grouphome.webapp.dto.requests.office.RoomListRequestDto;
import grouphome.webapp.dto.requests.office.SaveRoomManageRequestDto;
import grouphome.webapp.dto.responses.blc_common.PagerResponse;
import grouphome.webapp.dto.responses.blc_common.BaseResponse;
import grouphome.webapp.dto.responses.office.room.*;
import grouphome.webapp.service.define.RoomManageService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RoomManageController extends BaseController {
    private final RoomManageService roomManageService;

    @Autowired
    public RoomManageController(RoomManageService roomManageService) {
        this.roomManageService = roomManageService;
    }

    @PostMapping("/roomManage")
	public ResponseEntity<BaseResponse<List<ListResponseDto>>> list(@RequestBody GeneralRequestDto request) {
        PagerResponse<List<ListResponseDto>> roomList = roomManageService.getRoomList(request);
        return returnSuccess(roomList);
	}

    @PostMapping("/roomManage/save")
    @Operation(
        summary = "Save a room manage",
        description = "Save a room manage",
        responses = {
            @ApiResponse(
                responseCode = "200",
                description = "Room Manage info save successfully",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = BaseResponse.class))
            ),
            @ApiResponse(
                responseCode = "400",
                description = "Invalid input",
                content = @Content(mediaType = "application/json")
            )
        }
    )
    public ResponseEntity<BaseResponse<SaveInfoResponseDto>> save(@Valid @RequestBody SaveRoomManageRequestDto request) {
        SaveInfoResponseDto roomManageInfo = roomManageService.saveRoomManageInfo(request);
        return returnSuccess(new BaseResponse<>(roomManageInfo));
    }

    @DeleteMapping("/roomManage/delete/{id}")
    @Operation(
        summary = "Delete an roomManage",
        description = "Delete an roomManage by its ID",
        responses = {
            @ApiResponse(
                responseCode = "200",
                description = "roomManage deleted successfully",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = BaseResponse.class))
            ),
            @ApiResponse(
                responseCode = "404",
                description = "roomManage not found",
                content = @Content(mediaType = "application/json")
            )
        }
    )
    public ResponseEntity<BaseResponse<String>> delete(@PathVariable(value = "", name = "id", required = true) Long id) {
        return returnSuccess(new BaseResponse<>("Delete roomManage info with ID: " + roomManageService.deleteRoomManageInfo(id) + " successfully!"));
    }

    @PostMapping("/roomManage/maps")
    public ResponseEntity<BaseResponse<List<OfficeRoomMapResponseDto>>> maps(@RequestBody RoomListRequestDto req) {
        List<OfficeRoomMapResponseDto> ret = roomManageService.map(req);
        return returnSuccess(new BaseResponse<>(ret));
    }

    @PostMapping("roomManage/isFree")
    public ResponseEntity<BaseResponse<OfficeRoomIsFreeResponseDto>> isFree(@RequestBody RoomIsFreeRequestDto req) {
        OfficeRoomIsFreeResponseDto ret = roomManageService.isFree(req);
        return returnSuccess(new BaseResponse<>(ret));
    }

    @PostMapping("/roomManage/calc")
    public ResponseEntity<BaseResponse<InfoResponseDto>> calc(@Valid @RequestBody GeneralRequestDto request) {
        roomManageService.calc();
        return returnSuccess(new BaseResponse<>());
    }

}
