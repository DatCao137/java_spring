package grouphome.webapp.converter.customer.inquiry;

import com.fasterxml.jackson.core.type.TypeReference;
import grouphome.webapp.converter.CommonJsonConverter;
import grouphome.webapp.dto.requests.customer.inquiry.InquirySaveRequestDto.*;

public class InquiryConverter extends CommonJsonConverter<InquirySrc> {
    @Override
    protected TypeReference<InquirySrc> getTypeReference() {
        return new TypeReference<InquirySrc>() {};
    }
}
