package grouphome.webapp.service.define;

import grouphome.webapp.dto.requests.office.GeneralRequestDto;
import grouphome.webapp.dto.requests.office.RoomIsFreeRequestDto;
import grouphome.webapp.dto.requests.office.RoomListRequestDto;
import grouphome.webapp.dto.requests.office.SaveRoomManageRequestDto;
import grouphome.webapp.dto.responses.blc_common.PagerResponse;
import grouphome.webapp.dto.responses.office.room.*;

import java.util.List;

public interface RoomManageService {
    PagerResponse<List<ListResponseDto>> getRoomList(GeneralRequestDto request);
    SaveInfoResponseDto saveRoomManageInfo(SaveRoomManageRequestDto request);
    Long deleteRoomManageInfo(Long id);
    List<OfficeRoomMapResponseDto> map(RoomListRequestDto req);
    OfficeRoomIsFreeResponseDto isFree(RoomIsFreeRequestDto req);
    void calc();
}
