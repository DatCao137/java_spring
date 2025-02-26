package grouphome.webapp.converter.customer.tenant;

import com.fasterxml.jackson.core.type.TypeReference;
import grouphome.webapp.converter.CommonJsonConverter;
import grouphome.webapp.dto.requests.customer.tenant.SaveCustomerDocumentStatusRequestDto.*;
import jakarta.persistence.Converter;

@Converter
public class DocumentStatusItemConverter extends CommonJsonConverter<DocumentStatusItem> {
    @Override
    protected TypeReference<DocumentStatusItem> getTypeReference() {
        return new TypeReference<DocumentStatusItem>() {
        };
    }
}
