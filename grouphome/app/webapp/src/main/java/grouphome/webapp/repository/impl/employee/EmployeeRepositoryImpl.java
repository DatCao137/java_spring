package grouphome.webapp.repository.impl.employee;

import grouphome.webapp.dto.requests.office.HomeRequestDto;
import grouphome.webapp.repository.define.office.HomeRepositoryCustom;
import grouphome.webapp.repository.impl.blc_common.PagerRepositoryImpl;
import grouphome.webapp.utils.SQLUtils;
import jakarta.persistence.*;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

import grouphome.webapp.dto.requests.employee.EmployeeRequestDto;
import grouphome.webapp.repository.define.employee.EmployeeRepositoryCustom;
import java.util.HashMap;
import java.util.Map;

@Repository
public class EmployeeRepositoryImpl extends PagerRepositoryImpl implements EmployeeRepositoryCustom {
    @PersistenceContext
    private EntityManager entityManager;

    /**
     * Get office list
     *
     * @param request EmployeeRequestDto
     * @return Map<String, Object>
     */
    @Override
    public Map<String, Object> getEmployeeList(EmployeeRequestDto request) {
        final String baseSql = """
                SELECT  employee.id AS id
                    ,   employee.name AS name
                    ,   employee.birth_day AS birthDay
                    ,   employee.address AS address
                    ,   employee.message AS message
                    ,   employee.unit_id AS unitId
                    ,   employee.updated_at AS updatedAt
                FROM e_employee AS employee
                 %s
                
                """;

        Map<String, Object> params = new HashMap<String, Object>();
        StringBuilder where = new StringBuilder("WHERE employee.deleted_at IS NULL");
        StringBuilder outerWhere = new StringBuilder();

        // if (request.getDateFrom() != null) {
        //     where.append("AND employee.created_at >= :dateFrom ");
        //     params.put("dateFrom", request.getDateFrom());
        // }

        // if (request.getDateTo() != null) {
        //     where.append("AND employee.created_at <= :dateTo ");
        //     params.put("dateTo", request.getDateTo());
        // }

        Map<String, String> filter = request.getFilter();
        String val;

        /* Name */
        val = filter.get("name");
        if (StringUtils.isNotBlank(val)) {
            SQLUtils.filterString(where, "employee.name LIKE :name");
            params.put("name", "%" + val.trim() + "%");
        }

        // /* branchName */
        // val = filter.get("branchName");
        // if (StringUtils.isNotBlank(val)) {
        //     SQLUtils.filterString(where, "branch.name LIKE :branchName");
        //     params.put("branchName", "%" + val.trim() + "%");
        // }

        //  /* address */
        //  val = filter.get("address");
        //  if (StringUtils.isNotBlank(val)) {
        //      SQLUtils.filterString(outerWhere, "CONCAT(COALESCE(prefName, ''), COALESCE(city, ''), COALESCE(town, '')) LIKE :address");
        //      params.put("address", "%" + val.trim() + "%");
        //  }

        // /* tel */
        // val = filter.get("tel");
        // if (StringUtils.isNotBlank(val)) {
        //     SQLUtils.filterString(where, "addr.tel LIKE :tel");
        //     params.put("tel", "%" + val.trim() + "%");
        // }

        // /* units */
        // val = filter.get("units");
        // if (StringUtils.isNotBlank(val)) {
        //     SQLUtils.filterString(outerWhere, "units LIKE :units");
        //     params.put("units", "%" + val.trim() + "%");
        // }

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
