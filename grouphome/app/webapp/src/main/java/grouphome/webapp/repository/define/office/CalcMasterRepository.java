package grouphome.webapp.repository.define.office;

import grouphome.webapp.entity.OfficeBranchEntity;
import grouphome.webapp.entity.OfficeCalcItemsEntity;
import grouphome.webapp.repository.define.blc_common.BaseRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CalcMasterRepository extends BaseRepository<OfficeCalcItemsEntity, Long> {
    @Query("""
        SELECT base FROM OfficeCalcItemsEntity base
        WHERE base.id IN (
            SELECT MAX(id) FROM OfficeCalcItemsEntity sub
            WHERE sub.deletedAt IS NULL
             AND (sub.groupHomeTypeId IS NULL OR sub.groupHomeTypeId = 
                (SELECT CAST(JSON_EXTRACT(contents, '$.basic.groupHomeTypeId') AS LONG)
                    FROM OfficeBranchEntity b
                    WHERE b.id = :branchId))
            GROUP BY sub.name)
        """)
    List<OfficeCalcItemsEntity> findByBranchId(@NonNull @Param("branchId") Long branchId);
}
