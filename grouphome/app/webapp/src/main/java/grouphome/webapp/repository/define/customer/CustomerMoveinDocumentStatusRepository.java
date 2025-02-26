package grouphome.webapp.repository.define.customer;

import grouphome.webapp.entity.CustomerMoveinDocumentStatusEntity;
import grouphome.webapp.repository.define.blc_common.BaseRepository;
import jakarta.persistence.LockModeType;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface CustomerMoveinDocumentStatusRepository extends BaseRepository<CustomerMoveinDocumentStatusEntity, Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT c FROM CustomerMoveinDocumentStatusEntity c WHERE c.customerId = :customerId AND c.deletedAt IS NULL")
    Optional<CustomerMoveinDocumentStatusEntity> findByCustomerId(@NotNull @Param("customerId") Long customerId);

    Optional<CustomerMoveinDocumentStatusEntity> findByCustomerIdAndDeletedAtIsNull(@NotNull @Param("customerId") Long customerId);

    boolean existsByIdAndUpdatedAtAndDeletedAtIsNull(Long id, LocalDateTime updatedAt);
}
