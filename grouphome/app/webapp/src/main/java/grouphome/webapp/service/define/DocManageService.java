package grouphome.webapp.service.define;

import grouphome.webapp.entity.OfficeDocPathEntity;
import grouphome.webapp.entity.OfficeDocFileEntity;
import grouphome.webapp.dto.responses.blc_common.PagerResponse;
import grouphome.webapp.dto.responses.office.doc.ListResponseDto;
import grouphome.webapp.dto.responses.office.doc.SaveDocFileResponseDto;
import grouphome.webapp.dto.requests.office.DocRequestDto;
import grouphome.webapp.dto.requests.office.DocSaveRequestDto;

import java.util.List;

public interface DocManageService {
    public List<Object[]> findAll();

    PagerResponse<List<ListResponseDto>> getDocManageList(DocRequestDto dto);

    List<OfficeDocPathEntity> getAllDocPath();

    OfficeDocFileEntity getDocFileDetail(Integer id);

    List<OfficeDocFileEntity> getDocFileHistory(Integer id, Integer docId, Integer pathId);

    SaveDocFileResponseDto saveDocFileInfo(DocSaveRequestDto request);

    Long deleteDocFile(Long id);
}
