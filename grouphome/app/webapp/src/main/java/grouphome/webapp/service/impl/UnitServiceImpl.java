package grouphome.webapp.service.impl;

import grouphome.webapp.dto.requests.office.GeneralRequestDto;
import grouphome.webapp.dto.requests.office.SaveUnitRequestDto;
import grouphome.webapp.dto.responses.office.branch.SaveUnitResponseDto;
import grouphome.webapp.dto.responses.office.branch.UnitResponseDto;
import grouphome.webapp.entity.BlcAddrEntity;
import grouphome.webapp.entity.OfficeHomeEntity;
import grouphome.webapp.entity.OfficeUnitEntity;
import grouphome.webapp.exception.ApiException;
import grouphome.webapp.repository.define.office.HomeRepository;
import grouphome.webapp.repository.define.office.UnitRepository;
import grouphome.webapp.service.define.UnitService;
import grouphome.webapp.utils.Exchanger;
import grouphome.webapp.utils.ResponseCodeAndMsg;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.ArrayList;
import java.util.List;

@Service
public class UnitServiceImpl extends AddressServiceImpl implements UnitService {
    private final UnitRepository unitRepository;
    private final HomeRepository homeRepository;

    @Autowired
    public UnitServiceImpl(UnitRepository unitRepository, HomeRepository homeRepository) {
        this.unitRepository = unitRepository;
        this.homeRepository = homeRepository;
    }

    /**
     * Get unit info for office details
     * 
     * @param request BranchRequestDto
     * @return List<UnitResponseDto>
     */
    @Override
    public List<UnitResponseDto> getUnit(GeneralRequestDto request) {
        if (request.getHomeId() == null) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, "Home ID is required");
        }

        List<Object[]> resultList = unitRepository.getUnit(request);
        List<UnitResponseDto> unitList = new ArrayList<>();

        for (Object[] row : resultList) {
            UnitResponseDto dto = this.getUnitDto(row);
            if (dto == null)
                continue;
            unitList.add(dto);
        }

        return unitList;
    }

    /**
     * saveUnitInfo
     * 
     * @param request SaveUnitRequestDto
     * @return SaveUnitResponseDto
     */
    @Override
    @Transactional
    public SaveUnitResponseDto saveUnitInfo(SaveUnitRequestDto request) {
        // Check if homeInfoId exists and is not deleted
        // if (!homeRepository.existsById(request.getHomeInfoId())) {
        // throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, "Home Info with ID: "
        // + request.getHomeInfoId() + " does not exist or is deleted");
        // }
        if (!homeRepository.existsById(request.getHomeId())) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, "登録先の事業所配下にホーム情報が登録されていません");
        }

        Long addrId = this.saveBlcAddrEntity(request);
        request.setAddrId(addrId);
        Long unitInfoId = saveOfficeUnitEntity(request);

        return new SaveUnitResponseDto(unitInfoId, addrId);
    }

    /**
     * Soft delete a unitInfo
     * 
     * @param id Long
     * @return Long
     */
    @Override
    @Transactional
    public Long deleteUnit(Long id) {
        Optional<OfficeUnitEntity> optionalUnitEntity = unitRepository.findById(id);
        if (optionalUnitEntity.isPresent()) {
            OfficeUnitEntity unitInfo = optionalUnitEntity.get();
            unitInfo.setDeletedAt(LocalDateTime.now());
            try {
                unitRepository.save(unitInfo);

                Optional<BlcAddrEntity> addr = addressRepository.findById(unitInfo.getAddrId());
                addr.ifPresent(x -> {
                    x.setDeletedAt(LocalDateTime.now());
                    addressRepository.save(x);
                });

                return id;
            } catch (OptimisticLockingFailureException e) {
                throw new OptimisticLockingFailureException(e.getMessage());
            }
        } else {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, "UnitInfo with id " + id + " not found");
        }
    }

    @Override
    @Transactional
    public void deleteUnits(List<OfficeUnitEntity> units) {
        units.forEach(item -> {
            item.setDeletedAt(LocalDateTime.now());
            unitRepository.save(item);
            Optional<BlcAddrEntity> addr = addressRepository.findById(item.getAddrId());
            addr.ifPresent(x -> {
                x.setDeletedAt(LocalDateTime.now());
                addressRepository.save(x);
            });
        });
    }

    @Transactional
    private Long saveOfficeUnitEntity(SaveUnitRequestDto request) {
        Long id = request.getUnitId();
        OfficeUnitEntity unitInfo = (id == null)
                ? new OfficeUnitEntity()
                : unitRepository.findById4Update(id).orElseGet(OfficeUnitEntity::new);

        if((unitInfo.getUpdatedAt() != null)
        && (!unitInfo.getUpdatedAt().isEqual(request.getUpdatedAtUnit()))) {
            throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
        }

        unitInfo.setHomeId(request.getHomeId());
        unitInfo.setName(request.getName());
        unitInfo.setAddrId(request.getAddrId());
        unitInfo.setMail(request.getMail());
        unitInfo.setContents(request.getContents());

        OfficeUnitEntity res = unitRepository.save(unitInfo);
        return res.getId();
    }

    private UnitResponseDto getUnitDto(Object[] row) {
        if (row == null)
            return null;
        if (row.length == 0)
            return null;
        int nPos = 0;
        UnitResponseDto dto = new UnitResponseDto();
        dto.setUnitId(Exchanger.toLong(row[nPos++]));
        dto.setHomeId(Exchanger.toLong(row[nPos++]));
        dto.setUnitName(Exchanger.toString(row[nPos++]));
        dto.setAddrId(Exchanger.toLong(row[nPos++]));
        dto.setPostNo(Exchanger.toString(row[nPos++]));
        dto.setPrefId(Exchanger.toInt(row[nPos++]));
        dto.setPrefName(Exchanger.toString(row[nPos++]));
        dto.setCity(Exchanger.toString(row[nPos++]));
        dto.setTown(Exchanger.toString(row[nPos++]));
        dto.setTel(Exchanger.toString(row[nPos++]));
        dto.setFax(Exchanger.toString(row[nPos++]));
        dto.setMail(Exchanger.toString(row[nPos++]));
        dto.setContents(Exchanger.toString(row[nPos++]));
        dto.setUpdatedAtUnit(Exchanger.toString(row[nPos++]));
        dto.setUpdatedAtAddr(Exchanger.toString(row[nPos++]));
        return dto;
    }
}
