package grouphome.webapp.repository.define.blc_common;

import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ItemRepository {
    List<Object[]> find(String itemTypeName);    
}
