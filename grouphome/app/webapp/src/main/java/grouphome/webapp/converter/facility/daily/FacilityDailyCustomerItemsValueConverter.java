package grouphome.webapp.converter.facility.daily;

import com.fasterxml.jackson.core.type.TypeReference;
import grouphome.webapp.converter.CommonJsonConverter;
import jakarta.persistence.Converter;

@Converter
public class FacilityDailyCustomerItemsValueConverter extends CommonJsonConverter<Object> {
    @Override
    protected TypeReference<Object> getTypeReference() {
        return new TypeReference<Object>() {};
    }
}
