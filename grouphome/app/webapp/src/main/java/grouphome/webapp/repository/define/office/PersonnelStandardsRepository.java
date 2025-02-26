package grouphome.webapp.repository.define.office;

import grouphome.webapp.entity.OfficePersonnelStandardsEntity;
import grouphome.webapp.repository.define.blc_common.BaseRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;
import jakarta.persistence.LockModeType;
import java.util.Optional;

@Repository
public interface PersonnelStandardsRepository extends BaseRepository<OfficePersonnelStandardsEntity, Long> {
  @Query("""
      SELECT CASE WHEN COUNT(h) > 0 THEN TRUE ELSE FALSE END
      FROM OfficePersonnelStandardsEntity h
      WHERE h.id = :id
        AND h.deletedAt IS NULL
      """)
  boolean existsById(@NonNull @Param("id") Long id);

  @Lock(LockModeType.PESSIMISTIC_WRITE)
  @Query("SELECT t FROM OfficePersonnelStandardsEntity t WHERE t.yyyymm = :yyyymm AND t.unitId = :unitId AND t.deletedAt IS NULL")
  Optional<OfficePersonnelStandardsEntity> findByUnique4Update(@NonNull @Param("yyyymm") String yyyymm, @NonNull @Param("unitId") Long unitId);

}