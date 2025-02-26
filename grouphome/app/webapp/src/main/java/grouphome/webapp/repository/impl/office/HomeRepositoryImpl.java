package grouphome.webapp.repository.impl.office;

import grouphome.webapp.dto.requests.office.HomeRequestDto;
import grouphome.webapp.repository.define.office.HomeRepositoryCustom;
import grouphome.webapp.repository.impl.blc_common.PagerRepositoryImpl;
import grouphome.webapp.utils.SQLUtils;
import jakarta.persistence.*;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
public class HomeRepositoryImpl extends PagerRepositoryImpl implements HomeRepositoryCustom {
    @PersistenceContext
    private EntityManager entityManager;

    /**
     * Get office list
     *
     * @param request HomeRequestDto
     * @return Map<String, Object>
     */
    @Override
    public Map<String, Object> getHomeList(HomeRequestDto request) {
        final String baseSql = """
                SELECT  home.id AS id
                    ,   home.name AS name
                    ,   home.branch_id AS branchId
                    ,	branch.name AS branchName
                    ,   addr.post_no AS postNo
                    ,   addr.pref_id AS prefId
                    ,   pref.name AS prefName
                    ,   home.addr_id AS addrId
                    ,   addr.city AS city
                    ,   addr.town AS town
                    ,   addr.tel AS tel
                    ,   (select JSON_ARRAYAGG(JSON_OBJECT('id',id, 'name',name))
                         from d_office_unit as res
                         where res.home_id = home.id
                           and res.deleted_at is null) AS units
                    ,   home.updated_at AS updatedAtHome 
                    ,   addr.updated_at AS updatedAtAddr
                FROM d_office_home AS home
                LEFT JOIN d_office_branch AS branch ON home.branch_id = branch.id AND branch.deleted_at IS NULL
                LEFT JOIN d_blc_addr AS addr ON addr.id = home.addr_id AND addr.deleted_at IS NULL
                LEFT JOIN (SELECT id FROM m_blc_item_type AS m WHERE m.name = 'prefectures') AS item_type_pref ON TRUE
                LEFT JOIN m_blc_item AS pref ON pref.type_id = addr.pref_id AND pref.item_type_id = item_type_pref.id
                %s
                
                """;

        Map<String, Object> params = new HashMap<String, Object>();
        StringBuilder where = new StringBuilder("WHERE home.deleted_at IS NULL");
        StringBuilder outerWhere = new StringBuilder();

        if (request.getDateFrom() != null) {
            where.append("AND home.created_at >= :dateFrom ");
            params.put("dateFrom", request.getDateFrom());
        }

        if (request.getDateTo() != null) {
            where.append("AND home.created_at <= :dateTo ");
            params.put("dateTo", request.getDateTo());
        }

        Map<String, String> filter = request.getFilter();
        String val;

        /* homeName */
        val = filter.get("homeName");
        if (StringUtils.isNotBlank(val)) {
            SQLUtils.filterString(where, "home.name LIKE :homeName");
            params.put("homeName", "%" + val.trim() + "%");
        }

        /* branchName */
        val = filter.get("branchName");
        if (StringUtils.isNotBlank(val)) {
            SQLUtils.filterString(where, "branch.name LIKE :branchName");
            params.put("branchName", "%" + val.trim() + "%");
        }

         /* address */
         val = filter.get("address");
         if (StringUtils.isNotBlank(val)) {
             SQLUtils.filterString(outerWhere, "CONCAT(COALESCE(prefName, ''), COALESCE(city, ''), COALESCE(town, '')) LIKE :address");
             params.put("address", "%" + val.trim() + "%");
         }

        /* tel */
        val = filter.get("tel");
        if (StringUtils.isNotBlank(val)) {
            SQLUtils.filterString(where, "addr.tel LIKE :tel");
            params.put("tel", "%" + val.trim() + "%");
        }

        /* units */
        val = filter.get("units");
        if (StringUtils.isNotBlank(val)) {
            SQLUtils.filterString(outerWhere, "units LIKE :units");
            params.put("units", "%" + val.trim() + "%");
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
}
