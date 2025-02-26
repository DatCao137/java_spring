package grouphome.webapp.converter.tenant;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import grouphome.webapp.dto.requests.customer.tenant.SaveCustomerApplicationStatusRequestDto.IndividualMunicipality;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class IndividualMunicipalityConverter implements AttributeConverter<IndividualMunicipality, String> {
    private final ObjectMapper objectMapper = new ObjectMapper();
    /**
     * @param individualMunicipality IndividualMunicipality
     * @return String
     */
    @Override
    public String convertToDatabaseColumn(IndividualMunicipality individualMunicipality) {
        try {
            return objectMapper.writeValueAsString(individualMunicipality);
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * @param s String
     * @return IndividualMunicipality
     */
    @Override
    public IndividualMunicipality convertToEntityAttribute(String s) {
        try {
            return objectMapper.readValue(s, IndividualMunicipality.class);
        } catch (JsonProcessingException e) {
            return null;
        }
    }
}
