package grouphome.webapp.dto.responses.facility.detail;

import grouphome.webapp.dto.requests.facility.detail.SaveCustomerItemsRequestDto.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ListCustomerItemsResponseDto {
    Long customerId;
    String yyyymmdd;
    String roomNo;
    String customerName;
    PlaceToGo placeToGo;
    Outer outer;
    DaySupport daySupport;
    State stateMorning;
    State stateNoon;
    State stateNight;
    TimeInfo timeWakeUp;
    TimeInfo timeToWork;
    TimeInfo timeToReturn;
    TimeInfo timeBathing;
    TimeInfo timeToBed;
    Meal breakfast;
    Meal lunch;
    Meal dinner;
    Medicine medicineMorning1;
    Medicine medicineMorning2;
    Medicine medicineNoon1;
    Medicine medicineNoon2;
    Medicine medicineNight1;
    Medicine medicineNight2;
    Measurement bodyTempMorning;
    Measurement bodyTempNoon;
    Measurement bodyTempNight;
    Measurement pressureHigh;
    Measurement pressureLow;
    Measurement pulse;
    Measurement oxygenConcentration;
    Long createdBy;
    LocalDateTime updatedAt;
    Long createdByMorning;
    Long createdByNoon;
    Long createdByNight;
    String createdNameMorning;
    String createdNameNoon;
    String createdNameNight;
}
