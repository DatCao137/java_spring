package grouphome.webapp.repository.define.office;

import grouphome.webapp.dto.requests.office.GeneralRequestDto;
import grouphome.webapp.dto.requests.office.RoomIsFreeRequestDto;
import grouphome.webapp.dto.requests.office.RoomListRequestDto;
import grouphome.webapp.dto.requests.office.RoomSumsRequestDto;
import grouphome.webapp.dto.responses.office.room.OfficeRoomIsFreeResponseDto;
import grouphome.webapp.dto.responses.office.room.OfficeRoomMapResponseDto;
import grouphome.webapp.dto.responses.office.room.SumsResponseDto;
import grouphome.webapp.entity.OfficeRoomManageEntity;
import grouphome.webapp.repository.define.blc_common.PagerRepository;

import java.util.List;
import java.util.Map;

public interface RoomManageRepositoryCustom extends PagerRepository {
    Map<String, Object> getRoomList(GeneralRequestDto request);
    List<OfficeRoomMapResponseDto> getRoomListFromHome(RoomListRequestDto req);
    OfficeRoomIsFreeResponseDto getFreeStatus(RoomIsFreeRequestDto req);
    List<SumsResponseDto> getPersonDayData(RoomSumsRequestDto yyyymm);
}
