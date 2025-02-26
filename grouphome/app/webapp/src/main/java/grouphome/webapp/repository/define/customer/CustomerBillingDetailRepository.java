package grouphome.webapp.repository.define.customer;

import grouphome.webapp.entity.CustomerBillingDetailEntity;
import grouphome.webapp.repository.define.blc_common.BaseRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import org.springframework.lang.NonNull;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.Lock;

@Repository
public interface CustomerBillingDetailRepository extends BaseRepository<CustomerBillingDetailEntity, Long> {
     @Lock(LockModeType.PESSIMISTIC_WRITE)
     @Query("SELECT c FROM CustomerBillingDetailEntity c WHERE c.billingId = :billingId AND c.deletedAt IS NULL ORDER BY c.yyyymm DESC")
     List<CustomerBillingDetailEntity> findByBillingId(@NonNull @Param("billingId") Long billingId);

     @Query("""
            SELECT CASE WHEN COUNT(o) > 0 THEN TRUE ELSE FALSE END
            FROM CustomerBillingDetailEntity o
            WHERE o.billingId = :billingId 
              AND o.yyyymm = :yyyymm 
              AND (:id IS NULL OR o.id <> :id)
              AND o.deletedAt IS NULL
            """)
    boolean existsByBillingIdAndYymm(@NonNull @Param("billingId") Long billingId, @NonNull @Param("yyyymm") String yyyymm, @NonNull @Param("id") Long id);
}
