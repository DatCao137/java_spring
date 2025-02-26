package grouphome.webapp.entity.mapping;

import grouphome.webapp.dto.responses.facility.DailyRecorderBasicInfoResponseDto;
import jakarta.persistence.Entity;
import jakarta.persistence.SqlResultSetMapping;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.ColumnResult;

@Entity
@SqlResultSetMapping(
    name = "DailyRecorderBasicInfoMapping",
    classes = @ConstructorResult(
        targetClass = DailyRecorderBasicInfoResponseDto.class,
        columns = {
            // The order of the columns must match the constructor parameters
            @ColumnResult(name = "menuBreakfast", type = String.class),
            @ColumnResult(name = "menuLunch", type = String.class),
            @ColumnResult(name = "menuDinner", type = String.class),
            @ColumnResult(name = "nightPatrolsJson", type = String.class),
            @ColumnResult(name = "shiftMorningJson", type = String.class),
            @ColumnResult(name = "shiftAfternoonJson", type = String.class),
            @ColumnResult(name = "shiftEveningJson", type = String.class),
            @ColumnResult(name = "shiftNightJson", type = String.class),
            @ColumnResult(name = "shiftPatrolJson", type = String.class),
            @ColumnResult(name = "shiftStaffJson", type = String.class),
            @ColumnResult(name = "confirmCalendarJson", type = String.class),
            @ColumnResult(name = "confirmOrderJson", type = String.class),
            @ColumnResult(name = "confirmTrialJson", type = String.class),
            @ColumnResult(name = "confirmPreviousDiaryJson", type = String.class),
            @ColumnResult(name = "remark", type = String.class)
        }
    )
)
public class DailyRecorderBasicInfoMappingEntity extends Base {
}
