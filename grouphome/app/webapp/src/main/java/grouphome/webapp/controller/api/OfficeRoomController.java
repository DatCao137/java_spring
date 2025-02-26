package grouphome.webapp.controller.api;

import grouphome.webapp.controller.BaseController;
import grouphome.webapp.dto.requests.office.*;
import grouphome.webapp.dto.responses.blc_common.BaseResponse;
import grouphome.webapp.dto.responses.office.room.OfficeRoomSaveResponseDto;
import grouphome.webapp.service.define.OfficeRoomService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import grouphome.webapp.dto.responses.office.room.OfficeRoomListResponseDto;
import grouphome.webapp.dto.requests.office.OfficeRoomListRequestDto;

import java.util.List;

@RestController
public class OfficeRoomController extends BaseController {
    @Autowired
    private OfficeRoomService officeRoomService;

    @Autowired
    public OfficeRoomController(OfficeRoomService officeRoomService) {
        this.officeRoomService = officeRoomService;
    }

    @PostMapping("/office-room")
	public ResponseEntity<BaseResponse<List<OfficeRoomListResponseDto>>> list(@RequestBody OfficeRoomListRequestDto req) {
        List<OfficeRoomListResponseDto> requestList = officeRoomService.getAll(req);
        return returnSuccess(new BaseResponse<>(requestList));
    }

    @PostMapping("/office-room/save")
    public ResponseEntity<BaseResponse<OfficeRoomSaveResponseDto>> save(@Valid @RequestBody OfficeRoomSaveRequestDto request) {
        OfficeRoomSaveResponseDto res = officeRoomService.save(request);
        return returnSuccess(new BaseResponse<>(res));
    }

    @DeleteMapping("/office-room/delete/{id}")
    @ResponseBody
    public ResponseEntity<BaseResponse<String>> delete(@PathVariable(name = "id") Long id) {
        return returnSuccess(new BaseResponse<>("Delete office room with ID: " + this.officeRoomService.delete(id) + " successfully!"));
    }

}
