package grouphome.webapp.repository.define.office;

import grouphome.webapp.entity.OfficeDocEntity;
import grouphome.webapp.repository.define.blc_common.BaseRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;

@Repository
public interface OfficeDocRepository extends BaseRepository<OfficeDocEntity, Long> {
    
}
