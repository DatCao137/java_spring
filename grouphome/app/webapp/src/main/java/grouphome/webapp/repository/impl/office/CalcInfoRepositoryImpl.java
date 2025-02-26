package grouphome.webapp.repository.impl.office;

import grouphome.webapp.dto.requests.office.GeneralRequestDto;
import grouphome.webapp.dto.responses.office.branch.CalcListResponseDto;
import grouphome.webapp.entity.OfficeCalcInfoEntity;
import grouphome.webapp.repository.define.office.CalcInfoRepositoryCustom;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Repository
public class CalcInfoRepositoryImpl implements CalcInfoRepositoryCustom {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<CalcListResponseDto> getList(GeneralRequestDto request) {
        final String baseSql = """
                SELECT  base.id AS id,
                        base.branch_id AS branchId,
                        oci.name AS name,
                        CASE WHEN oci.type = 'add' THEN '加算'
                         ELSE CASE WHEN oci.type = 'del' THEN '減算' ELSE '' END
                        END AS classification,
                        base.start_date AS startDate,
                        base.notification_date AS notificationDate,
                        base.valid_start_date AS validStartDate,
                        base.valid_end_date AS validEndDate,
                        base.remark AS remark
                FROM t_office_calc_info base
                JOIN m_office_calc_items oci ON oci.id = base.calc_items_id
                %s
                """;
        Long branchId = request.getBranchId();
        if(branchId == null) {
            return new ArrayList<CalcListResponseDto>();
        }
        Map<String, Object> params = new HashMap<String, Object>();
        StringBuilder where = new StringBuilder("WHERE base.deleted_at IS NULL");
        where.append(" AND base.branch_id = :branchId");
        params.put("branchId", branchId);

        String sql = String.format(baseSql, where);
        Query query = entityManager.createNativeQuery(sql, "OfficeCalcListResponseDtoMapping");
        params.forEach(query::setParameter);
        return query.getResultList();
    }
}
