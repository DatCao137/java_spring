package grouphome.webapp.converter.customer.inquiry;

import com.fasterxml.jackson.core.type.TypeReference;
import grouphome.webapp.converter.CommonJsonConverter;
import grouphome.webapp.dto.requests.customer.inquiry.InquiryProfileSaveRequestDto.*;

public class ProfileServiceConverter extends CommonJsonConverter<Service> {
    @Override
    protected TypeReference<Service> getTypeReference() {
        return new TypeReference<Service>() {};
    }
}
