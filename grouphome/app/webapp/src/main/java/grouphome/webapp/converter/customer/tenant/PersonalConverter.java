package grouphome.webapp.converter.customer.tenant;

import com.fasterxml.jackson.core.type.TypeReference;
import grouphome.webapp.converter.CommonJsonConverter;
import grouphome.webapp.dto.requests.customer.tenant.SaveCustomerRequestDto.Personal;
import jakarta.persistence.Converter;

@Converter
public class PersonalConverter extends CommonJsonConverter<Personal> {
    @Override
    protected TypeReference<Personal> getTypeReference() {
        return new TypeReference<Personal>() {};
    }
}
