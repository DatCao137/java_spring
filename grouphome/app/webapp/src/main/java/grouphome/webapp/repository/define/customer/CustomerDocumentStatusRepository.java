package grouphome.webapp.repository.define.customer;

import grouphome.webapp.entity.CustomerDocumentStatusEntity;
import grouphome.webapp.repository.define.blc_common.BaseRepository;
import jakarta.persistence.LockModeType;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerDocumentStatusRepository extends BaseRepository<CustomerDocumentStatusEntity, Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT c FROM CustomerDocumentStatusEntity c WHERE c.customerId = :customerId AND c.deletedAt IS NULL")
    Optional<CustomerDocumentStatusEntity> findByCustomerId(@NotNull @Param("customerId") Long customerId);
}
