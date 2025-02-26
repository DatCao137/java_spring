package grouphome.webapp.repository.define.office;

import grouphome.webapp.dto.requests.office.*;
import grouphome.webapp.dto.responses.office.room.OfficeRoomListResponseDto;
import grouphome.webapp.dto.responses.office.room.OfficeRoomSaveResponseDto;

import java.util.List;

public interface OfficeRoomRepositoryCustom {
    List<OfficeRoomListResponseDto> findAll(OfficeRoomListRequestDto request);

    OfficeRoomSaveResponseDto save(OfficeRoomSaveRequestDto request);

    Long delete(Long id);
}
