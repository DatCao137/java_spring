package grouphome.webapp.repository.impl.customer;

import grouphome.webapp.dto.requests.customer.inquiry.SalesFollowListRequestDto;
import grouphome.webapp.dto.requests.customer.inquiry.SalesFollowSaveRequestDto;
import grouphome.webapp.dto.responses.customer.inquiry.CustomerSalesInfoResponseDto;
import grouphome.webapp.dto.responses.customer.inquiry.SalesFollowListResponseDto;
import grouphome.webapp.dto.responses.customer.inquiry.SalesFollowSaveResponseDto;
import grouphome.webapp.entity.CustomerSalesFollowEntity;
import grouphome.webapp.exception.ApiException;
import grouphome.webapp.repository.define.customer.CustomerSalesFollowRepository;
import grouphome.webapp.repository.define.customer.CustomerSalesFollowRepositoryCustom;
import grouphome.webapp.utils.ResponseCodeAndMsg;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.PessimisticLockException;
import jakarta.persistence.Query;
import org.hibernate.exception.LockAcquisitionException;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionSystemException;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public class CustomerSalesFollowRepositoryCustomImpl implements CustomerSalesFollowRepositoryCustom {
    @PersistenceContext
    private EntityManager entityManager;
    private final CustomerSalesFollowRepository customerSalesFollowRepository;

    public CustomerSalesFollowRepositoryCustomImpl(CustomerSalesFollowRepository customerSalesFollowRepository) {
        this.customerSalesFollowRepository = customerSalesFollowRepository;
    }

    public List<SalesFollowListResponseDto> getSalesFollowList(SalesFollowListRequestDto req) {
        String sql = """
                SELECT
                    tcsf.id AS id,
                    tcsf.sales_info_id AS salesInfoId,
                    tcsf.staff_id AS staffId,
                    tcsf.step AS step,
                    IFNULL(mbi.name, CONCAT(step, "回目フォロー")) AS stepName,
                    tcsf.staff_name AS staffName,
                    tcsf.follow_date AS followDate,
                    tcsf.contents AS contents,
                    tcsf.updated_at AS updatedAt
                FROM t_customer_sales_follow tcsf 
                LEFT JOIN m_blc_item mbi ON tcsf.step = mbi.type_id
                    AND mbi.item_type_id = 54
                WHERE tcsf.deleted_at IS NULL 
                    AND tcsf.sales_info_id = :inquiryId 
                ORDER BY tcsf.step DESC
            """;

        Query query = entityManager.createNativeQuery(sql, "CustomerSalesFollowListResponseDtoMapping");
        query.setParameter("inquiryId", req.getInquiryId());
        List<SalesFollowListResponseDto> results = query.getResultList();
        return results;
    }

    @Override
    @Transactional
    public SalesFollowSaveResponseDto save(SalesFollowSaveRequestDto request) {
        Long id = request.getId();
        Long salesInfoId = request.getSalesInfoId();
        Integer step = request.getStep();

        if (request == null) {
            throw new IllegalArgumentException("Request data cannot be null.");
        }

        CustomerSalesFollowEntity customerSalesFollow = (id == null)
                ? new CustomerSalesFollowEntity()
                : customerSalesFollowRepository.findById4Update(request.getId())
                .orElseGet(CustomerSalesFollowEntity::new);

        if (customerSalesFollowRepository.existsBySalesInfoIdAndStep(salesInfoId, step, id)) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, step + "回目フォローはすでに登録済みです");
        }

        if (customerSalesFollow.getUpdatedAt() != null && !customerSalesFollow.getUpdatedAt().isEqual(request.getUpdatedAt())) {
            throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
        }

        customerSalesFollow.setSalesInfoId(request.getSalesInfoId());
        customerSalesFollow.setStep(request.getStep());
        customerSalesFollow.setFollowDate(request.getFollowDate());
        customerSalesFollow.setStaffId(request.getStaffId());
        customerSalesFollow.setStaffName(request.getStaffName());
        customerSalesFollow.setContents(request.getContents());
        customerSalesFollow.setUpdatedAt(LocalDateTime.now());


        try {
            customerSalesFollow = customerSalesFollowRepository.save(customerSalesFollow);

            SalesFollowSaveResponseDto customerSalesFollowResult = new SalesFollowSaveResponseDto();
            customerSalesFollowResult.setId(customerSalesFollow.getId());

            return customerSalesFollowResult;

        } catch (PessimisticLockException | LockAcquisitionException | TransactionSystemException e) {
            throw e;
        } catch (Exception e) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, e.getMessage());
        }
    }

    @Override
    @Transactional
    public Long delete(Long id) {
        String sql = "UPDATE t_customer_sales_follow SET deleted_at = NOW() WHERE id = :id";
        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("id", id);
        if (query.executeUpdate() > 0) {
            return id;
        } else {
            return null;
        }
    }
}
