package grouphome.webapp.repository.define.customer;

import grouphome.webapp.dto.requests.customer.inquiry.SalesFollowListRequestDto;
import grouphome.webapp.dto.requests.customer.inquiry.SalesFollowSaveRequestDto;
import grouphome.webapp.dto.responses.customer.inquiry.CustomerSalesInfoResponseDto;
import grouphome.webapp.dto.responses.customer.inquiry.SalesFollowInfoResponseDto;
import grouphome.webapp.dto.responses.customer.inquiry.SalesFollowListResponseDto;
import grouphome.webapp.dto.responses.customer.inquiry.SalesFollowSaveResponseDto;

import java.util.List;

public interface CustomerSalesFollowRepositoryCustom {
    List<SalesFollowListResponseDto> getSalesFollowList(SalesFollowListRequestDto req);

    SalesFollowSaveResponseDto save(SalesFollowSaveRequestDto req);

    Long delete(Long id);
}
