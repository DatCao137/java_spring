package grouphome.webapp.repository.define.customer;

import grouphome.webapp.entity.CustomerHandbookStatusEntity;
import grouphome.webapp.repository.define.blc_common.BaseRepository;
import jakarta.persistence.LockModeType;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerHandbookStatusRepository extends BaseRepository<CustomerHandbookStatusEntity, Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT c FROM CustomerHandbookStatusEntity c WHERE c.customerId = :customerId AND c.deletedAt IS NULL")
    Optional<CustomerHandbookStatusEntity> findByCustomerId(@NotNull @Param("customerId") Long customerId);
}
