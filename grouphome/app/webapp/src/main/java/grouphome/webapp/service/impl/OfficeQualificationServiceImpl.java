package grouphome.webapp.service.impl;

import grouphome.webapp.dto.responses.office.qualification.OfficeQualificationListResponseDto;
import grouphome.webapp.repository.define.office.OfficeQualificationRepositoryCustom;
import grouphome.webapp.service.define.OfficeQualificationService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OfficeQualificationServiceImpl implements OfficeQualificationService {

    private final OfficeQualificationRepositoryCustom officeQualificationRepository;

    public OfficeQualificationServiceImpl(OfficeQualificationRepositoryCustom officeQualificationRepository) {
        this.officeQualificationRepository = officeQualificationRepository;
    }

    @Override
    public List<OfficeQualificationListResponseDto> getList() {
        return officeQualificationRepository.getList();
    }
}
