package grouphome.webapp.converter.office;

import com.fasterxml.jackson.core.type.TypeReference;
import grouphome.webapp.converter.CommonJsonConverter;
import grouphome.webapp.dto.requests.office.SaveBranchRequestDto.*;

public class BranchContentConverter extends CommonJsonConverter<BranchContent> {
    @Override
    protected TypeReference<BranchContent> getTypeReference() {
        return new TypeReference<BranchContent>() {};
    }
}
