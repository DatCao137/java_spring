package grouphome.webapp.converter.customer.tenant;

import com.fasterxml.jackson.core.type.TypeReference;
import grouphome.webapp.converter.CommonJsonConverter;
import grouphome.webapp.dto.requests.customer.tenant.SaveCustomerMonitoringRequestDto.*;
import jakarta.persistence.Converter;

@Converter
public class MonitoringInfoConverter extends CommonJsonConverter<MonitoringInfo> {
    @Override
    protected TypeReference<MonitoringInfo> getTypeReference() {
            return new TypeReference<MonitoringInfo>() {
        };
    }
}
