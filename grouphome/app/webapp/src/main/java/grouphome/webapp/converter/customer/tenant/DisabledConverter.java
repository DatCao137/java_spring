package grouphome.webapp.converter.customer.tenant;

import com.fasterxml.jackson.core.type.TypeReference;
import grouphome.webapp.converter.CommonJsonConverter;
import grouphome.webapp.dto.requests.customer.tenant.SaveCustomerHandbookStatusRequestDto.Disabled;
import jakarta.persistence.Converter;

@Converter
public class DisabledConverter extends CommonJsonConverter<Disabled> {
    @Override
    protected TypeReference<Disabled> getTypeReference() {
        return new TypeReference<Disabled>() {
        };
    }
}
