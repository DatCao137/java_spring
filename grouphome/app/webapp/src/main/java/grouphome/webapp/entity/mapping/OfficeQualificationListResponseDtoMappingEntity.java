package grouphome.webapp.entity.mapping;

import jakarta.persistence.ColumnResult;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.Entity;
import jakarta.persistence.SqlResultSetMapping;

import java.time.LocalDateTime;

@Entity
@SqlResultSetMapping(
    name = "OfficeQualificationListResponseDtoMapping",
    classes = @ConstructorResult(
        targetClass = grouphome.webapp.dto.responses.office.qualification.OfficeQualificationListResponseDto.class,
        columns = {
            @ColumnResult(name = "id", type = Long.class),
            @ColumnResult(name = "type", type = String.class),
            @ColumnResult(name = "name", type = String.class),
            @ColumnResult(name = "limitJson", type = String.class),
        }
    )
)
public class OfficeQualificationListResponseDtoMappingEntity extends Base {

}