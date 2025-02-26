package grouphome.webapp.converter.customer.tenant;

import com.fasterxml.jackson.core.type.TypeReference;
import grouphome.webapp.converter.CommonJsonConverter;
import grouphome.webapp.dto.requests.customer.tenant.SaveCustomerDocumentStatusRequestDto.*;
import jakarta.persistence.Converter;

import java.util.List;

@Converter
public class MonitoringConverter extends CommonJsonConverter<List<Monitoring>> {
    @Override
    protected TypeReference<List<Monitoring>> getTypeReference() {
        return new TypeReference<List<Monitoring>>() {
        };
    }
}
