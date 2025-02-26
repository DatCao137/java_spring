package grouphome.webapp.repository.impl.blc_common;

import grouphome.webapp.repository.define.blc_common.ItemRepository;
import jakarta.persistence.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ItemRepositoryImpl implements ItemRepository {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Object[]> find(String itemTypeName) {
        String sql = """
                select type_id as value, name
                from m_blc_item
                where item_type_id = (select id from m_blc_item_type where name=:keyword) order by sort;
                """;

        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("keyword", itemTypeName);
        return query.getResultList();
    }
}
