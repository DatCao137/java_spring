package grouphome.webapp.converter.tenant;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import grouphome.webapp.dto.requests.customer.tenant.SaveCustomerApplicationStatusRequestDto.PersonalLiability;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class PersonalLiabilityConverter implements AttributeConverter<PersonalLiability, String> {
    private final ObjectMapper objectMapper = new ObjectMapper();
    /**
     * @param personalLiability PersonalLiability
     * @return String
     */
    @Override
    public String convertToDatabaseColumn(PersonalLiability personalLiability) {
        try {
            return objectMapper.writeValueAsString(personalLiability);
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * @param s String
     * @return PersonalLiability
     */
    @Override
    public PersonalLiability convertToEntityAttribute(String s) {
        try {
            return objectMapper.readValue(s, PersonalLiability.class);
        } catch (JsonProcessingException e) {
            return null;
        }
    }
}
