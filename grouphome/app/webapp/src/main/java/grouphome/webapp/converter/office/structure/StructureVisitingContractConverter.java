package grouphome.webapp.converter.office.structure;

import com.fasterxml.jackson.core.type.TypeReference;
import grouphome.webapp.converter.CommonJsonConverter;
import grouphome.webapp.dto.requests.office.SaveStructureRequestDto.*;

public class StructureVisitingContractConverter extends CommonJsonConverter<VisitingContract> {
    @Override
    protected TypeReference<VisitingContract> getTypeReference() {
        return new TypeReference<VisitingContract>() {};
    }
}
