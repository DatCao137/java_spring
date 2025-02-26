package grouphome.webapp.repository.define.customer;

import grouphome.webapp.entity.CustomerBillingEntity;
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
public interface CustomerBillingRepository extends BaseRepository<CustomerBillingEntity, Long> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT c FROM CustomerBillingEntity c WHERE c.customerId = :customerId AND c.deletedAt IS NULL")
    Optional<CustomerBillingEntity> findByCustomerId(@NotNull @Param("customerId") Long customerId);
}