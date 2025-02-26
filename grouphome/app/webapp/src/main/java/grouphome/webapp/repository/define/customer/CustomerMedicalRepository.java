package grouphome.webapp.repository.define.customer;

import grouphome.webapp.entity.CustomerMedicalEntity;
import grouphome.webapp.repository.define.blc_common.BaseRepository;
import jakarta.persistence.LockModeType;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerMedicalRepository extends BaseRepository<CustomerMedicalEntity, Long> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @EntityGraph(attributePaths = {"details"})
    @Query("SELECT c FROM CustomerMedicalEntity c WHERE c.customerId = :customerId AND c.deletedAt IS NULL")
    Optional<CustomerMedicalEntity> findByCustomerId(@NotNull @Param("customerId") Long customerId);
}
