package grouphome.webapp.repository.define.customer;

import grouphome.webapp.entity.CustomerMonitoringEntity;
import grouphome.webapp.entity.CustomerMoveinDocumentStatusEntity;
import grouphome.webapp.repository.define.blc_common.BaseRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerMonitoringRepository extends BaseRepository<CustomerMonitoringEntity, Long> {
    List<CustomerMonitoringEntity> findAllByCustomerIdAndDeletedAtIsNullOrderByCreatedAtDesc(Long customerId);

    Optional<CustomerMonitoringEntity> findByCustomerIdAndYyyymmAndDeletedAtIsNull(Long customerId, String yyyymm);
}
