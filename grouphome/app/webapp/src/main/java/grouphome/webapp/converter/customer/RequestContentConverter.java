package grouphome.webapp.converter.customer;

import com.fasterxml.jackson.core.type.TypeReference;
import grouphome.webapp.converter.CommonJsonConverter;
import grouphome.webapp.dto.requests.customer.SaveRequestRequestDto.*;

public class RequestContentConverter extends CommonJsonConverter<Contents> {
    @Override
    protected TypeReference<Contents> getTypeReference() {
        return new TypeReference<Contents>() {};
    }
}
