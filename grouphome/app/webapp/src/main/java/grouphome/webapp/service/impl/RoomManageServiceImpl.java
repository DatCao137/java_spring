package grouphome.webapp.service.define;

import grouphome.webapp.entity.OfficeRoomManageEntity;
import grouphome.webapp.entity.OfficePersonnelStandardsEntity;
import grouphome.webapp.dto.requests.office.GeneralRequestDto;
import grouphome.webapp.dto.requests.office.RoomIsFreeRequestDto;
import grouphome.webapp.dto.requests.office.RoomListRequestDto;
import grouphome.webapp.dto.requests.office.RoomSumsRequestDto;
import grouphome.webapp.dto.requests.office.SaveRoomManageRequestDto;
import grouphome.webapp.dto.responses.blc_common.PagerResponse;
import grouphome.webapp.dto.responses.office.room.*;
import grouphome.webapp.exception.ApiException;
import grouphome.webapp.repository.define.office.PersonnelStandardsRepository;
import grouphome.webapp.repository.define.office.RoomManageRepository;
import grouphome.webapp.service.define.RoomManageService;
import grouphome.webapp.utils.Exchanger;
import grouphome.webapp.utils.ResponseCodeAndMsg;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;

import javax.swing.text.DateFormatter;

@Service
public class RoomManageServiceImpl implements RoomManageService {
    private final RoomManageRepository roomManageRepository;

    @Autowired
    private PersonnelStandardsRepository personnelStandardsRepository;

    @Autowired
    public RoomManageServiceImpl(RoomManageRepository roomManageRepository) {
        this.roomManageRepository = roomManageRepository;
    }

    private ListResponseDto getListResponseDto(Object[] row) {
        if (row == null)
            return null;
        if (row.length == 0)
            return null;
        int nPos = 0;
        ListResponseDto dto = new ListResponseDto();
        dto.setId(Exchanger.toInt(row[nPos++]));
        dto.setCustomerId(Exchanger.toInt(row[nPos++]));
        dto.setRoomId(Exchanger.toInt(row[nPos++]));
        dto.setUnitId(Exchanger.toInt(row[nPos++]));
        dto.setMoveinAt(Exchanger.toString(row[nPos++]));
        dto.setLeavingAt(Exchanger.toString(row[nPos++]));
        dto.setCategoryId(Exchanger.toInt(row[nPos++]));
        dto.setUpdatedAt(Exchanger.toString(row[nPos++]));
        return dto;
    }

    @Override
    public PagerResponse<List<ListResponseDto>> getRoomList(GeneralRequestDto request) {
        Map<String, Object> result = roomManageRepository.getRoomList(request);
        List<ListResponseDto> roomList = new ArrayList<>();

        @SuppressWarnings("unchecked")
        List<Object[]> data = (List<Object[]>)result.get("data");
        for (Object[] row : data) {
            ListResponseDto dto = this.getListResponseDto(row);
            if (dto == null)
                continue;
            roomList.add(dto);
        }
        PagerResponse<List<ListResponseDto>> ret = new PagerResponse<List<ListResponseDto>>(roomList);
        ret.setTotalRecord((Integer)result.get("total"));
        ret.setTotalPage((Integer)result.get("totalPage"));
        return ret;
    }

    @Override
    @Transactional
    public SaveInfoResponseDto saveRoomManageInfo(SaveRoomManageRequestDto request) {
        // Check if homeInfoId exists and is not deleted
        if (request.getId() != null && !roomManageRepository.existsById(request.getId())) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST,
                    "Room Manage Info with ID: " + request.getId() + " does not exist or is deleted");
        }

        Long roomManageId = this.saveOfficeRoomManageEntity(request);
        return new SaveInfoResponseDto(roomManageId);
    }

    @Transactional
    private Long saveOfficeRoomManageEntity(SaveRoomManageRequestDto dto) {
        Long id = dto.getId();
        /* TODO : idが指定されて無いのは論理削除のため、新規インスタンス作成は暫定 */
        OfficeRoomManageEntity entity = (id == null)
                ? new OfficeRoomManageEntity()
                   : this.roomManageRepository.findById4Update(id).orElseGet(OfficeRoomManageEntity::new);

        if((entity.getUpdatedAt() != null)
        && (!entity.getUpdatedAt().isEqual(dto.getUpdatedAt()))) {
            throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
        }

        if(dto.getCustomerId() != null)
            entity.setCustomerId(dto.getCustomerId());
        if(dto.getRoomId() != null)
            entity.setRoomId(dto.getRoomId());
        if(dto.getUnitId() != null)
            entity.setUnitId(dto.getUnitId());
        if(dto.getMoveinAt() != null)
            entity.setMoveinAt(dto.getMoveinAt());
        entity.setLeavingAt(dto.getLeavingAt());
        if(dto.getCategoryId() != null)
            entity.setCategory(dto.getCategoryId());
        entity.setUpdatedAt(dto.getUpdatedAt());
        OfficeRoomManageEntity ret = this.roomManageRepository.save(entity);
        return ret.getId();
    }

    @Override
    @Transactional
    public Long deleteRoomManageInfo(Long id) {
        OfficeRoomManageEntity entity = roomManageRepository.findById(id)
                .orElseThrow(() -> new ApiException(ResponseCodeAndMsg.BAD_REQUEST,
                        "Room Manage info with id " + id + " not found"));

        entity.setDeletedAt(LocalDateTime.now());
        roomManageRepository.save(entity);
        return id;
    }

    @Override
    public List<OfficeRoomMapResponseDto> map(RoomListRequestDto req) {
        return this.roomManageRepository.getRoomListFromHome(req);
    }

    @Override
    public OfficeRoomIsFreeResponseDto isFree(RoomIsFreeRequestDto req) {
        return this.roomManageRepository.getFreeStatus(req);
    }

    @Override
    @Transactional
    public void calc() {
        RoomSumsRequestDto req = new RoomSumsRequestDto();
        String tgtYYYYMM = LocalDate.now().plusMonths(-1).format(DateTimeFormatter.ofPattern("yyyyMM"));
        req.setStartDate(tgtYYYYMM+"01");
        req.setEndDate(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMM01")));

        List<SumsResponseDto> lstDto = this.roomManageRepository.getPersonDayData(req);

        List<OfficePersonnelStandardsEntity> entitys = new ArrayList<>();
        for (SumsResponseDto item : lstDto) {
            if(item.getDays() == 0)
                continue;
            
            LocalDate baseYYYYMM = LocalDate.parse(req.getEndDate(), DateTimeFormatter.ofPattern("yyyyMMdd"));
            LocalDate startYYYYMM = this.getStartYYYYMM(item.getStartYYYYMMDD());
            LocalDate limitYYYYMM = startYYYYMM.plusYears(startYYYYMM.getMonthValue() > 4 ? 2 : 1).plusMonths(4 - startYYYYMM.getMonthValue());
            Long prog = ChronoUnit.MONTHS.between(startYYYYMM, baseYYYYMM);

            SumsResponseDto saveDto;
            if(prog < 6) {
                // 6ヶ月未満の算出(推定値の90%)
                // TODO: 住居情報実装後に対応
                continue;
            } else
            if(prog < 12) {
                // 6〜12ヶ月未満の算出(間近6ヶ月の実績)
                RoomSumsRequestDto subReq = this.getSubReqDto(item.getUnitId(), req.getEndDate(), -6);
                List<SumsResponseDto> wk = this.roomManageRepository.getPersonDayData(subReq);
                saveDto = wk.get(0);
            } else
            if(limitYYYYMM.compareTo(baseYYYYMM) > 0) {
                // 12ヶ月以上、年度未またぎの算出(間近12ヶ月の実績)
                RoomSumsRequestDto subReq = this.getSubReqDto(item.getUnitId(), req.getEndDate(), -12);
                List<SumsResponseDto> wk = this.roomManageRepository.getPersonDayData(subReq);
                saveDto = wk.get(0);
            } else {
                // 通常の実績(先月のみの実績)
                saveDto = item;
            }

            OfficePersonnelStandardsEntity entity =
                this.personnelStandardsRepository.findByUnique4Update(tgtYYYYMM, saveDto.getUnitId())
                                                .orElseGet(OfficePersonnelStandardsEntity::new);
            entity.setUnitId(saveDto.getUnitId());
            entity.setYyyymm(tgtYYYYMM);
            entity.setTotal(this.divUp1(saveDto.getTotal(), saveDto.getDays()));
            entity.setCategory3(this.divUp1(saveDto.getCategory3(), saveDto.getDays()));
            entity.setCategory4(this.divUp1(saveDto.getCategory4(), saveDto.getDays()));
            entity.setCategory5(this.divUp1(saveDto.getCategory5(), saveDto.getDays()));
            entity.setCategory6(this.divUp1(saveDto.getCategory6(), saveDto.getDays()));
            entity.setCaregivers(this.calcCaregivers(entity.getTotal()));
            entity.setSupporter(this.calcSupporter( entity.getCategory3()
                                                ,   entity.getCategory4()
                                                ,   entity.getCategory5()
                                                ,   entity.getCategory6()));
            this.personnelStandardsRepository.save(entity);
        }
    }

    private RoomSumsRequestDto getSubReqDto(Long unitId, String endDate, int before) {
        RoomSumsRequestDto subReq = new RoomSumsRequestDto();
        LocalDate start = LocalDate.parse(endDate, DateTimeFormatter.ofPattern("yyyyMMdd"));
        subReq.setStartDate(start.plusMonths(before).format(DateTimeFormatter.ofPattern("yyyyMMdd")));
        subReq.setEndDate(endDate);
        subReq.setUnitId(unitId);
        return subReq;
    }

    private LocalDate getStartYYYYMM(String yyyymm) {
        if(yyyymm == null || yyyymm.isEmpty()) {
            return LocalDate.of(1990, 1, 1);
        }
        LocalDate startYYYYMM = LocalDate.parse(yyyymm, DateTimeFormatter.ofPattern("yyyyMMdd"));
        return startYYYYMM.plusDays(1-startYYYYMM.getDayOfMonth());
    }

    private BigDecimal calcCaregivers(BigDecimal val) {
        return val.divide(new BigDecimal(6), 1, RoundingMode.DOWN);
    }

    private BigDecimal calcSupporter(BigDecimal cat3, BigDecimal cat4, BigDecimal cat5, BigDecimal cat6) {
        return cat3.divide(new BigDecimal(9), RoundingMode.FLOOR)
            .add(cat4.divide(new BigDecimal(6), RoundingMode.FLOOR))
            .add(cat5.divide(new BigDecimal(4), RoundingMode.FLOOR))
            .add(cat6.divide(new BigDecimal(2.5), RoundingMode.FLOOR))
            .setScale(1, RoundingMode.DOWN);
    }

    private BigDecimal divUp1(Integer val1, Integer val2) {
        BigDecimal base = new BigDecimal(val1);
        return base.divide(new BigDecimal(val2), 1, RoundingMode.UP);
    }
}
