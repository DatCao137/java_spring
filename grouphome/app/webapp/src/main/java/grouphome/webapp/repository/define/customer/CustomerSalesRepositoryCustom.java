package grouphome.webapp.repository.define.customer;

import grouphome.webapp.dto.requests.customer.inquiry.CustomerSalesInfoRequestDto;
import grouphome.webapp.dto.requests.customer.inquiry.CustomerSalesSaveRequestDto;
import grouphome.webapp.dto.responses.customer.inquiry.CustomerSalesInfoResponseDto;
import grouphome.webapp.dto.responses.customer.inquiry.CustomerSalesSaveResponseDto;

public interface CustomerSalesRepositoryCustom {
    CustomerSalesInfoResponseDto getCustomerSalesInfo(CustomerSalesInfoRequestDto req);

    CustomerSalesSaveResponseDto save(CustomerSalesSaveRequestDto request);

    Long delete(Long id);
}
