package grouphome.webapp.converter.office;

import com.fasterxml.jackson.core.type.TypeReference;
import grouphome.webapp.converter.CommonJsonConverter;
import grouphome.webapp.dto.requests.office.OfficeRoomSaveRequestDto.Content;

public class OfficeRoomContentConverter extends CommonJsonConverter<Content> {
    @Override
    protected TypeReference<Content> getTypeReference() {
        return new TypeReference<Content>() {};
    }
}
