package grouphome.webapp.converter.office.structure;

import com.fasterxml.jackson.core.type.TypeReference;
import grouphome.webapp.converter.CommonJsonConverter;
import grouphome.webapp.dto.requests.office.SaveStructureRequestDto.*;

public class StructureNurseConverter extends CommonJsonConverter<Nurse> {
    @Override
    protected TypeReference<Nurse> getTypeReference() {
        return new TypeReference<Nurse>() {};
    }
}
