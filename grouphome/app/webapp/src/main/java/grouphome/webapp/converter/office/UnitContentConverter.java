package grouphome.webapp.converter.office;

import com.fasterxml.jackson.core.type.TypeReference;
import grouphome.webapp.converter.CommonJsonConverter;
import grouphome.webapp.dto.requests.office.SaveUnitRequestDto.*;

public class UnitContentConverter extends CommonJsonConverter<UnitContent> {
    @Override
    protected TypeReference<UnitContent> getTypeReference() {
        return new TypeReference<UnitContent>() {};
    }
}
