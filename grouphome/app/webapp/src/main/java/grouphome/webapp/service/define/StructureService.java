package grouphome.webapp.service.define;

import grouphome.webapp.dto.requests.office.GeneralRequestDto;
import grouphome.webapp.dto.requests.office.SaveStructureRequestDto;
import grouphome.webapp.dto.responses.office.branch.SaveStructureResponseDto;
import grouphome.webapp.dto.responses.office.branch.StructureResponseDto;
import grouphome.webapp.entity.OfficeStructureEntity;


public interface StructureService {
    StructureResponseDto getStructure(GeneralRequestDto request);

    OfficeStructureEntity getEntity(GeneralRequestDto request);

    SaveStructureResponseDto saveStructureInfo(SaveStructureRequestDto request);

    Long deletePersonnelStructInfo(Long id);
}
