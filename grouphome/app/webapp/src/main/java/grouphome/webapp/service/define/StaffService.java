package grouphome.webapp.service.define;

import grouphome.webapp.dto.requests.office.StaffDetailRequestDto;
import grouphome.webapp.dto.requests.office.StaffListRequestDto;
import grouphome.webapp.dto.requests.office.StaffSaveQualificationRequestDto;
import grouphome.webapp.dto.requests.office.StaffSaveRequestDto;
import grouphome.webapp.dto.responses.blc_common.PagerResponse;
import grouphome.webapp.dto.responses.office.branch.ListOfNameAndIdResponseDto;
import grouphome.webapp.dto.responses.office.staff.InfoResponseDto;
import grouphome.webapp.dto.responses.office.staff.DetailResponseDto;
import grouphome.webapp.dto.responses.office.staff.ListResponseDto;

import java.util.List;

public interface StaffService {
    public List<Object[]> findAll();

    PagerResponse<List<ListResponseDto>> getList(StaffListRequestDto request);

    DetailResponseDto getDetail(StaffDetailRequestDto request);

    DetailResponseDto save(StaffSaveRequestDto request);

    List<DetailResponseDto.Qualification> saveQualification(StaffSaveQualificationRequestDto request);

    Long delete(Long id);

    List<ListOfNameAndIdResponseDto> getListByBranchId(Integer branchId);
}
