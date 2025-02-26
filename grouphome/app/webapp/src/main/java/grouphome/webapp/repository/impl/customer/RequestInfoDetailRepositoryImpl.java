package grouphome.webapp.repository.impl.customer;

import grouphome.webapp.dto.responses.customer.request.DetailResponseDto;
import grouphome.webapp.repository.define.customer.RequestInfoDetailRepositoryCustom;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;

@Repository
public class RequestInfoDetailRepositoryImpl implements RequestInfoDetailRepositoryCustom {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public DetailResponseDto getCustomerRequestItem(Long id) {
        String sql = """
                SELECT tcr.id as id
                        , tcr.request_type as requestType
                        , tcri.request_info_id as requestInfoId
                        , tcri.contents as contents
                        , tcr.updated_at as infoUpdatedAt
                        , tcri.updated_at as detailUpdatedAt
                FROM t_customer_request_item AS tcri
                LEFT JOIN t_customer_request AS tcr ON tcr.id = tcri.request_info_id
                WHERE tcri.id = :id
                  AND tcr.deleted_at IS NULL
                  AND tcri.deleted_at IS NULL
                """;

        Query query = entityManager.createNativeQuery(sql, "RequestDetailResponseDtoMapping");
        query.setParameter("id", id);
        DetailResponseDto result = (DetailResponseDto) query.getSingleResult();

        return result;
    }
}
