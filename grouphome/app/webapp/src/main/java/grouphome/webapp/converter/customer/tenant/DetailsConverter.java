package grouphome.webapp.converter.customer.tenant;

import com.fasterxml.jackson.core.type.TypeReference;
import grouphome.webapp.converter.CommonJsonConverter;
import grouphome.webapp.dto.requests.customer.tenant.SaveCustomerRequestDto.Details;
import jakarta.persistence.Converter;

@Converter
public class DetailsConverter extends CommonJsonConverter<Details> {
    @Override
    protected TypeReference<Details> getTypeReference() {
        return new TypeReference<Details>() {};
    }
}
