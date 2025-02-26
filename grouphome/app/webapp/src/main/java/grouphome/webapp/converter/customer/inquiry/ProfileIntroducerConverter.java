package grouphome.webapp.converter.customer.inquiry;

import com.fasterxml.jackson.core.type.TypeReference;
import grouphome.webapp.converter.CommonJsonConverter;
import grouphome.webapp.dto.requests.customer.inquiry.InquiryProfileSaveRequestDto.*;

public class ProfileIntroducerConverter extends CommonJsonConverter<Introducer> {
    @Override
    protected TypeReference<Introducer> getTypeReference() {
        return new TypeReference<Introducer>() {};
    }
}
