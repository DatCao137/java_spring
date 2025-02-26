package grouphome.webapp.repository.define.blc_common;

import grouphome.webapp.entity.BlcAddrEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends BaseRepository<BlcAddrEntity, Long> {
  @Query("""
      SELECT CASE WHEN COUNT(a) > 0 THEN TRUE ELSE FALSE END
      FROM BlcAddrEntity a
      WHERE a.id = :addressId
        AND a.deletedAt IS NULL
      """)
  boolean existsById(@NonNull @Param("addressId") Long addressId);
}
