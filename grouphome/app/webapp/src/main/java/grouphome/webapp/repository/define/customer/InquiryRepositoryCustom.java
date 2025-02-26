package grouphome.webapp.repository.define.customer;

import grouphome.webapp.dto.requests.customer.inquiry.*;
import grouphome.webapp.repository.define.blc_common.PagerRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import grouphome.webapp.dto.responses.customer.inquiry.*;
import java.util.List;

public interface InquiryRepositoryCustom extends PagerRepository {
    Page<ListResponseDto> getInquiryList(GeneralRequestDto request, Pageable pageable);

    Page<InquiryDetailResponseDto> getDetails(InquiryDetailRequestDto request, Pageable pageable);

    ProfileInfoResponseDto getInfoProfile(InquiryRequestDto request);

}
