package grouphome.webapp.converter.office.structure;

import com.fasterxml.jackson.core.type.TypeReference;
import grouphome.webapp.converter.CommonJsonConverter;
import grouphome.webapp.dto.requests.office.SaveStructureRequestDto.*;

public class StructureLifeSupporterConverter extends CommonJsonConverter<LifeSupporter> {
    @Override
    protected TypeReference<LifeSupporter> getTypeReference() {
        return new TypeReference<LifeSupporter>() {};
    }
}

