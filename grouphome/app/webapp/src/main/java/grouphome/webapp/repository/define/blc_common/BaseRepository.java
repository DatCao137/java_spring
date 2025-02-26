package grouphome.webapp.repository.define.blc_common;

import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.lang.NonNull;

import jakarta.persistence.LockModeType;

import java.util.List;
import java.util.Optional;

@NoRepositoryBean
public interface BaseRepository<T, ID> extends JpaRepository<T, ID> {
  @Override
  @NonNull
  @Query("SELECT t FROM #{#entityName} t WHERE t.id = :id AND t.deletedAt IS NULL")
  Optional<T> findById(@NonNull @Param("id") ID id);

  @Lock(LockModeType.PESSIMISTIC_WRITE)
  @NonNull
  @Query("SELECT t FROM #{#entityName} t WHERE t.id = :id AND t.deletedAt IS NULL")
  Optional<T> findById4Update(@NonNull @Param("id") ID id);

  @Override
  @NonNull
  @Query("SELECT t FROM #{#entityName} t WHERE t.deletedAt IS NULL")
  List<T> findAll();
  
  @Query("""
      SELECT CASE WHEN COUNT(t) > 0 THEN TRUE ELSE FALSE END
      FROM #{#entityName} t
      WHERE t.id = :id
        AND t.deletedAt IS NULL
      """)
  boolean existsById(@NonNull @Param("id") ID id);

}
