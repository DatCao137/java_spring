package grouphome.webapp.repository.impl.office;

import grouphome.webapp.dto.requests.office.GeneralRequestDto;
import grouphome.webapp.repository.define.office.StructureRepositoryCustom;
import jakarta.persistence.*;
import org.springframework.stereotype.Repository;

@Repository
public class StructureRepositoryImpl implements StructureRepositoryCustom {
    @PersistenceContext
    private EntityManager entityManager;

    /**
     * Get office personnel struct info
     * 
     * @param request GeneralRequestDto
     * @return Object
     */
    @Override
    public Object getPerson(GeneralRequestDto request) {
        String sql = """
                SELECT  info.id AS id
                    ,   info.manager_name AS managerName
                    ,	GROUP_CONCAT(DISTINCT CONCAT(staff1.name_sei, ' ', staff1.name_mei)) AS service1Name
                    ,   CASE WHEN info.service1->>'$.training.type' != 'null'
                             THEN info.service1->>'$.training.type'
                             ELSE NULL
                        END AS training1Type
                    ,   CASE WHEN info.service1->>'$.training.implementation' != 'null'
                             THEN info.service1->>'$.training.implementation'
                             ELSE NULL
                        END AS training1Impl
                    ,   CASE WHEN info.service1->>'$.training.limit' != 'null'
                             THEN DATE_FORMAT(info.service1->>'$.training.limit', '%Y-%m')
                             ELSE NULL
                        END AS training1Limit
                    ,	GROUP_CONCAT(DISTINCT CONCAT(staff2.name_sei, ' ', staff2.name_mei)) AS service2Name
                    ,   CASE WHEN info.service2->>'$.training.type' != 'null'
                             THEN info.service2->>'$.training.type'
                             ELSE NULL
                        END AS training2Type
                    ,   CASE WHEN info.service2->>'$.training.implementation' != 'null'
                             THEN info.service2->'$.training.implementation'
                             ELSE NULL
                        END AS training2Impl
                    ,   CASE WHEN info.service2->>'$.training.limit' != 'null'
                             THEN DATE_FORMAT(info.service2->'$.training.limit', '%Y-%m')
                             ELSE NULL
                        END AS training2Limit
                    ,   GROUP_CONCAT(DISTINCT CONCAT(supporter.name_sei, ' ', supporter.name_mei)) AS supporter
                    ,   GROUP_CONCAT(DISTINCT CONCAT(welfare.name_sei, ' ', welfare.name_mei)) AS welfare
                    ,   GROUP_CONCAT(DISTINCT CONCAT(nurse.name_sei, ' ', nurse.name_mei)) AS nurse
                    ,	JSON_LENGTH(info.nurse->'$.name') AS nurseAmount
                    ,   CAST(info.visiting_contract->'$.capacity' AS UNSIGNED) AS visiting
                FROM d_office_structure AS info
                LEFT JOIN d_office_staff staff1 on staff1.id = CAST(info.service1->'$.name' AS UNSIGNED)
                LEFT JOIN d_office_staff staff2 on staff2.id = CAST(info.service2->'$.name' AS UNSIGNED)
                LEFT JOIN d_office_staff supporter on JSON_CONTAINS(info.life_supporter, CAST(supporter.id AS CHAR), '$.name')
                LEFT JOIN d_office_staff welfare on JSON_CONTAINS(info.welfare_worker, CAST(welfare.id AS CHAR), '$.name')
                LEFT JOIN d_office_staff nurse on JSON_CONTAINS(info.nurse, CAST(nurse.id AS CHAR), '$.name')
                WHERE info.branch_id = :branchId AND info.deleted_at IS NULL
                GROUP BY info.id
                """;

        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("branchId", request.getBranchId());

        return query.getSingleResult();
    }
}
