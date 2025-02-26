package grouphome.webapp.converter.customer.inquiry;

import com.fasterxml.jackson.core.type.TypeReference;
import grouphome.webapp.converter.CommonJsonConverter;
import grouphome.webapp.dto.requests.customer.inquiry.InquiryProfileSaveRequestDto.*;

public class ProfileDisabledConverter extends CommonJsonConverter<Disabled> {
    @Override
    protected TypeReference<Disabled> getTypeReference() {
        return new TypeReference<Disabled>() {};
    }
}
