package grouphome.webapp.service.define;

import grouphome.webapp.dto.requests.blc_common.SelectListRequestDto;
import grouphome.webapp.dto.responses.blc_common.SelectListResponseDto;

import java.util.Map;
import java.util.List;

public interface SelectListService {
    Map<String, List<SelectListResponseDto>> find(SelectListRequestDto request);
}
