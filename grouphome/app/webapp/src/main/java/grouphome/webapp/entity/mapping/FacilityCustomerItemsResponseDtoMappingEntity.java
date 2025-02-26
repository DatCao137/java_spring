package grouphome.webapp.entity.mapping;

import grouphome.webapp.dto.responses.facility.detail.ListCustomerItemsResponseDtoMapping;
import jakarta.persistence.ColumnResult;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.Entity;
import jakarta.persistence.SqlResultSetMapping;

import java.time.LocalDateTime;

@Entity
@SqlResultSetMapping(
        name = "FacilityCustomerItemsResponseDtoMapping",
        classes = @ConstructorResult(
                targetClass = ListCustomerItemsResponseDtoMapping.class,
                columns = {
                        @ColumnResult(name = "customerId", type = Long.class),
                        @ColumnResult(name= "yyyymmdd", type = String.class),
                        @ColumnResult(name = "roomNo", type = String.class),
                        @ColumnResult(name = "customerName", type = String.class),
                        @ColumnResult(name = "placeToGo", type = String.class),
                        @ColumnResult(name = "outerInfo", type = String.class),
                        @ColumnResult(name = "daySupport", type = String.class),
                        @ColumnResult(name = "stateMorning", type = String.class),
                        @ColumnResult(name = "stateNoon", type = String.class),
                        @ColumnResult(name = "stateNight", type = String.class),
                        @ColumnResult(name = "timeWakeUp", type = String.class),
                        @ColumnResult(name = "timeToWork", type = String.class),
                        @ColumnResult(name = "timeToReturn", type = String.class),
                        @ColumnResult(name = "timeBathing", type = String.class),
                        @ColumnResult(name = "timeToBed", type = String.class),
                        @ColumnResult(name = "breakfast", type = String.class),
                        @ColumnResult(name = "lunch", type = String.class),
                        @ColumnResult(name = "dinner", type = String.class),
                        @ColumnResult(name = "medicineMorning1", type = String.class),
                        @ColumnResult(name = "medicineMorning2", type = String.class),
                        @ColumnResult(name = "medicineNoon1", type = String.class),
                        @ColumnResult(name = "medicineNoon2", type = String.class),
                        @ColumnResult(name = "medicineNight1", type = String.class),
                        @ColumnResult(name = "medicineNight2", type = String.class),
                        @ColumnResult(name = "bodyTempMorning", type = String.class),
                        @ColumnResult(name = "bodyTempNoon", type = String.class),
                        @ColumnResult(name = "bodyTempNight", type = String.class),
                        @ColumnResult(name = "pressureHigh", type = String.class),
                        @ColumnResult(name = "pressureLow", type = String.class),
                        @ColumnResult(name = "pulse", type = String.class),
                        @ColumnResult(name = "oxygenConcentration", type = String.class),
                        @ColumnResult(name = "updatedAt", type = LocalDateTime.class),
                        @ColumnResult(name = "createdBy", type = Long.class),
                        @ColumnResult(name = "createdByMorning", type = Long.class),
                        @ColumnResult(name = "createdByNoon", type = Long.class),
                        @ColumnResult(name = "createdByNight", type = Long.class),
                        @ColumnResult(name = "createdNameMorning", type = String.class),
                        @ColumnResult(name = "createdNameNoon", type = String.class),
                        @ColumnResult(name = "createdNameNight", type = String.class)
                }
        )
)
public class FacilityCustomerItemsResponseDtoMappingEntity extends Base {

}
