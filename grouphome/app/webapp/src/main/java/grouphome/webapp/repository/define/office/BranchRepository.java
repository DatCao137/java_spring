package grouphome.webapp.repository.define.office;

import grouphome.webapp.entity.OfficeBranchEntity;
import grouphome.webapp.repository.define.blc_common.BaseRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

@Repository
public interface BranchRepository extends BaseRepository<OfficeBranchEntity, Long>, BranchRepositoryCustom {
    @Query("""
            SELECT CASE WHEN COUNT(o) > 0 THEN TRUE ELSE FALSE END
            FROM OfficeBranchEntity o
            WHERE o.id = :branchID
              AND o.deletedAt IS NULL
             """)
    boolean existsById(@NonNull @Param("branchID") Long branchID);

    @Query("""
            SELECT CASE WHEN COUNT(o) > 0 THEN TRUE ELSE FALSE END
            FROM OfficeBranchEntity o
            WHERE o.no = :no 
              AND (:id IS NULL OR o.id <> :id)
              AND o.deletedAt IS NULL
            """)
    boolean existsByNo(@NonNull @Param("no") Long no, @NonNull @Param("id") Long id);
}
