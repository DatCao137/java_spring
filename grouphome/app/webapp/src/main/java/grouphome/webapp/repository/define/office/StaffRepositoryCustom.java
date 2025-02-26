package grouphome.webapp.repository.define.office;

import grouphome.webapp.dto.requests.office.GeneralRequestDto;
import grouphome.webapp.dto.requests.office.StaffDetailRequestDto;
import grouphome.webapp.dto.requests.office.StaffListRequestDto;
import grouphome.webapp.dto.requests.office.StaffSaveQualificationRequestDto;
import grouphome.webapp.dto.requests.office.StaffSaveRequestDto;
import grouphome.webapp.dto.responses.office.staff.DetailResponseDto;
import grouphome.webapp.dto.responses.office.staff.ListResponseDto;
import grouphome.webapp.repository.define.blc_common.PagerRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface StaffRepositoryCustom extends PagerRepository {
    List<Object[]> getStaffList(GeneralRequestDto request);

    Page<ListResponseDto> findAll(StaffListRequestDto request, Pageable pageable);

    DetailResponseDto findDetail(StaffDetailRequestDto request);

    Long delete(Long id);

    DetailResponseDto save(StaffSaveRequestDto request);

    List<DetailResponseDto.Qualification> saveQualification(StaffSaveQualificationRequestDto request);
}
