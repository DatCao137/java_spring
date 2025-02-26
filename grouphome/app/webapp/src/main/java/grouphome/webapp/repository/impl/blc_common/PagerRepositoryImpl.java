package grouphome.webapp.repository.impl.blc_common;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import grouphome.webapp.dto.responses.blc_common.PagerMapperResponse;
import grouphome.webapp.repository.define.blc_common.PagerRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

public class PagerRepositoryImpl<T extends PagerMapperResponse> implements PagerRepository {
    @PersistenceContext
    private EntityManager entityManager;

    public Integer getTotalPage(Integer total, Integer pageSize) {
        return Math.ceilDiv(total, pageSize);
    }

    private final String base = """
            WITH BASE AS (%s%s), SUB AS (select * FROM BASE %s)
            select *, (select count(*) FROM SUB) as total from SUB
            """;

    protected Map<String, Object> execQuery(String sql,
            String outerWhere,
            Map<String, Integer> page,
            Map<String, Object> params,
            Map<String, String> sort) {
        Integer pageSize = page.get("pageSize");
        Integer pageNum = page.get("pageNumber");
        String order = this.getOrder(sort);
        String execSql = String.format(base, sql, order, outerWhere);
        
        Query query = entityManager.createNativeQuery(execSql);
        params.forEach(query::setParameter);
        if(pageSize != null && pageNum != null)
            setPaging(query, pageNum, pageSize);
        List<Object[]> lst = query.getResultList();
        Map<String, Object> ret = new HashMap<String, Object>();
        Integer total = 0;
        if (lst.size() != 0) {
            Object[] record = lst.get(0);
            total = Integer.valueOf(record[record.length - 1].toString());
        }
        ret.put("total", total);
        ret.put("totalPage", getTotalPage(total, pageSize));
        ret.put("page", pageNum);
        ret.put("size", pageSize);
        ret.put("data", lst);
        return ret;
    }

    protected Page<T> execQueryWithMap(String sql,
            String outerWhere,
            String mapper,
            Pageable pageable,
            Map<String, Object> params,
            Map<String, String> sort) {
        String order = this.getOrder(sort);
        String execSql = String.format(base, sql, order, outerWhere);

        Query query = entityManager.createNativeQuery(execSql, mapper);
        params.forEach(query::setParameter);

        if(pageable != null) {
            query.setFirstResult((int)pageable.getOffset());
            query.setMaxResults(pageable.getPageNumber());
        } else {
            pageable = PageRequest.of(0, Integer.MAX_VALUE);
        } 

        List<T> lst = query.getResultList();
        Integer total = 0;
        if (lst.size() != 0) {
            T record = lst.get(0);
            total = Integer.valueOf(record.getTotal().toString());
        }
        return new PageImpl<>(lst, pageable, total);
    }

    /**
     * 
     * @param order HashMap<String, String> column, order(ASC|DESC)
     * @return
     */
    private String getOrder(Map<String, String> sort) {
        StringBuilder val = new StringBuilder();
        for (Map.Entry<String, String> entry : sort.entrySet()) {
            String orderBy = "DESC".equalsIgnoreCase(entry.getValue())
                    ? "DESC"
                    : "ASC";
            if (val.length() != 0) {
                val.append(",");
            }
            val.append(String.format("%s %s", entry.getKey(), orderBy));
        }
        return val.length() == 0 ? "" : String.format("ORDER BY %s", val);
    }

    private void setPaging(Query query, Integer pageNumber, Integer pageSize) {
        if (pageNumber == null || pageSize == null || pageSize < 0)
            return;
        query.setFirstResult((pageNumber - 1) * pageSize);
        query.setMaxResults(pageSize);
        return;
    }
}
