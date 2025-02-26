package grouphome.webapp.repository.define.office;

import grouphome.webapp.dto.responses.office.qualification.OfficeQualificationListResponseDto;

import java.util.List;

public interface OfficeQualificationRepositoryCustom {
    List<OfficeQualificationListResponseDto> getList();
}
