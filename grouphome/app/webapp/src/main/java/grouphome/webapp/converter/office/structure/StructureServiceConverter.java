package grouphome.webapp.converter.office.structure;

import com.fasterxml.jackson.core.type.TypeReference;
import grouphome.webapp.converter.CommonJsonConverter;
import grouphome.webapp.dto.requests.office.SaveStructureRequestDto.*;

public class StructureServiceConverter extends CommonJsonConverter<Service> {
    @Override
    protected TypeReference<Service> getTypeReference() {
        return new TypeReference<Service>() {};
    }
}
