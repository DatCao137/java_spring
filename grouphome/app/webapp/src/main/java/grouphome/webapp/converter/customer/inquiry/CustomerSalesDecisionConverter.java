package grouphome.webapp.converter.customer.inquiry;

import com.fasterxml.jackson.core.type.TypeReference;
import grouphome.webapp.converter.CommonJsonConverter;
import grouphome.webapp.dto.requests.customer.inquiry.CustomerSalesSaveRequestDto.Decision;

public class CustomerSalesDecisionConverter extends CommonJsonConverter<Decision> {
    @Override
    protected TypeReference<Decision> getTypeReference() {
        return new TypeReference<Decision>() {};
    }
}
