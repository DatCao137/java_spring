package grouphome.webapp.converter.customer;

import com.fasterxml.jackson.core.type.TypeReference;
import grouphome.webapp.converter.CommonJsonConverter;
import grouphome.webapp.dto.requests.customer.SaveRequestRequestDto.*;

public class RequestDesiredDateConverter extends CommonJsonConverter<DesiredDate> {
    @Override
    protected TypeReference<DesiredDate> getTypeReference() {
        return new TypeReference<DesiredDate>() {};
    }
}
