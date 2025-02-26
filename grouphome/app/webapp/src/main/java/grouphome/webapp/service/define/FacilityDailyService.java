package grouphome.webapp.service.define;
import grouphome.webapp.dto.responses.blc_common.PagerResponse;
import grouphome.webapp.dto.responses.facility.detail.*;
import grouphome.webapp.dto.requests.facility.detail.*;

import java.util.List;
import grouphome.webapp.dto.requests.facility.DailyRecorderBasicInfoRequestDto;
import grouphome.webapp.dto.responses.facility.DailyRecorderBasicInfoResponseDto;

public interface FacilityDailyService {

    ListResponseDto getListUnits(ListUnitRequestDto request);
    PagerResponse<List<ListCustomerItemsResponseDto>> getListCustomerItems(ListCustomerItemsRequestDto request);
    SaveCustomerItemsResponseDto saveCustomerItems(SaveCustomerItemsRequestDto request);
    DailyRecorderBasicInfoResponseDto getFacilityDailyRecorderBasicInfo(DailyRecorderBasicInfoRequestDto req);
}
