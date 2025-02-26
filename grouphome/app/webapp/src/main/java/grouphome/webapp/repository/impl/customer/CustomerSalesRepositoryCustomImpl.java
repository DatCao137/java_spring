package grouphome.webapp.repository.impl.customer;

import grouphome.webapp.dto.requests.customer.inquiry.CustomerSalesInfoRequestDto;
import grouphome.webapp.dto.requests.customer.inquiry.CustomerSalesSaveRequestDto;
import grouphome.webapp.dto.responses.customer.inquiry.CustomerSalesInfoResponseDto;
import grouphome.webapp.dto.responses.customer.inquiry.CustomerSalesSaveResponseDto;
import grouphome.webapp.entity.CustomerSalesEntity;
import grouphome.webapp.exception.ApiException;
import grouphome.webapp.repository.define.customer.CustomerSalesRepository;
import grouphome.webapp.repository.define.customer.CustomerSalesRepositoryCustom;
import grouphome.webapp.utils.ResponseCodeAndMsg;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public class CustomerSalesRepositoryCustomImpl implements CustomerSalesRepositoryCustom {
    @PersistenceContext
    private EntityManager entityManager;
    private final CustomerSalesRepository customerSalesRepository;

    public CustomerSalesRepositoryCustomImpl(CustomerSalesRepository customerSalesRepository) {
        this.customerSalesRepository = customerSalesRepository;
    }

    @Override
    public CustomerSalesInfoResponseDto getCustomerSalesInfo(CustomerSalesInfoRequestDto req) {
        try {
            String sql = """
                SELECT tcs.id as id, 
                        tcs.inquiry_info_id as inquiryInfoId, 
                        tcs.first_inquiry_date as firstInquiryDate, 
                        tcs.first_inquiry_how as firstInquiryHow, 
                        mbi.name as firstInquiryHowName, 
                        tcs.contact as contact, 
                        tcs.decision as decision,
                        tcs.updated_at as updatedAt  
                FROM t_customer_sales tcs 
                LEFT JOIN m_blc_item mbi ON tcs.first_inquiry_how = mbi.type_id 
                    AND mbi.item_type_id = 53
                WHERE tcs.inquiry_info_id = :inquiryId 
                    AND tcs.deleted_at IS NULL 
                """;

            Query query = entityManager.createNativeQuery(sql, "CustomerSalesInfoResponseDtoMapping");
            query.setParameter("inquiryId", req.getInquiryId());
            List<CustomerSalesInfoResponseDto> list = query.getResultList();

            if (list.isEmpty()) {
                CustomerSalesInfoResponseDto resultEmpty = new CustomerSalesInfoResponseDto();
                return resultEmpty;
            }

            CustomerSalesInfoResponseDto result = list.getFirst();
            return result;
        } catch (Exception e) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, e.getMessage());
        }
    }

    @Override
    @Transactional
    public CustomerSalesSaveResponseDto save(CustomerSalesSaveRequestDto request) {
        Long id = request.getId();
        if (request == null) {
            throw new IllegalArgumentException("Request data cannot be null.");
        }

        CustomerSalesEntity customerSales = (id == null)
                ? new CustomerSalesEntity()
                : customerSalesRepository.findById4Update(request.getId())
                .orElseGet(CustomerSalesEntity::new);

        if (customerSales.getUpdatedAt() != null && !customerSales.getUpdatedAt().isEqual(request.getUpdatedAt())) {
            throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
        }

        customerSales.setInquiryInfoId(request.getInquiryInfoId());
        customerSales.setFirstInquiryDate(request.getFirstInquiryDate());
        customerSales.setFirstInquiryHow(request.getFirstInquiryHow());
        customerSales.setContact(request.getContact());
        customerSales.setDecision(request.getDecision());
        customerSales.setUpdatedAt(LocalDateTime.now());
        customerSales = customerSalesRepository.save(customerSales);

        CustomerSalesSaveResponseDto customerSalesResult = new CustomerSalesSaveResponseDto();
        customerSalesResult.setId(customerSales.getId());

        return customerSalesResult;
    }

    @Override
    @Transactional
    public Long delete(Long id) {
        String sql = "UPDATE t_customer_sales SET deleted_at = NOW() WHERE id = :id";
        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("id", id);
        if (query.executeUpdate() > 0) {
            return id;
        } else {
            return null;
        }
    }
}
