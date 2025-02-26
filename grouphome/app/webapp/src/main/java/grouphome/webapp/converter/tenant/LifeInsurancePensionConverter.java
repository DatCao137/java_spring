package grouphome.webapp.converter.tenant;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import grouphome.webapp.dto.requests.customer.tenant.SaveCustomerApplicationStatusRequestDto.LifeInsurancePension;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class LifeInsurancePensionConverter implements AttributeConverter<LifeInsurancePension, String> {
    private final ObjectMapper objectMapper = new ObjectMapper();
    /**
     * @param lifeInsurancePension LifeInsurancePension
     * @return String
     */
    @Override
    public String convertToDatabaseColumn(LifeInsurancePension lifeInsurancePension) {
        try {
            return objectMapper.writeValueAsString(lifeInsurancePension);
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * @param s String
     * @return LifeInsurancePension
     */
    @Override
    public LifeInsurancePension convertToEntityAttribute(String s) {
        try {
            return objectMapper.readValue(s, LifeInsurancePension.class);
        } catch (JsonProcessingException e) {
            return null;
        }
    }
}
