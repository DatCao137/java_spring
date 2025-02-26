package grouphome.webapp.repository.define.customer;

import grouphome.webapp.entity.CustomerHearingDetailEntity;
import grouphome.webapp.repository.define.blc_common.BaseRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import org.springframework.lang.NonNull;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.Lock;

@Repository
public interface CustomerHearingDetailRepository extends BaseRepository<CustomerHearingDetailEntity, Long> {
     @Lock(LockModeType.PESSIMISTIC_WRITE)
     @Query("SELECT c FROM CustomerHearingDetailEntity c WHERE c.hearingInfoId = :hearingInfoId AND c.deletedAt IS NULL ORDER BY c.step DESC")
     List<CustomerHearingDetailEntity> findByHearingInfoId(@NonNull @Param("hearingInfoId") Long hearingInfoId);

     @Query("""
            SELECT CASE WHEN COUNT(o) > 0 THEN TRUE ELSE FALSE END
            FROM CustomerHearingDetailEntity o
            WHERE o.hearingInfoId = :hearingInfoId 
              AND o.step = :step 
              AND (:id IS NULL OR o.id <> :id)
              AND o.deletedAt IS NULL
            """)
    boolean existsByHearingIdAndStep(@NonNull @Param("hearingInfoId") Long hearingInfoId, @NonNull @Param("step") Integer step, @NonNull @Param("id") Long id);
}
