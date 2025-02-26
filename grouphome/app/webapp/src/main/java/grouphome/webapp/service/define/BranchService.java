package grouphome.webapp.service.define;

import grouphome.webapp.dto.requests.office.FacilityDailyListRequestDto;
import grouphome.webapp.dto.requests.office.GeneralRequestDto;
import grouphome.webapp.dto.requests.office.SaveBranchRequestDto;
import grouphome.webapp.dto.responses.blc_common.PagerResponse;
import grouphome.webapp.dto.responses.office.branch.*;

import java.util.List;

public interface BranchService {
    PagerResponse<List<ListResponseDto>> getBranchList(GeneralRequestDto request);

    DetailResponseDto getBranchDetail(GeneralRequestDto request);

    DetailResponseDto saveBranchInfo(SaveBranchRequestDto request);

    Long deleteBranchInfo(Long id);

    PagerResponse<List<FacilityDailyListResponseDto>> getFacilityDailyList(FacilityDailyListRequestDto request);
}
