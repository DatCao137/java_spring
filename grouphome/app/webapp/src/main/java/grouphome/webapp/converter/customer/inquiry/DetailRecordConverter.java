package grouphome.webapp.converter.customer.inquiry;

import com.fasterxml.jackson.core.type.TypeReference;
import grouphome.webapp.converter.CommonJsonConverter;
import grouphome.webapp.dto.requests.customer.inquiry.InquiryDetailSaveRequestDto.*;

public class DetailRecordConverter extends CommonJsonConverter<Record> {
    @Override
    protected TypeReference<Record> getTypeReference() {
        return new TypeReference<Record>() {};
    }
}
