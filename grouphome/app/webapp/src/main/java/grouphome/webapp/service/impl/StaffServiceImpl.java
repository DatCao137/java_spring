package grouphome.webapp.service.impl;

import grouphome.webapp.dto.requests.office.StaffDetailRequestDto;
import grouphome.webapp.dto.requests.office.StaffListRequestDto;
import grouphome.webapp.dto.requests.office.StaffSaveQualificationRequestDto;
import grouphome.webapp.dto.requests.office.StaffSaveRequestDto;
import grouphome.webapp.dto.responses.blc_common.PagerResponse;
import grouphome.webapp.dto.responses.office.branch.ListOfNameAndIdResponseDto;
import grouphome.webapp.dto.responses.office.staff.InfoResponseDto;
import grouphome.webapp.dto.responses.office.staff.DetailResponseDto;
import grouphome.webapp.dto.responses.office.staff.ListResponseDto;
import grouphome.webapp.repository.define.office.StaffRepository;
import grouphome.webapp.repository.define.office.StaffRepositoryCustom;
import grouphome.webapp.service.define.StaffService;
import grouphome.webapp.utils.Exchanger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StaffServiceImpl implements StaffService {

    private final StaffRepositoryCustom staffRepositoryCustom;
    private final StaffRepository staffRepository;

    @Autowired
    public StaffServiceImpl(StaffRepositoryCustom staffRepositoryCustom, StaffRepository staffRepository) {
        this.staffRepositoryCustom = staffRepositoryCustom;
        this.staffRepository = staffRepository;
    }


    public List<Object[]> findAll() {
        List<Object[]> lst = new ArrayList<Object[]>();
        return lst;
    }

    @Override
    public PagerResponse<List<ListResponseDto>> getList(StaffListRequestDto request) {
        Pageable pageable = PageRequest.of(request.getPageNumber() - 1, request.getPageSize());

        Page<ListResponseDto> pageResult = staffRepositoryCustom.findAll(request, pageable);

        PagerResponse<List<ListResponseDto>> response = new PagerResponse<>();
        response.setData(pageResult.getContent());
        response.setTotalRecord((int) pageResult.getTotalElements());
        response.setTotalPage(pageResult.getTotalPages());
        return response;
    }

    @Override
    public DetailResponseDto getDetail(StaffDetailRequestDto request) {
        return staffRepositoryCustom.findDetail(request);
    }

    @Override
    public DetailResponseDto save(StaffSaveRequestDto request) {
        return staffRepositoryCustom.save(request);
    }

    @Override
    public List<DetailResponseDto.Qualification> saveQualification(StaffSaveQualificationRequestDto request) {
        return staffRepositoryCustom.saveQualification(request);
    }

    @Override
    public Long delete(Long id) {
        return staffRepositoryCustom.delete(id);
    }

    /**
     * getListByBranchId
     *
     * @param branchId Long
     * @return List<ListOfNameAndIdResponseDto>
     */
    @Override
    public List<ListOfNameAndIdResponseDto> getListByBranchId(Integer branchId) {
        if (branchId == null || branchId < 1) return null;
        return new ArrayList<ListOfNameAndIdResponseDto>();
/*        return staffRepository.findAllByBranchId(branchId)
                .stream()
                .map(entity -> new ListOfNameAndIdResponseDto(entity.getId(), entity.getNameSei(), entity.getNameMei()))
                .toList();
    */
    }
}
