package grouphome.webapp.repository.define.office;

import grouphome.webapp.dto.requests.office.FacilityDailyListRequestDto;
import grouphome.webapp.dto.requests.office.GeneralRequestDto;
import grouphome.webapp.dto.responses.office.branch.FacilityDailyListResponseDto;
import grouphome.webapp.repository.define.blc_common.PagerRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

public interface BranchRepositoryCustom extends PagerRepository {
    Map<String, Object> getBranchList(GeneralRequestDto request);

    Object getBranchDetail(GeneralRequestDto request);

    Object getCalcDiv(GeneralRequestDto request);

    List<Object[]> getCalcInfoList(GeneralRequestDto request);

    Page<FacilityDailyListResponseDto> getFacilityDailyList(FacilityDailyListRequestDto request, Pageable pageable);
}
