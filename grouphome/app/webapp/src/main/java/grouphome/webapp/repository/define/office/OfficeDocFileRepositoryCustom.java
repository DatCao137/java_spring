package grouphome.webapp.repository.define.office;

import grouphome.webapp.entity.OfficeDocFileEntity;
import grouphome.webapp.dto.responses.office.doc.ListResponseDto;
import grouphome.webapp.dto.requests.office.DocRequestDto;

import grouphome.webapp.repository.define.blc_common.PagerRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface OfficeDocFileRepositoryCustom extends PagerRepository {
    Page<ListResponseDto> findAll(DocRequestDto request, Pageable pageable);
}
