package grouphome.webapp.repository.define.customer;

import grouphome.webapp.entity.CustomerCareDetailEntity;
import grouphome.webapp.repository.define.blc_common.BaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerCareDetailRepository extends BaseRepository<CustomerCareDetailEntity, Long> {
    Integer countByCareId(Long careId);
}
