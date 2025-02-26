package grouphome.webapp.repository.define.office;

import grouphome.webapp.dto.requests.office.HomeRequestDto;
import grouphome.webapp.repository.define.blc_common.PagerRepository;

import java.util.Map;

public interface HomeRepositoryCustom extends PagerRepository {
    Map<String, Object> getHomeList(HomeRequestDto request);
}
