package grouphome.webapp.repository.define.customer;

import grouphome.webapp.entity.CustomerRequestEntity;
import grouphome.webapp.repository.define.blc_common.BaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestInfoRepository extends BaseRepository<CustomerRequestEntity, Long> {
}
