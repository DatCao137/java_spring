package grouphome.webapp.repository.define.customer;

import grouphome.webapp.entity.CustomerInfoEntity;
import grouphome.webapp.repository.define.blc_common.BaseRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

@Repository
public interface TenantManageRepository extends BaseRepository<CustomerInfoEntity, Long>, JpaSpecificationExecutor<CustomerInfoEntity> {

    @Query(value = """
        SELECT *
        FROM d_customer_info c
        WHERE c.deleted_at IS NULL
            AND (:name IS NULL OR c.name LIKE %:name%)
            AND (:nameGana IS NULL OR c.name_gana LIKE %:nameGana%)
            AND (:sex IS NULL OR JSON_EXTRACT(c.personal, '$.sex') = :sex)
            AND (:nickname IS NULL OR JSON_EXTRACT(c.personal, '$.nickname') LIKE %:nickname%)
            AND (:age IS NULL
               OR (JSON_EXTRACT(c.personal, '$.birthDay') IS NOT NULL
                   AND JSON_EXTRACT(c.personal, '$.birthDay') <> ''
                   AND TIMESTAMPDIFF(YEAR, JSON_EXTRACT(c.personal, '$.birthDay'), CURRENT_DATE) = :age))
    """, nativeQuery = true)
    Page<CustomerInfoEntity> findAllActive(
            @Param("name") String name,
            @Param("nameGana") String nameGana,
            @Param("sex") String sex,
            @Param("nickname") String nickname,
            @Param("age") Integer age,
            Pageable pageable
    );

    @Override
    @EntityGraph(attributePaths = {"customerUnit"})
    @NonNull
    Page<CustomerInfoEntity> findAll(@NonNull Specification<CustomerInfoEntity> spec, @NonNull Pageable pageable);
}
