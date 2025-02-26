package grouphome.webapp.service.define;

import grouphome.webapp.dto.responses.office.qualification.OfficeQualificationListResponseDto;

import java.util.List;

public interface OfficeQualificationService {
    List<OfficeQualificationListResponseDto> getList();
}
