package grouphome.webapp.repository.impl.office;

import grouphome.webapp.dto.requests.office.FacilityDailyListRequestDto;
import grouphome.webapp.dto.requests.office.GeneralRequestDto;
import grouphome.webapp.dto.responses.office.branch.FacilityDailyListResponseDto;
import grouphome.webapp.repository.define.office.BranchRepositoryCustom;
import grouphome.webapp.repository.impl.blc_common.PagerRepositoryImpl;
import grouphome.webapp.utils.JsonUtils;
import grouphome.webapp.utils.SQLUtils;
import jakarta.persistence.*;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Repository
public class BranchRepositoryImpl extends PagerRepositoryImpl implements BranchRepositoryCustom {
    @PersistenceContext
    private EntityManager entityManager;

    /**
     * Get office list
     *
     * @param request BranchRequestDto
     * @return List
     */
    @Override
    public Map<String, Object> getBranchList(GeneralRequestDto request) {
        final String prefNameSQL = """
                (SELECT name FROM m_blc_item
                 WHERE item_type_id = (SELECT id FROM m_blc_item_type WHERE name = 'prefectures')
                  and type_id = addr.pref_id)
                """;
        final String baseSql = """
                SELECT  branch.id AS id
                    ,   branch.no AS no
                    ,   branch.name AS branchName
                    ,   home.id AS homeId
                    ,   home.name AS homeName
                    ,   addr.post_no AS postNo
                    ,   addr.pref_id AS prefId
                    ,   %s AS prefName
                    ,	addr.city AS city
                    ,	addr.town AS town
                    ,   branch.addr_id AS addrId
                    ,   branch.contents AS contents
                    ,   SUM(CAST(JSON_EXTRACT(unit.contents, '$.basic.capacity') AS UNSIGNED)) AS capacity
                    ,   CONCAT('{"system":', MAX(JSON_EXTRACT(unit.contents, '$.features.system'))
                              ,',"barrierFree":', MAX(JSON_EXTRACT(unit.contents, '$.features.barrierFree'))
                              ,',"menOnly":', MAX(JSON_EXTRACT(unit.contents, '$.features.menOnly'))
                              ,',"womenOnly":', MAX(JSON_EXTRACT(unit.contents, '$.features.womenOnly'))
                              ,'}') AS features
                    ,   CONCAT('{"GH":', MAX(JSON_EXTRACT(unit.contents, '$.services.GH'))
                             , ',"SS":', MAX(JSON_EXTRACT(unit.contents, '$.services.SS'))
                             ,  '}') AS services
                    ,   CAST(JSON_EXTRACT(branch.contents, '$.basic.groupHomeTypeId') AS UNSIGNED) AS groupHomeTypeId
                    ,   (SELECT name FROM m_blc_item
                         WHERE item_type_id = (SELECT id FROM m_blc_item_type WHERE name = 'group_home_type')
                          and type_id = CAST(JSON_EXTRACT(branch.contents, '$.basic.groupHomeTypeId') AS UNSIGNED)) AS groupHomeTypeName
                FROM d_office_branch AS branch
                LEFT JOIN d_office_home AS home ON home.branch_id = branch.id AND home.deleted_at IS NULL
                LEFT JOIN d_office_unit AS unit ON unit.home_id = home.id AND unit.deleted_at IS NULL
                LEFT JOIN d_blc_addr AS addr ON addr.id = home.addr_id AND addr.deleted_at IS NULL
                %s
                GROUP BY home.id, branch.id
                """.formatted(prefNameSQL, "%s");

        // Where
        Map<String, Object> params = new HashMap<String, Object>();
        StringBuilder where = new StringBuilder("WHERE branch.deleted_at IS NULL");
        StringBuilder outerWhere = new StringBuilder();
        Map<String, String> filter = request.getFilter();
        String val;

        /* branchName */
        val = filter.get("branchName");
        if (StringUtils.isNotBlank(val)) {
            SQLUtils.filterString(where, "branch.name LIKE :branchName");
            params.put("branchName", "%" + val.trim() + "%");
        }

        /* homeName */
        val = filter.get("homeName");
        if (StringUtils.isNotBlank(val)) {
            SQLUtils.filterString(where, "home.name LIKE :homeName");
            params.put("homeName", "%" + val.trim() + "%");
        }

        /* capacity */
        val = filter.get("capacity");
        if (StringUtils.isNotBlank(val)) {
            SQLUtils.filterRange(outerWhere, params, val, "capacity");
        }

        /* groupHomeTypeName */
        val = filter.get("groupType");
        if (StringUtils.isNotBlank(val)) {
            Set<String> ids = new HashSet<>();
            String[] vals = val.split(",");
            for (int i = 0; i < vals.length; i++) {
                ids.add(vals[i]);
            }
            where.append(" AND JSON_EXTRACT(branch.contents, '$.basic.groupHomeTypeId') IN (:groupType)");
            params.put("groupType", ids);
        }

        /* features(featureSystem, featureBarrierFree, featureMenOnly, featureWomenOnly) */
        val = filter.get("features");
        if (StringUtils.isNotBlank(val)) {
            Map<String, String> ret = JsonUtils.tryParse(val);
            if (ret != null) {
                SQLUtils.filterChoice(outerWhere, ret.get("featureSystem"), "features", "system");
                SQLUtils.filterChoice(outerWhere, ret.get("featureBarrierFree"), "features", "barrierFree");
                SQLUtils.filterChoice(outerWhere, ret.get("featureMenOnly"), "features", "menOnly");
                SQLUtils.filterChoice(outerWhere, ret.get("featureWomenOnly"), "features", "womenOnly");
            }
        }

        /* address */
        val = filter.get("address");
        if (StringUtils.isNotBlank(val)) {
            SQLUtils.filterString(outerWhere, "CONCAT(prefName, city, town) like :address");
            params.put("address", "%" + val.trim() + "%");
        }

        /* services(serviceGH,serviceSS) */
        val = filter.get("services");
        if (StringUtils.isNotBlank(val)) {
            Map<String, String> ret = JsonUtils.tryParse(val);
            if (ret != null) {
                SQLUtils.filterChoice(outerWhere, ret.get("servicegh"), "services", "GH");
                SQLUtils.filterChoice(outerWhere, ret.get("servicess"), "services", "SS");
            }
        }

        // Paging
        Map<String, Integer> page = new HashMap<String, Integer>();
        page.put("pageNumber", request.getPageNumber());
        page.put("pageSize", request.getPageSize());

        // Sorting
        Map<String, String> sort = new HashMap<String, String>();
        sort.put(request.getSortBy(), request.getSortDirection());

        String sql = String.format(baseSql, where);
        String sub = outerWhere.toString();
        return execQuery(sql, sub, page, params, sort);
    }

    /**
     * get branch detail basic information
     * 
     * @param request BranchRequestDto
     * @return Object
     */
    @Override
    public Object getBranchDetail(GeneralRequestDto request) {
        String sql = """
                SELECT  branch.no AS no
                	,	branch.id AS branchId
                	,	branch.name AS branchName
                    ,   addr.id AS addrId
                	,	addr.post_no AS postNo
                    ,   addr.pref_id AS prefId
                    ,   (SELECT name FROM m_blc_item
                         WHERE item_type_id = (SELECT id FROM m_blc_item_type WHERE name = 'prefectures')
                          and type_id = addr.pref_id) AS prefName
                    ,	addr.city AS city
                    ,	addr.town AS town
                    ,   addr.tel AS tel
                    ,   addr.fax AS fax
                    ,	branch.contents AS contents
                    ,   branch.memo AS memo
                    ,	branch.updated_at AS updatedAtBranch
                    ,	addr.updated_at AS updatedAtAddr
                    ,	(SELECT name FROM m_blc_item
                         WHERE item_type_id = (SELECT id FROM m_blc_item_type WHERE name = 'group_home_type')
                          and type_id = CAST(JSON_EXTRACT(branch.contents, '$.basic.groupHomeTypeId') AS UNSIGNED)) AS groupHomeName
                    ,   (SELECT name FROM m_blc_item
                         WHERE item_type_id = (SELECT id FROM m_blc_item_type WHERE name = 'class_division')
                          and type_id = CAST(JSON_EXTRACT(branch.contents, '$.basic.classDivisionId') AS UNSIGNED)) AS classDivisionName
                    ,   sum(CAST(JSON_EXTRACT(unit.contents, '$.services.GH') AS UNSIGNED)) AS unitsGH
                    ,   sum(CAST(JSON_EXTRACT(unit.contents, '$.services.SS') AS UNSIGNED)) AS unitsSS
                FROM d_office_branch AS branch
                LEFT JOIN d_office_home AS home ON home.branch_id = branch.id AND home.deleted_at IS NULL
                LEFT JOIN d_office_unit AS unit ON unit.home_id = home.id AND unit.deleted_at IS NULL
                LEFT JOIN d_blc_addr AS addr ON addr.id = branch.addr_id AND addr.deleted_at IS NULL
                WHERE branch.id = :branchId
                  AND branch.deleted_at IS NULL
                GROUP BY branch.id
                """;

        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("branchId", request.getBranchId());

        return query.getSingleResult();
    }

    /**
     * getCalcDiv
     *
     * @param request BranchRequestDto
     * @return Object
     */
    @Override
    public Object getCalcDiv(GeneralRequestDto request) {
        String sql = """
                SELECT  calc.id AS id
                    ,   calc.placement_ratio AS div
                FROM t_office_calc AS calc
                WHERE calc.office_info_id = :branchId
                  AND calc.deleted_at IS NULL
                """;

        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("branchId", request.getBranchId());

        return query.getSingleResult();
    }

    /**
     * getCalcInfoList
     *
     * @param request BranchRequestDto
     * @return List<Object[]>
     */
    @Override
    public List<Object[]> getCalcInfoList(GeneralRequestDto request) {
        String sql = """
                SELECT  calc_detail.id AS id
                    ,   calc_detail.name AS name
                    ,   calc_detail.type AS classification
                    ,   calc_detail.start_date AS startDate
                    ,   calc_detail.remark AS remark
                FROM t_office_calc_items AS calc_detail
                LEFT JOIN t_office_calc as calc ON calc.id = calc_detail.calc_info_id AND calc.deleted_at IS NULL
                LEFT JOIN d_office_branch AS office ON office.id = calc.office_info_id AND office.deleted_at IS NULL
                WHERE office.id = :branchId
                  AND calc_detail.deleted_at IS NULL
                """;

        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("branchId", request.getBranchId());

        return query.getResultList();
    }

    @Override
    public Page<FacilityDailyListResponseDto> getFacilityDailyList(FacilityDailyListRequestDto request, Pageable pageable) {
        String baseSql = """
                SELECT
                    dob.id AS branchId,
                    dob.name AS branchName,
                    doh.id as homeId,
                    doh.name as homeName,
                    doh.addr_id as addrId,
                    addr.post_no as postNo,
                    addr.pref_id as prefId,
                    pref.name AS prefName,
                    addr.city as city,
                    addr.town as town,
                    addr.tel as tel,
                    addr.fax as fax,
                    dob.updated_at as updatedAt
                FROM 
                    d_office_branch dob
                LEFT JOIN 
                    d_office_home doh ON dob.id = doh.branch_id and doh.deleted_at IS NULL
                LEFT JOIN 
                    d_blc_addr addr ON doh.addr_id = addr.id and addr.deleted_at IS NULL
                LEFT JOIN 
                    (SELECT id FROM m_blc_item_type AS m WHERE m.name = 'prefectures') AS item_type_pref ON TRUE
                LEFT JOIN 
                    m_blc_item AS pref ON pref.type_id = addr.pref_id AND pref.item_type_id = item_type_pref.id
            """;

        StringBuilder whereClause = new StringBuilder();
        Map<String, Object> parameters = new HashMap<>();

        whereClause.append("dob.deleted_at IS NULL");

        SQLUtils.andCondition(whereClause, parameters, "dob.name LIKE :branchName", "branchName", request.getFilter().getBranchName() != null && !request.getFilter().getBranchName().isEmpty() ? "%" + request.getFilter().getBranchName() + "%" : null);
        SQLUtils.andCondition(whereClause, parameters, "doh.name LIKE :homeName", "homeName", request.getFilter().getHomeName() != null && !request.getFilter().getHomeName().isEmpty() ? "%" + request.getFilter().getHomeName() + "%" : null);
        SQLUtils.andCondition(whereClause, parameters, "CONCAT(pref.name, addr.city, addr.town) LIKE :location", "location", request.getFilter().getLocation() != null && !request.getFilter().getLocation().isEmpty() ? "%" + request.getFilter().getLocation() + "%" : null);

        String sql = baseSql + (!whereClause.isEmpty() ? " WHERE " + whereClause : "");
        Query query = entityManager.createNativeQuery(sql, "FacilityDailyListResponseDtoMapping");

        parameters.forEach(query::setParameter);

        query.setFirstResult((int) pageable.getOffset());
        query.setMaxResults(pageable.getPageSize());

        List<FacilityDailyListResponseDto> results = query.getResultList();

        String countSql = "SELECT COUNT(1) FROM (" + sql + ") AS subquery";
        Query countQuery = entityManager.createNativeQuery(countSql);

        parameters.forEach(countQuery::setParameter);

        long totalRecords = ((Number) countQuery.getSingleResult()).longValue();

        return new PageImpl<>(results, pageable, totalRecords);
    }
}
