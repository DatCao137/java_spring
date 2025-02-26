package grouphome.webapp.converter.tenant;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import grouphome.webapp.dto.requests.customer.tenant.SaveCustomerApplicationStatusRequestDto.MunicipalRentSubsidy;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class MunicipalRentSubsidyConverter implements AttributeConverter<MunicipalRentSubsidy, String> {
    private final ObjectMapper objectMapper = new ObjectMapper();
    /**
     * @param municipalRentSubsidy MunicipalRentSubsidy
     * @return String
     */
    @Override
    public String convertToDatabaseColumn(MunicipalRentSubsidy municipalRentSubsidy) {
        try {
            return objectMapper.writeValueAsString(municipalRentSubsidy);
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * @param s String
     * @return MunicipalRentSubsidy
     */
    @Override
    public MunicipalRentSubsidy convertToEntityAttribute(String s) {
        try {
            return objectMapper.readValue(s, MunicipalRentSubsidy.class);
        } catch (JsonProcessingException e) {
            return null;
        }
    }
}
