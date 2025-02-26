package grouphome.webapp.converter.customer;

import com.fasterxml.jackson.core.type.TypeReference;
import grouphome.webapp.converter.CommonJsonConverter;
import grouphome.webapp.dto.requests.customer.SaveRequestRequestDto.*;

public class RequestRepresentativeInfoConverter extends CommonJsonConverter<RepresentativeInfo> {
    @Override
    protected TypeReference<RepresentativeInfo> getTypeReference() {
        return new TypeReference<RepresentativeInfo>() {};
    }
}
