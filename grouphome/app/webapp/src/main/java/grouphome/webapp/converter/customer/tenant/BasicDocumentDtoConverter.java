package grouphome.webapp.converter.customer.tenant;

import com.fasterxml.jackson.core.type.TypeReference;
import grouphome.webapp.converter.CommonJsonConverter;
import grouphome.webapp.dto.requests.customer.tenant.SaveCustomerMoveinDocumentStatusRequestDto.*;
import jakarta.persistence.Converter;

@Converter
public class BasicDocumentDtoConverter extends CommonJsonConverter<BasicDocumentDto> {
    @Override
    protected TypeReference<BasicDocumentDto> getTypeReference() {
        return new TypeReference<BasicDocumentDto>() {};
    }
}
