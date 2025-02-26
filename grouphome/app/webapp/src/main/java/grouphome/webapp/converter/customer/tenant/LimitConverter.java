package grouphome.webapp.converter.customer.tenant;

import com.fasterxml.jackson.core.type.TypeReference;
import grouphome.webapp.converter.CommonJsonConverter;
import grouphome.webapp.dto.requests.customer.tenant.SaveCustomerHandbookStatusRequestDto.Limit;
import jakarta.persistence.Converter;

@Converter
public class LimitConverter extends CommonJsonConverter<Limit> {
    @Override
    protected TypeReference<Limit> getTypeReference() {
            return new TypeReference<Limit>() {
        };
    }
}
