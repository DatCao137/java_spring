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
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;



@Service
@Transactional
public class HomeServiceImpl extends AddressServiceImpl implements HomeService {
    protected final Logger log = LoggerFactory.getLogger(this.getClass());

    private final HomeRepository homeRepository;

    @Autowired
    private UnitService unitService;

    @Autowired
    private UnitRepository unitRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    public HomeServiceImpl(HomeRepository homeRepository) {
        this.homeRepository = homeRepository;
    }

    /**
     * Get home info list
     *
     * @param request HomeRequestDto
     * @return PagerResponse<List<ListResponseDto>>
     */
    @Override
    public PagerResponse<List<ListResponseDto>> getHomeList(HomeRequestDto request) {
        Map<String, Object> result = homeRepository.getHomeList(request);
        List<ListResponseDto> homeList = new ArrayList<>();

        @SuppressWarnings("unchecked")
        List<Object[]> data = (List<Object[]>)result.get("data");
        for (Object[] row : data) {
            ListResponseDto dto = this.getListResponseDto(row);
            if (dto == null)
                continue;
            homeList.add(dto);
        }
        PagerResponse<List<ListResponseDto>> ret = new PagerResponse<List<ListResponseDto>>(homeList);
        ret.setTotalRecord((Integer)result.get("total"));
        ret.setTotalPage((Integer)result.get("totalPage"));
        return ret;
    }

    @Override
    @Transactional
    public SaveInfoResponseDto saveHomeInfo(SaveHomeRequestDto request) {
        // Check if homeInfoId exists and is not deleted
        if (request.getHomeId() != null && !homeRepository.existsById(request.getHomeId())) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST,
                    "Home Info with ID: " + request.getHomeId() + " does not exist or is deleted");
        }

        Long addrId = saveBlcAddrEntity(request);
        request.setAddrId(addrId);
        Long homeId = this.saveOfficeHomeEntity(request);
        return new SaveInfoResponseDto(homeId, addrId);
    }

    @Transactional
    private Long saveOfficeHomeEntity(SaveHomeRequestDto dto) {
        Long id = dto.getHomeId();
        /* TODO : idが指定されて無いのは論理削除のため、新規インスタンス作成は暫定 */
        OfficeHomeEntity entity = (id == null)
                ? new OfficeHomeEntity()
                   : this.homeRepository.findById4Update(id).orElseGet(OfficeHomeEntity::new);

        if((entity.getUpdatedAt() != null)
        && (!entity.getUpdatedAt().isEqual(dto.getUpdatedAtHome()))) {
            throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
        }

        entity.setName(dto.getName());
        entity.setBranchId(dto.getBranchId());
        entity.setSameBranch(dto.getSameBranch());
        entity.setAddrId(dto.getAddrId());
        entity.setContents(dto.getContents());
        entity.setUpdatedAt(dto.getUpdatedAtHome());
        OfficeHomeEntity ret = this.homeRepository.save(entity);
        return ret.getId();
    }

    /**
     * Delete an home info
     *
     * @param id Long
     */
    @Override
    @Transactional
    public Long deleteHomeInfo(Long id) {
        Optional<OfficeHomeEntity> optionalHomeInfo = homeRepository.findById(id);
        if (optionalHomeInfo.isPresent()) {
            OfficeHomeEntity homeInfo = optionalHomeInfo.get();
            try {
                List<OfficeUnitEntity> units = unitRepository.findByHomeId(id);
                unitService.deleteUnits(units);

                Optional<BlcAddrEntity> addr = addressRepository.findById(homeInfo.getAddrId());
                addr.ifPresent(x -> {
                    x.setDeletedAt(LocalDateTime.now());
                    addressRepository.save(x);
                });
                homeInfo.setDeletedAt(LocalDateTime.now());
                homeRepository.save(homeInfo);
                return id;
            } catch (OptimisticLockingFailureException e) {
                throw new OptimisticLockingFailureException(e.getMessage());
            }
        } else {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, "Home info with id " + id + " not found");
        }
    }
    /**
     * getAll Home info
     * @return List<HomeInfoEntity>
     */
    @Override
    public List<OfficeHomeEntity> getAll() {
        return homeRepository.findAll();
    }

    private ListResponseDto getListResponseDto(Object[] row) {
        if (row == null)
            return null;
        if (row.length == 0)
            return null;
        int nPos = 0;
        ListResponseDto dto = new ListResponseDto();
        dto.setId(Exchanger.toInt(row[nPos++]));
        dto.setHomeName(Exchanger.toString(row[nPos++]));
        dto.setBranchId(Exchanger.toInt(row[nPos++]));
        dto.setBranchName(Exchanger.toString(row[nPos++]));
        dto.setPostNo(Exchanger.toString(row[nPos++]));
        dto.setPrefId(Exchanger.toInt(row[nPos++]));
        dto.setPrefName(Exchanger.toString(row[nPos++]));
        dto.setAddrId(Exchanger.toInt(row[nPos++]));
        dto.setCity(Exchanger.toString(row[nPos++]));
        dto.setTown(Exchanger.toString(row[nPos++]));
        dto.setTel(Exchanger.toString(row[nPos++]));
        dto.setUnits(Exchanger.toString(row[nPos++]));
        dto.setUpdatedAtHome(Exchanger.toString(row[nPos++]));
        dto.setUpdatedAtAddr(Exchanger.toString(row[nPos++]));
        return dto;
    }
}
