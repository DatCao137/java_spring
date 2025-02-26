package grouphome.webapp.service.define;
import grouphome.webapp.dto.responses.customer.inquiry.*;
import grouphome.webapp.dto.requests.customer.inquiry.*;
import grouphome.webapp.dto.requests.customer.inquiry.hearing.*;
import grouphome.webapp.dto.responses.customer.inquiry.hearing.*;
import grouphome.webapp.dto.responses.blc_common.PagerResponse;
import java.util.List;

public interface InquiryService {
    public List<Object[]> findAll();

    PagerResponse<List<ListResponseDto>> getInquiryList(GeneralRequestDto request);

    List<SalesFollowListResponseDto> getSalesFollows(SalesFollowListRequestDto req);

    SalesFollowSaveResponseDto saveSalesFollow(SalesFollowSaveRequestDto req);

    Long deleteSalesFollow(Long id);

    CustomerSalesInfoResponseDto getCustomerSalesInfo(CustomerSalesInfoRequestDto req);

    CustomerSalesSaveResponseDto saveCustomerSales(CustomerSalesSaveRequestDto req);

    Long deleteCustomerSales(Long id);

    Long saveInquiry(InquirySaveRequestDto request);

    Long deleteInquiry(Long id);

    Long saveDetail(InquiryDetailSaveRequestDto request);

    PagerResponse<List<InquiryDetailResponseDto>> getDetails(InquiryDetailRequestDto request);

    ProfileInfoResponseDto getInfoProfile(InquiryRequestDto request);

    SaveProfileInfoResponseDto saveProfileInfo(InquiryProfileSaveRequestDto request);

    Long saveCustomerHearing(SaveCustomerHearingRequestDto request);

    Long saveCustomerHearingDetail(SaveCustomerHearingDetailRequestDto request);

    InquiryHearingResponseDto getHearingInfo(Long id);

    Long deleteHearingDetail(Long id);

}
