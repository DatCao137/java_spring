package grouphome.webapp.repository.define.office;

import grouphome.webapp.entity.OfficeDocFileEntity;
import grouphome.webapp.repository.define.blc_common.BaseRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;
import org.springframework.data.jpa.repository.Modifying;
import java.time.LocalDateTime;

@Repository
public interface OfficeDocFileRepository extends BaseRepository<OfficeDocFileEntity, Long> {
    @Query("""
        SELECT o
        FROM OfficeDocFileEntity o
        WHERE o.id = :Id
        """)
    OfficeDocFileEntity getDocFileDetail(@NonNull @Param("Id") Integer Id);

    @Query("""
        SELECT 
            docfile		  
        FROM OfficeDocPathEntity  AS docpath
        INNER JOIN OfficeDocEntity AS doc 
            ON docpath.id  = doc.pathId
        INNER JOIN OfficeDocFileEntity AS docfile
            ON doc.id = docfile.docId
        WHERE docpath.id = :pathId
            AND docfile.docId = :docId
        """)
    List<OfficeDocFileEntity> getDocFileHistory( @NonNull @Param("pathId") Integer pathId, @NonNull @Param("docId") Integer docId);

    @Query("""
      SELECT CASE WHEN COUNT(o) > 0 THEN TRUE ELSE FALSE END
      FROM OfficeDocFileEntity o
      WHERE o.id = :Id
        AND o.deletedAt IS NULL
    """)
    boolean existsById(@NonNull @Param("Id") Integer Id);

    @Modifying
    @Query("UPDATE OfficeDocFileEntity o SET o.deletedAt = :deletedAt WHERE o.id = :id")
    int deleteFileInfo(@Param("id") Long id, 
                        @Param("deletedAt") LocalDateTime deletedAt);

    @Modifying
    @Query("UPDATE OfficeDocFileEntity o SET o.comment = :comment, o.updatedAt = :updatedAt WHERE o.id = :id")
    int updateFileInfo(@Param("id") Long id, 
                       @Param("comment") String comment, 
                       @Param("updatedAt") LocalDateTime updatedAt);

    
}
