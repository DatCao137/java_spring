package grouphome.webapp.repository.define.office;

import grouphome.webapp.entity.OfficeCalcInfoEntity;
import grouphome.webapp.repository.define.blc_common.BaseRepository;
import grouphome.webapp.repository.define.office.CalcInfoRepositoryCustom;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CalcInfoRepository extends BaseRepository<OfficeCalcInfoEntity, Long>, CalcInfoRepositoryCustom {
    @Query("""
        SELECT base FROM OfficeCalcInfoEntity base
        WHERE base.branchId = :branchId
         AND  base.deletedAt IS NULL
        """)
    List<OfficeCalcInfoEntity> findByBranchId(@NonNull @Param("branchId") Long branchId);
}
