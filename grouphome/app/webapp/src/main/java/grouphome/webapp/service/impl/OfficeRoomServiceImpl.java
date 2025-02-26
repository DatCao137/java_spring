package grouphome.webapp.service.impl;

import grouphome.webapp.dto.requests.office.*;
import grouphome.webapp.dto.responses.office.room.OfficeRoomSaveResponseDto;
import grouphome.webapp.repository.define.office.OfficeRoomRepositoryCustom;
import grouphome.webapp.service.define.OfficeRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import grouphome.webapp.dto.responses.office.room.OfficeRoomListResponseDto;
import java.util.List;

@Service
@Transactional
public class OfficeRoomServiceImpl implements OfficeRoomService {
    @Autowired
    private OfficeRoomRepositoryCustom officeRoomRepositoryCustom;

    @Autowired
    public OfficeRoomServiceImpl(
            OfficeRoomRepositoryCustom officeRoomRepositoryCustom
    ) {
        this.officeRoomRepositoryCustom = officeRoomRepositoryCustom;
    }

    @Override
    public List<OfficeRoomListResponseDto> getAll(OfficeRoomListRequestDto request) {
        List<OfficeRoomListResponseDto> result = officeRoomRepositoryCustom.findAll(request);
        return result;
    }

    @Override
    public OfficeRoomSaveResponseDto save(OfficeRoomSaveRequestDto request) {
        return officeRoomRepositoryCustom.save(request);
    }

    @Override
    public Long delete(Long id) {
        return officeRoomRepositoryCustom.delete(id);
    }
}
