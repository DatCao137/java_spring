package grouphome.webapp.converter.customer.inquiry;

import com.fasterxml.jackson.core.type.TypeReference;
import grouphome.webapp.converter.CommonJsonConverter;
import grouphome.webapp.dto.requests.customer.inquiry.InquiryProfileSaveRequestDto.*;

public class ProfileResidenceConverter extends CommonJsonConverter<Residence> {
    @Override
    protected TypeReference<Residence> getTypeReference() {
        return new TypeReference<Residence>() {};
    }
}
