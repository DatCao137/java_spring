package grouphome.webapp.entity.mapping;

import grouphome.webapp.dto.responses.office.branch.CalcListResponseDto;
import jakarta.persistence.ColumnResult;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.Entity;
import jakarta.persistence.SqlResultSetMapping;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@SqlResultSetMapping(
    name = "OfficeCalcListResponseDtoMapping",
    classes = @ConstructorResult(
        targetClass = CalcListResponseDto.class,
        columns = {
            @ColumnResult(name = "id", type = Long.class),
            @ColumnResult(name = "branchId", type = Long.class),
            @ColumnResult(name = "name", type = String.class),
            @ColumnResult(name = "classification", type = String.class),
            @ColumnResult(name = "startDate", type = LocalDate.class),
            @ColumnResult(name = "notificationDate", type = LocalDate.class),
            @ColumnResult(name = "validStartDate", type = LocalDate.class),
            @ColumnResult(name = "validEndDate", type = LocalDate.class),
            @ColumnResult(name = "remark", type = String.class),
        }
    )
)
public class OfficeCalcListResponseDtoMappingEntity extends Base {

}