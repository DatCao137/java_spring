package grouphome.webapp.service.define;

import grouphome.webapp.dto.requests.office.OfficeRoomListRequestDto;
import grouphome.webapp.dto.requests.office.OfficeRoomSaveRequestDto;
import grouphome.webapp.dto.responses.office.room.OfficeRoomListResponseDto;
import grouphome.webapp.dto.responses.office.room.OfficeRoomSaveResponseDto;

import java.util.List;

public interface OfficeRoomService {
    List<OfficeRoomListResponseDto> getAll(OfficeRoomListRequestDto request);

    OfficeRoomSaveResponseDto save(OfficeRoomSaveRequestDto request);

    Long delete(Long id);

}
