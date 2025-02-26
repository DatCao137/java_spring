package grouphome.webapp.entity.mapping;

import grouphome.webapp.dto.responses.office.staff.ListResponseDto;
import jakarta.persistence.Entity;
import jakarta.persistence.SqlResultSetMapping;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.ColumnResult;

@Entity
@SqlResultSetMapping(
    name = "StaffListResponseDtoMapping",
    classes = @ConstructorResult(
        targetClass = ListResponseDto.class,
        columns = {
            @ColumnResult(name = "id", type = Long.class),
            @ColumnResult(name = "employeeNo", type = String.class),
            @ColumnResult(name = "name", type = String.class),
            @ColumnResult(name = "enrollmentStatus", type = String.class),
            @ColumnResult(name = "occupation", type = String.class),
            @ColumnResult(name = "branchNames", type = String.class),
            @ColumnResult(name = "homeNames", type = String.class),
            @ColumnResult(name = "unitNames", type = String.class),
            @ColumnResult(name = "employeeType", type = String.class),
            @ColumnResult(name = "enrollmentPeriod", type = String.class),
            @ColumnResult(name = "hasQualification", type = String.class)
        }
    )
)
public class StaffListResponseDtoMappingEntity extends Base {

}