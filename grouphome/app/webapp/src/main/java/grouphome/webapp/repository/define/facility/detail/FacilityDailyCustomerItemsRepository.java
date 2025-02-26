package grouphome.webapp.repository.define.facility.detail;

import grouphome.webapp.entity.FacilityDailyCustomerItemsEntity;
import grouphome.webapp.repository.define.blc_common.BaseRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface FacilityDailyCustomerItemsRepository extends BaseRepository<FacilityDailyCustomerItemsEntity, Long> {
    Optional<FacilityDailyCustomerItemsEntity> findByCustomerIdAndYyyymmddAndName(Long customerId, String yyyymmdd, String name);

    @Query("""
        SELECT MAX(c.updatedAt) FROM FacilityDailyCustomerItemsEntity c WHERE c.customerId=:customerId AND c.yyyymmdd=:yyyymmdd AND c.deletedAt IS NULL
    """)
    LocalDateTime getMaxUpdatedAtByCustomerIdAndYyyymmdd(@Param("customerId") Long customerId, @Param("yyyymmdd") String yyyymmdd);
}
