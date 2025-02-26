package grouphome.webapp.repository.define.customer;

import grouphome.webapp.entity.CustomerSalesFollowEntity;
import grouphome.webapp.repository.define.blc_common.BaseRepository;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerSalesFollowRepository extends BaseRepository<CustomerSalesFollowEntity, Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("""
            SELECT CASE WHEN COUNT(o) > 0 THEN TRUE ELSE FALSE END
            FROM CustomerSalesFollowEntity o
            WHERE o.salesInfoId = :salesInfoId
              AND o.step = :step
              AND (:id IS NULL OR o.id <> :id)
              AND o.deletedAt IS NULL
             """)
    boolean existsBySalesInfoIdAndStep(@NonNull @Param("salesInfoId") Long salesInfoId, @NonNull @Param("step") Integer step, @NonNull @Param("id") Long id);
}


