package grouphome.webapp.converter.customer.inquiry;

import com.fasterxml.jackson.core.type.TypeReference;
import grouphome.webapp.converter.CommonJsonConverter;
import grouphome.webapp.dto.requests.customer.inquiry.InquiryProfileSaveRequestDto.*;

public class ProfilePocketBookConverter extends CommonJsonConverter<PocketBook> {
    @Override
    protected TypeReference<PocketBook> getTypeReference() {
        return new TypeReference<PocketBook>() {};
    }
}
