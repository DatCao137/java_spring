package grouphome.webapp.repository.define.blc_common;

import grouphome.webapp.dto.requests.blc_common.SelectListRequestDto;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CustomItemRepository {
    List<Object[]> find(String itemTypeName, SelectListRequestDto.Para[] params);
}
