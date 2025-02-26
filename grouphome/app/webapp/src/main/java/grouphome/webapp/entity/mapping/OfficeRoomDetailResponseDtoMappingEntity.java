package grouphome.webapp.entity.mapping;

import grouphome.webapp.dto.responses.office.room.OfficeRoomDetailResponseDto;
import jakarta.persistence.ColumnResult;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.Entity;
import jakarta.persistence.SqlResultSetMapping;

import java.time.LocalDateTime;

@Entity
@SqlResultSetMapping(
    name = "OfficeRoomDetailResponseDtoMapping",
    classes = @ConstructorResult(
        targetClass = OfficeRoomDetailResponseDto.class,
        columns = {
            @ColumnResult(name = "id", type = Long.class),
            @ColumnResult(name = "unitId", type = Long.class),
            @ColumnResult(name = "name", type = String.class),
            @ColumnResult(name = "contents", type = String.class),
            @ColumnResult(name = "updatedAt", type = LocalDateTime.class),
        }
    )
)
public class OfficeRoomDetailResponseDtoMappingEntity extends Base {

}