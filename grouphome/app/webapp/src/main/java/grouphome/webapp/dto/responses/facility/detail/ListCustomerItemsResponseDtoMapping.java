package grouphome.webapp.dto.responses.facility.detail;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ListCustomerItemsResponseDtoMapping {
    Long customerId;
    String yyyymmdd;
    String roomNo;
    String customerName;
    String placeToGo;
    String outerInfo;
    String daySupport;
    String stateMorning;
    String stateNoon;
    String stateNight;
    String timeWakeUp;
    String timeToWork;
    String timeToReturn;
    String timeBathing;
    String timeToBed;
    String breakfast;
    String lunch;
    String dinner;
    String medicineMorning1;
    String medicineMorning2;
    String medicineNoon1;
    String medicineNoon2;
    String medicineNight1;
    String medicineNight2;
    String bodyTempMorning;
    String bodyTempNoon;
    String bodyTempNight;
    String pressureHigh;
    String pressureLow;
    String pulse;
    String oxygenConcentration;
    Long createdBy;
    LocalDateTime updatedAt;
    Long createdByMorning;
    Long createdByNoon;
    Long createdByNight;
    String createdNameMorning;
    String createdNameNoon;
    String createdNameNight;
}
