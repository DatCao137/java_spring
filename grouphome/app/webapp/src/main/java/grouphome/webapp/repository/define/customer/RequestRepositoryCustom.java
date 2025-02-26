package grouphome.webapp.repository.define.customer;

import grouphome.webapp.dto.requests.customer.RequestListRequestDto;
import grouphome.webapp.dto.responses.customer.request.ListResponseDto;
import grouphome.webapp.repository.define.blc_common.PagerRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RequestRepositoryCustom extends PagerRepository {
    Page<ListResponseDto> findAll(RequestListRequestDto request, Pageable pageable);
}
