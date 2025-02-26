package grouphome.webapp.repository.define.office;

import grouphome.webapp.entity.OfficeStructureEntity;
import grouphome.webapp.repository.define.blc_common.BaseRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StructureRepository extends BaseRepository<OfficeStructureEntity, Long> {
  @Query("""
      SELECT COUNT(p) > 0
      FROM OfficeStructureEntity p
      WHERE p.branchId = :branchId
        AND p.deletedAt IS NULL
      """)
  boolean existsByBranchInfoId(@Param("branchId") Long branchId);
}