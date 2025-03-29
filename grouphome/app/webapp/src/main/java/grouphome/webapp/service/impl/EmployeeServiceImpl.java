package grouphome.webapp.service.impl;

import grouphome.webapp.dto.requests.office.HomeRequestDto;
import grouphome.webapp.dto.requests.office.SaveHomeRequestDto;
import grouphome.webapp.dto.responses.blc_common.PagerResponse;
import grouphome.webapp.dto.responses.office.home.*;
import grouphome.webapp.entity.BlcAddrEntity;
import grouphome.webapp.entity.OfficeBranchEntity;
import grouphome.webapp.entity.OfficeHomeEntity;
import grouphome.webapp.entity.OfficeUnitEntity;
import grouphome.webapp.exception.ApiException;
import grouphome.webapp.repository.define.blc_common.*;
import grouphome.webapp.repository.define.office.*;
import grouphome.webapp.service.define.HomeService;
import grouphome.webapp.service.define.UnitService;
import grouphome.webapp.utils.Exchanger;
import grouphome.webapp.utils.ResponseCodeAndMsg;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import grouphome.webapp.dto.requests.employee.*;
import grouphome.webapp.dto.responses.employee.*;

import grouphome.webapp.repository.define.employee.*;

import grouphome.webapp.dto.responses.employee.ListEmployeeResponseDto;
import grouphome.webapp.repository.define.employee.EmployeeRepository;
import grouphome.webapp.service.define.EmployeeService;
import grouphome.webapp.entity.EmployeeEntity;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;


@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {
    // protected final Logger log = LoggerFactory.getLogger(this.getClass());

     private final EmployeeRepository employeeRepository;

    @Autowired
    private UnitService unitService;

    @Autowired
    private UnitRepository unitRepository;

    @Autowired
    private AddressRepository addressRepository;

@Autowired
    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    /**
     * Get home info list
     *
     * @param request EmployeeRequestDto
     * @return PagerResponse<List<ListEmployeeResponseDto>>
     */
    // @Override
    public PagerResponse<List<ListEmployeeResponseDto>> getEmployeeList(EmployeeRequestDto request) {
        Map<String, Object> result = employeeRepository.getEmployeeList(request);
        List<ListEmployeeResponseDto> employeeList = new ArrayList<>();

        @SuppressWarnings("unchecked")
        List<Object[]> data = (List<Object[]>)result.get("data");
        for (Object[] row : data) {
            ListEmployeeResponseDto dto = this.getListEmployeeResponseDto(row);
            if (dto == null)
                continue;
            employeeList.add(dto);
        }
        PagerResponse<List<ListEmployeeResponseDto>> ret = new PagerResponse<List<ListEmployeeResponseDto>>(employeeList);
        ret.setTotalRecord((Integer)result.get("total"));
        ret.setTotalPage((Integer)result.get("totalPage"));
        return ret;
    }
    
    @Override
    @Transactional
    public SaveInfoEmployeeResponseDto saveEmployeeInfo(SaveEmployeeRequestDto request) {
        // Check if homeInfoId exists and is not deleted
        if (request.getId() != null && !employeeRepository.existsById(request.getId())) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST,
                    "Employee Info with ID: " + request.getId() + " does not exist or is deleted");
        }

        // Long addrId = saveBlcAddrEntity(request);
        // request.setAddrId(addrId);
        Long id = this.saveEmployeeEntity(request);
        return new SaveInfoEmployeeResponseDto(id);
    }
    @Transactional
    private Long saveEmployeeEntity(SaveEmployeeRequestDto dto) {
        Long id = dto.getId();
        /* TODO : idが指定されて無いのは論理削除のため、新規インスタンス作成は暫定 */
        EmployeeEntity entity = (id == null)
                ? new EmployeeEntity()
                   : this.employeeRepository.findById4Update(id).orElseGet(EmployeeEntity::new);

        if((entity.getUpdatedAt() != null)
        && (!entity.getUpdatedAt().isEqual(dto.getUpdatedAt()))) {
            throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
        }

        entity.setName(dto.getName());
        entity.setBirthDay(dto.getBirthDay());
        entity.setAddress(dto.getAddress());
        entity.setMessage(dto.getMessage());
        //entity.setUnitId(dto.getUnitId());
        entity.setUpdatedAt(dto.getUpdatedAt());
        entity.setFileName(dto.getFileName());
        //entity.setImageEmployee(dto.getImageEmployee());
          MultipartFile imageFile = dto.getImageEmployee();
    if (imageFile != null && !imageFile.isEmpty()) {
        try {
            byte[] imageBytes = imageFile.getBytes();
            entity.setImageEmployee(imageBytes);
        } catch (IOException e) {
            System.err.println("Lỗi khi xử lý hình ảnh: ");
        }
    }
        EmployeeEntity ret = this.employeeRepository.save(entity);
        return ret.getId();
    }

    /**
     * Delete an home info
     *
     * @param id Long
     */
    @Override
    @Transactional
    public Long deleteEmployeeInfo(Long id) {
        Optional<EmployeeEntity> optionalEmployeeInfo = employeeRepository.findById(id);
        if (optionalEmployeeInfo.isPresent()) {
            EmployeeEntity employeeInfo = optionalEmployeeInfo.get();
            try {
                List<OfficeUnitEntity> units = unitRepository.findByHomeId(id);
                unitService.deleteUnits(units);

                // Optional<BlcAddrEntity> addr = addressRepository.findById(homeInfo.getAddrId());
                // addr.ifPresent(x -> {
                //     x.setDeletedAt(LocalDateTime.now());
                //     addressRepository.save(x);
                // });
                employeeInfo.setDeletedAt(LocalDateTime.now());
                employeeRepository.save(employeeInfo);
                return id;
            } catch (OptimisticLockingFailureException e) {
                throw new OptimisticLockingFailureException(e.getMessage());
            }
        } else {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, "Employee info with id " + id + " not found");
        }
    }
    // /**
    //  * getAll Home info
    //  * @return List<HomeInfoEntity>
    //  */
    @Override
    public List<EmployeeEntity> getAll() {
        return employeeRepository.findAll();
    }

    private ListEmployeeResponseDto getListEmployeeResponseDto(Object[] row) {
        if (row == null)
            return null;
        if (row.length == 0)
            return null;
        int nPos = 0;
        ListEmployeeResponseDto dto = new ListEmployeeResponseDto();
        dto.setId(Exchanger.toInt(row[nPos++]));
        dto.setName(Exchanger.toString(row[nPos++]));
        dto.setBirthDay(Exchanger.toString(row[nPos++]));
        dto.setAddress(Exchanger.toString(row[nPos++]));
        dto.setMessage(Exchanger.toString(row[nPos++]));
        dto.setUnitId(Exchanger.toInt(row[nPos++]));
        dto.setUpdatedAt(Exchanger.toString(row[nPos++]));
        return dto;
    }
    // private ImageFileRepository imageFileRepository;

    // public void store(MultipartFile file) throws IOException {
    //     ImageFile imageFile = new ImageFile();
    //     imageFile.setFileName(file.getOriginalFilename());
    //     imageFile.setFileType(file.getContentType());
    //     imageFile.setData(file.getBytes());

    //     imageFileRepository.save(imageFile);
    // }
}
