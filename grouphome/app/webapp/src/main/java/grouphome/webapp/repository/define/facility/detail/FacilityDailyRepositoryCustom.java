package grouphome.webapp.repository.define.facility.detail;

import grouphome.webapp.dto.requests.facility.DailyRecorderBasicInfoRequestDto;
import grouphome.webapp.dto.responses.facility.DailyRecorderBasicInfoResponseDto;
import grouphome.webapp.repository.define.blc_common.PagerRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import grouphome.webapp.dto.requests.facility.detail.*;
import grouphome.webapp.dto.responses.facility.detail.*;

import java.util.List;

@Repository
public interface FacilityDailyRepositoryCustom extends PagerRepository {
    List<ListUnitResponseDto> getDataListUnits(ListUnitRequestDto request);

    List<ListDetailUnitResponseDto> getDataListUnitsRoom(ListUnitRequestDto request);

    DailyRecorderBasicInfoResponseDto getFacilityDailyRecorderBasicInfo(DailyRecorderBasicInfoRequestDto req);

    Page<ListCustomerItemsResponseDtoMapping> findAll(ListCustomerItemsRequestDto request, Pageable pageable);
}
