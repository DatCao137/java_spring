package grouphome.webapp.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public abstract class CommonJsonConverter<T> implements AttributeConverter<T, String> {
    private final ObjectMapper objectMapper;

    public CommonJsonConverter() {
        this.objectMapper = new ObjectMapper();
        this.objectMapper.registerModule(new JavaTimeModule());
    }

    @Override
    public String convertToDatabaseColumn(T attribute) {
        if (attribute == null) return null;
        try {
            return objectMapper.writeValueAsString(attribute);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public T convertToEntityAttribute(String s) {
        if (s == null || s.isEmpty()) return null;
        try {
            return objectMapper.readValue(s, getTypeReference());
        } catch (JsonProcessingException e) {
            return null;
        }
    }

    protected abstract TypeReference<T> getTypeReference();
}
