package grouphome.webapp.repository.define.customer;

import grouphome.webapp.entity.CustomerInquiryEntity;
import grouphome.webapp.repository.define.blc_common.BaseRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;
import grouphome.webapp.repository.define.customer.InquiryRepositoryCustom;
import org.springframework.data.jpa.repository.Modifying;
import java.time.LocalDateTime;

@Repository
public interface InquiryRepository extends BaseRepository<CustomerInquiryEntity, Long>, InquiryRepositoryCustom {
    
    @Modifying
    @Query("UPDATE CustomerInquiryEntity o SET o.age = :age, o.updatedAt = :updatedAt WHERE o.id = :id")
    int updateInquiryAge(@Param("id") Long id, 
                       @Param("age") Long age, 
                       @Param("updatedAt") LocalDateTime updatedAt);
}


