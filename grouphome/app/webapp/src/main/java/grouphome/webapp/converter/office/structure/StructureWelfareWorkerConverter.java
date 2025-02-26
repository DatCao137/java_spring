package grouphome.webapp.converter.office.structure;

import com.fasterxml.jackson.core.type.TypeReference;
import grouphome.webapp.converter.CommonJsonConverter;
import grouphome.webapp.dto.requests.office.SaveStructureRequestDto.*;

public class StructureWelfareWorkerConverter extends CommonJsonConverter<WelfareWorker> {
    @Override
    protected TypeReference<WelfareWorker> getTypeReference() {
        return new TypeReference<WelfareWorker>() {};
    }
}