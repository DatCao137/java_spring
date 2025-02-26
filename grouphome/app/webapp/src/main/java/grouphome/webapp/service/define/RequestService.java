package grouphome.webapp.service.define;

import grouphome.webapp.dto.requests.customer.RequestListRequestDto;
import grouphome.webapp.dto.requests.customer.SaveRequestRequestDto;
import grouphome.webapp.dto.requests.customer.GoMoveinRequestDto;
import grouphome.webapp.dto.responses.blc_common.PagerResponse;
import grouphome.webapp.dto.responses.customer.request.*;

import java.util.List;

public interface RequestService {
    PagerResponse<List<ListResponseDto>> getRequestList(RequestListRequestDto request);

    DetailResponseDto getRequestDetail(Integer id);

    SaveResponseDto save(SaveRequestRequestDto request);

    Long delete(Long id);

    GoMoveinResponseDto goMovein(GoMoveinRequestDto request);
}
