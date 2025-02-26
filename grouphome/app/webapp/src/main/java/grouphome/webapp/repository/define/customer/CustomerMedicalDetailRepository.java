package grouphome.webapp.repository.define.customer;

import grouphome.webapp.entity.CustomerMedicalDetailEntity;
import grouphome.webapp.repository.define.blc_common.BaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerMedicalDetailRepository extends BaseRepository<CustomerMedicalDetailEntity, Long> {
    Integer countByMedicalId(Long medicalId);
}
