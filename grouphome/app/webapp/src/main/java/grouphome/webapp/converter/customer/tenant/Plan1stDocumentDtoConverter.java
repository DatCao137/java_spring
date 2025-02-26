package grouphome.webapp.converter.customer.tenant;

import com.fasterxml.jackson.core.type.TypeReference;
import grouphome.webapp.converter.CommonJsonConverter;
import grouphome.webapp.dto.requests.customer.tenant.SaveCustomerMoveinDocumentStatusRequestDto.Plan1stDocumentDto;
import jakarta.persistence.Converter;

@Converter
public class Plan1stDocumentDtoConverter extends CommonJsonConverter<Plan1stDocumentDto> {
    @Override
    protected TypeReference<Plan1stDocumentDto> getTypeReference() {
        return new TypeReference<Plan1stDocumentDto>() {};
    }
}
