package grouphome.webapp.converter.customer.inquiry;

import com.fasterxml.jackson.core.type.TypeReference;
import grouphome.webapp.converter.CommonJsonConverter;
import grouphome.webapp.dto.requests.customer.inquiry.InquiryDetailSaveRequestDto.*;

public class DetailBreakdownConverter extends CommonJsonConverter<Breakdown> {
    @Override
    protected TypeReference<Breakdown> getTypeReference() {
        return new TypeReference<Breakdown>() {};
    }
}
