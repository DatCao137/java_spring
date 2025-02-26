package grouphome.webapp.repository.define.office;

import grouphome.webapp.entity.OfficeHomeEntity;
import grouphome.webapp.repository.define.blc_common.BaseRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

@Repository
public interface HomeRepository extends BaseRepository<OfficeHomeEntity, Long>, HomeRepositoryCustom {
  @Query("""
      SELECT CASE WHEN COUNT(h) > 0 THEN TRUE ELSE FALSE END
      FROM OfficeHomeEntity h
      WHERE h.id = :homeId
        AND h.deletedAt IS NULL
      """)
  boolean existsById(@NonNull @Param("homeId") Long homeId);

}
