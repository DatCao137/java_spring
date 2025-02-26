package grouphome.webapp.repository.define.customer;

import grouphome.webapp.entity.CustomerInquiryItemEntity;
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
public interface InquiryItemRepository extends BaseRepository<CustomerInquiryItemEntity, Long> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT c FROM CustomerInquiryItemEntity c WHERE c.inquiryInfoId = :inquiryInfoId AND c.deletedAt IS NULL")
    Optional<CustomerInquiryItemEntity> findByInquiryInfoId(@NotNull @Param("inquiryInfoId") Long inquiryInfoId);
}
