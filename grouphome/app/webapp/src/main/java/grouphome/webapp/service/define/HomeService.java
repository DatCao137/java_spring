package grouphome.webapp.service.define;

import grouphome.webapp.dto.requests.office.*;
import grouphome.webapp.dto.requests.office.SaveHomeRequestDto;
import grouphome.webapp.dto.responses.blc_common.PagerResponse;
import grouphome.webapp.dto.responses.office.home.*;
import grouphome.webapp.entity.OfficeHomeEntity;

import java.util.List;

public interface HomeService {
    PagerResponse<List<ListResponseDto>> getHomeList(HomeRequestDto request);

    SaveInfoResponseDto saveHomeInfo(SaveHomeRequestDto request);

    Long deleteHomeInfo(Long id);

    List<OfficeHomeEntity> getAll();
}
