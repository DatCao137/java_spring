package grouphome.webapp.converter.customer.tenant;

import com.fasterxml.jackson.core.type.TypeReference;
import grouphome.webapp.converter.CommonJsonConverter;
import grouphome.webapp.dto.requests.customer.tenant.SaveCustomerHandbookStatusRequestDto.Recipient;
import jakarta.persistence.Converter;

@Converter
public class RecipientConverter extends CommonJsonConverter<Recipient> {
    @Override
    protected TypeReference<Recipient> getTypeReference() {
        return new TypeReference<Recipient>() {};
    }
}
