package grouphome.webapp.validator;

import grouphome.webapp.utils.JsonUtils;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class JsonValidator implements ConstraintValidator<ValidJson, String> {
    @Override
    public void initialize(ValidJson constraintAnnotation) {
    }

    @Override
    public boolean isValid(String json, ConstraintValidatorContext context) {
        if (json == null || json.trim().isEmpty()) {
            return true;
        }
        return JsonUtils.isValidJson(json);
    }
}
