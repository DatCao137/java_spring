package grouphome.webapp.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import grouphome.webapp.dto.requests.facility.DailyRecorderBasicInfoRequestDto;
import grouphome.webapp.dto.responses.facility.DailyRecorderBasicInfoResponseDto;
import grouphome.webapp.entity.FacilityDailyCustomerItemsEntity;
import grouphome.webapp.exception.ApiException;
import grouphome.webapp.repository.define.facility.detail.*;
import grouphome.webapp.service.define.FacilityDailyService;
import grouphome.webapp.dto.responses.facility.detail.*;
import grouphome.webapp.dto.requests.facility.detail.*;
import grouphome.webapp.dto.responses.blc_common.PagerResponse;
import grouphome.webapp.dto.requests.facility.detail.SaveCustomerItemsRequestDto.*;

import grouphome.webapp.utils.ResponseCodeAndMsg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class FacilityDailyServiceImpl implements FacilityDailyService {

    @Autowired
    private FacilityDailyRepositoryCustom facilityDailyRepositoryCustom;

    private final FacilityDailyCustomerItemsRepository facilityDailyCustomerItemsRepository;
    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    public FacilityDailyServiceImpl(
            FacilityDailyRepositoryCustom facilityDailyRepositoryCustom,
            FacilityDailyCustomerItemsRepository facilityDailyCustomerItemsRepository
    ) {
        this.facilityDailyRepositoryCustom = facilityDailyRepositoryCustom;
        this.facilityDailyCustomerItemsRepository = facilityDailyCustomerItemsRepository;
    }

    /**
     * getListUnits
     *
     * @param request ListUnitRequestDto
     * @return ListResponseDto
     */
    @Override
    @Transactional
    public ListResponseDto getListUnits(ListUnitRequestDto request) {

        Long homeId = request.getHomeId();
        String homeDate = request.getHomeDate();

        List<ListUnitResponseDto> dataListUnits = facilityDailyRepositoryCustom.getDataListUnits(request);

        List<ListDetailUnitResponseDto> dataListUnitRoom = facilityDailyRepositoryCustom.getDataListUnitsRoom(request);
        
        ListResponseDto responseDto = new ListResponseDto();
        responseDto.setHomeId(homeId);
        responseDto.setHomeDate(homeDate);

        responseDto.setListUnits(dataListUnits);

        responseDto.setListDetailUnits(dataListUnitRoom);

        return responseDto;
    }

    @Override
    public DailyRecorderBasicInfoResponseDto getFacilityDailyRecorderBasicInfo(DailyRecorderBasicInfoRequestDto req) {
        return facilityDailyRepositoryCustom.getFacilityDailyRecorderBasicInfo(req);
    }

    /**
     * getListCustomerItems
     *
     * @param request ListCustomerItemsRequestDto
     * @return PagerResponse<List<ListCustomerItemsResponseDto>>
     */
    @Override
    public PagerResponse<List<ListCustomerItemsResponseDto>> getListCustomerItems(ListCustomerItemsRequestDto request) {
        Pageable pageable = PageRequest.of(request.getPageNumber() - 1, request.getPageSize());

        Page<ListCustomerItemsResponseDtoMapping> pageResult = facilityDailyRepositoryCustom.findAll(request, pageable);

        PagerResponse<List<ListCustomerItemsResponseDto>> response = new PagerResponse<>();

        List<ListCustomerItemsResponseDtoMapping> dataList = pageResult.getContent();

        response.setData(dataList.stream().map(this::convertToCustomerItemsResponseDto).toList());
        response.setTotalRecord((int) pageResult.getTotalElements());
        response.setTotalPage(pageResult.getTotalPages());
        return response;
    }

    /**
     * saveCustomerItems
     *
     * @param request SaveCustomerItemsRequestDto
     * @return SaveCustomerItemsResponseDto
     */
    @Override
    public SaveCustomerItemsResponseDto saveCustomerItems(SaveCustomerItemsRequestDto request) {
        Long customerId = request.getCustomerId();
        String yyyymmdd = request.getYyyymmdd();
        String name = request.getName();
        String key = convertFirstCharToLowerCase(name);
        Integer type = request.getType(); // 1: recorder, 2: user specific
        Long createdBy = request.getCreatedBy();

        LocalDateTime maxUpdatedAt = facilityDailyCustomerItemsRepository.getMaxUpdatedAtByCustomerIdAndYyyymmdd(customerId, yyyymmdd);

        if ((type == 2 && maxUpdatedAt == null) || request.getUpdatedAt() == null || !maxUpdatedAt.isEqual(request.getUpdatedAt())) {
            throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
        }

        Object value = request.getValue().getValue(key);
        if (value == null) {
            value = new PlaceToGo();
        }
        FacilityDailyCustomerItemsEntity entity;
        entity = type == 2 ? facilityDailyCustomerItemsRepository.findByCustomerIdAndYyyymmddAndName(customerId, yyyymmdd, name)
                .orElseThrow(
                        () -> new ApiException(ResponseCodeAndMsg.NOT_FOUND, "Not found"))
                : facilityDailyCustomerItemsRepository.findByCustomerIdAndYyyymmddAndName(customerId, yyyymmdd, name)
                        .orElse(new FacilityDailyCustomerItemsEntity());
        entity.setValue(value);
        entity.setCustomerId(customerId);
        entity.setYyyymmdd(yyyymmdd);
        entity.setName(name);
        if (type == 1 && entity.getId() == null) {
            entity.setCreatedBy(createdBy != null ? createdBy : 1L);
        }
        FacilityDailyCustomerItemsEntity result = facilityDailyCustomerItemsRepository.save(entity);
        LocalDateTime updatedAt = facilityDailyCustomerItemsRepository.getMaxUpdatedAtByCustomerIdAndYyyymmdd(customerId, yyyymmdd);
        return new SaveCustomerItemsResponseDto(result.getId(), updatedAt);
    }

    private ListCustomerItemsResponseDto convertToCustomerItemsResponseDto(ListCustomerItemsResponseDtoMapping mapping) {
        ListCustomerItemsResponseDto dto = new ListCustomerItemsResponseDto();
        dto.setCustomerId(mapping.getCustomerId());
        dto.setYyyymmdd(mapping.getYyyymmdd());
        dto.setCustomerName(mapping.getCustomerName());
        dto.setRoomNo(mapping.getRoomNo());
        dto.setPlaceToGo(convertJson2Object(mapping.getPlaceToGo(), PlaceToGo.class));
        dto.setOuter(convertJson2Object(mapping.getOuterInfo(), Outer.class));
        dto.setDaySupport(convertJson2Object(mapping.getDaySupport(), DaySupport.class));
        dto.setStateMorning(convertJson2Object(mapping.getStateMorning(), State.class));
        dto.setStateNoon(convertJson2Object(mapping.getStateNoon(), State.class));
        dto.setStateNight(convertJson2Object(mapping.getStateNight(), State.class));
        dto.setTimeWakeUp(convertJson2Object(mapping.getTimeWakeUp(), TimeInfo.class));
        dto.setTimeToWork(convertJson2Object(mapping.getTimeToWork(), TimeInfo.class));
        dto.setTimeToReturn(convertJson2Object(mapping.getTimeToReturn(), TimeInfo.class));
        dto.setTimeBathing(convertJson2Object(mapping.getTimeBathing(), TimeInfo.class));
        dto.setTimeToBed(convertJson2Object(mapping.getTimeToBed(), TimeInfo.class));
        dto.setBreakfast(convertJson2Object(mapping.getBreakfast(), Meal.class));
        dto.setLunch(convertJson2Object(mapping.getLunch(), Meal.class));
        dto.setDinner(convertJson2Object(mapping.getDinner(), Meal.class));
        dto.setMedicineMorning1(convertJson2Object(mapping.getMedicineMorning1(), Medicine.class));
        dto.setMedicineMorning2(convertJson2Object(mapping.getMedicineMorning2(), Medicine.class));
        dto.setMedicineNoon1(convertJson2Object(mapping.getMedicineNoon1(), Medicine.class));
        dto.setMedicineNoon2(convertJson2Object(mapping.getMedicineNoon2(), Medicine.class));
        dto.setMedicineNight1(convertJson2Object(mapping.getMedicineNight1(), Medicine.class));
        dto.setMedicineNight2(convertJson2Object(mapping.getMedicineNight2(), Medicine.class));
        dto.setBodyTempMorning(convertJson2Object(mapping.getBodyTempMorning(), Measurement.class));
        dto.setBodyTempNoon(convertJson2Object(mapping.getBodyTempNoon(), Measurement.class));
        dto.setBodyTempNight(convertJson2Object(mapping.getBodyTempNight(), Measurement.class));
        dto.setPressureHigh(convertJson2Object(mapping.getPressureHigh(), Measurement.class));
        dto.setPressureLow(convertJson2Object(mapping.getPressureLow(), Measurement.class));
        dto.setPulse(convertJson2Object(mapping.getPulse(), Measurement.class));
        dto.setOxygenConcentration(convertJson2Object(mapping.getOxygenConcentration(), Measurement.class));
        dto.setUpdatedAt(mapping.getUpdatedAt());
        dto.setCreatedBy(mapping.getCreatedBy());
        dto.setCreatedByMorning(mapping.getCreatedByMorning());
        dto.setCreatedByNoon(mapping.getCreatedByNoon());
        dto.setCreatedByNight(mapping.getCreatedByNight());
        dto.setCreatedNameMorning(mapping.getCreatedNameMorning());
        dto.setCreatedNameNoon(mapping.getCreatedNameNoon());
        dto.setCreatedNameNight(mapping.getCreatedNameNight());
        return dto;
    }

    private <T> T convertJson2Object(String s, Class<T> clazz) {
        if (s == null || s.isEmpty()) return null;
        try {
            return objectMapper.readValue(s, clazz);
        } catch (JsonProcessingException e) {
            return null;
        }
    }

    private String convertFirstCharToLowerCase(String s) {
        if (s == null || s.isEmpty()) return null;
        return s.substring(0, 1).toLowerCase() + s.substring(1);
    }
}
