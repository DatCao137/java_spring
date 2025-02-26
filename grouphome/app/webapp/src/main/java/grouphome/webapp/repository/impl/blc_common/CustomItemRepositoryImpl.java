package grouphome.webapp.repository.impl.blc_common;

import grouphome.webapp.dto.requests.blc_common.SelectListRequestDto;
import grouphome.webapp.repository.define.blc_common.CustomItemRepository;
import jakarta.persistence.*;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Repository
public class CustomItemRepositoryImpl implements CustomItemRepository {
    @PersistenceContext
    private EntityManager entityManager;

    private static Map<String, String[]> sqls = new HashMap<>();
    static {
        sqls.put("cust__branch",  new String[]{"""
            select id, name
            from d_office_branch
            where deleted_at is null
            %s
            """, "and `%s` = '%s'"});
        sqls.put("cust__home", new String[]{ """
            select id, name
            from d_office_home
            where deleted_at is null
            %s
            """, "and `%s` = '%s'"});
        sqls.put("cust__staff", new String[]{"""
            select id, concat(name_sei, ' ', name_mei)
            from d_office_staff
            where deleted_at is null
            %s
            """, "and json_search(affiliations->'$.%s[*].name', 'one', (SELECT name FROM d_office_branch where id = '%s')) IS NOT NULL"});
    }

    @Override
    public List<Object[]> find(String itemTypeName, SelectListRequestDto.Para[] params) {
        String[] sql = sqls.get(itemTypeName);
        if (sql == null)
            return new ArrayList<Object[]>();
        String where = "";
        if (params != null) {
            StringBuilder sb = new StringBuilder();
            for(int i = 0; i < params.length; i++) {
                if(!StringUtils.isEmpty(params[i].getValue())) {
                    sb.append(String.format(sql[1], params[i].getName(), params[i].getValue()));
                }
            }
            where = sb.toString();
        }
        Query query = entityManager.createNativeQuery(String.format(sql[0], where));
        return query.getResultList();
    }
}
