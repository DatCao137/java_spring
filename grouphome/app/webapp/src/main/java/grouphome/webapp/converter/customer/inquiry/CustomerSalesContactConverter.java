package grouphome.webapp.converter.customer.inquiry;

import com.fasterxml.jackson.core.type.TypeReference;
import grouphome.webapp.converter.CommonJsonConverter;
import grouphome.webapp.dto.requests.customer.inquiry.CustomerSalesSaveRequestDto.Contact;

public class CustomerSalesContactConverter extends CommonJsonConverter<Contact> {
    @Override
    protected TypeReference<Contact> getTypeReference() {
        return new TypeReference<Contact>() {};
    }
}
