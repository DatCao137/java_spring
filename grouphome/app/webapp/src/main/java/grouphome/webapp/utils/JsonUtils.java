package grouphome.webapp.utils;

import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonUtils {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static boolean isValidJson(String contents) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            objectMapper.readTree(contents);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public static Map<String, String> tryParse(String contents) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readValue(contents, new TypeReference<Map<String, String>>() {});
        } catch (Exception e) {
            return null;
        }
    }

    public static <T> T parseJson(String json, TypeReference<T> typeReference) {
        try {
            return objectMapper.readValue(json, typeReference);
        } catch (JsonProcessingException e) {
            return null;
        }
    }

    public static String toJson(Object object) {
        try {
            return objectMapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            return null;
        }
    }
}
