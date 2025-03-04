package grouphome.webapp.repository.define.employee;

import grouphome.webapp.entity.OfficeHomeEntity;
import grouphome.webapp.repository.define.blc_common.BaseRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import grouphome.webapp.entity.EmployeeEntity;
@Repository
public interface EmployeeRepository extends BaseRepository<EmployeeEntity, Long>, EmployeeRepositoryCustom {
  @Query("""
      SELECT CASE WHEN COUNT(e) > 0 THEN TRUE ELSE FALSE END
      FROM EmployeeEntity e
      WHERE e.id = :employeeId
        AND e.deletedAt IS NULL
      """)
  boolean existsById(@NonNull @Param("employeeId") Long employeeId);

}
