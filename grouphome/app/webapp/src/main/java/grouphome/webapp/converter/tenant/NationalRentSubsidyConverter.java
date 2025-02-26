package grouphome.webapp.converter.tenant;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import grouphome.webapp.dto.requests.customer.tenant.SaveCustomerApplicationStatusRequestDto.NationalRentSubsidy;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class NationalRentSubsidyConverter implements AttributeConverter<NationalRentSubsidy, String> {
    private final ObjectMapper objectMapper = new ObjectMapper();
    /**
     * @param nationalRentSubsidy NationalRentSubsidy
     * @return String
     */
    @Override
    public String convertToDatabaseColumn(NationalRentSubsidy nationalRentSubsidy) {
        try {
            return objectMapper.writeValueAsString(nationalRentSubsidy);
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * @param s String
     * @return NationalRentSubsidy
     */
    @Override
    public NationalRentSubsidy convertToEntityAttribute(String s) {
        try {
            return objectMapper.readValue(s, NationalRentSubsidy.class);
        } catch (JsonProcessingException e) {
            return null;
        }
    }
}
