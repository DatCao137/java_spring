package grouphome.webapp.repository.define.office;

import grouphome.webapp.entity.OfficeUnitEntity;
import grouphome.webapp.repository.define.blc_common.BaseRepository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

@Repository
public interface UnitRepository extends BaseRepository<OfficeUnitEntity, Long>, UnitRepositoryCustom {
  @Query("""
      SELECT CASE WHEN COUNT(r) > 0 THEN TRUE ELSE FALSE END
      FROM OfficeUnitEntity r
      RIGHT JOIN OfficeHomeEntity h ON h.id = r.homeId
      RIGHT JOIN OfficeBranchEntity o ON o.id = h.branchId
      WHERE r.homeId = :homeId
        AND o.id = :branchId
        AND o.deletedAt IS NULL
        AND r.deletedAt IS NULL
        AND r.id IS NOT NULL
      """)
  boolean existsByBranchId(@NonNull @Param("branchId") Long branchId, @NonNull @Param("homeId") Long homeId);

  @Query("""
    SELECT r
    FROM OfficeUnitEntity r
    WHERE r.homeId = :homeId
      AND r.deletedAt IS NULL
    """)
  List<OfficeUnitEntity> findByHomeId(@NonNull @Param("homeId") Long homeId);

}
