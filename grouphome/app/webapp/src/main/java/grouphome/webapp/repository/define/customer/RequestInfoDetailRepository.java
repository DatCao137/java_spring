package grouphome.webapp.repository.define.customer;

import grouphome.webapp.entity.CustomerRequestItemEntity;
import grouphome.webapp.repository.define.blc_common.BaseRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestInfoDetailRepository extends BaseRepository<CustomerRequestItemEntity, Long>, RequestInfoDetailRepositoryCustom {
    @Query("""
            SELECT CASE WHEN COUNT(o) > 0 THEN TRUE ELSE FALSE END
            FROM CustomerRequestItemEntity o
            WHERE o.id = :id
              AND o.deletedAt IS NULL
             """)
    boolean existsById(@NonNull @Param("id") Long id);
}
