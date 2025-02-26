package grouphome.webapp.entity.mapping;

import grouphome.webapp.dto.responses.office.room.OfficeRoomMapResponseDto;
import jakarta.persistence.ColumnResult;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.SqlResultSetMapping;

@Entity
@SqlResultSetMapping(
    name = "OfficeRoomMapResponseDtoMapping",
    classes = @ConstructorResult(
        targetClass = OfficeRoomMapResponseDto.class,
        columns = {
            @ColumnResult(name = "roomId", type = Long.class),
            @ColumnResult(name = "roomName", type = String.class),
            @ColumnResult(name = "unitId", type = Long.class),
            @ColumnResult(name = "unitName", type = String.class),
            @ColumnResult(name = "period", type = String.class),
            @ColumnResult(name = "total", type = Long.class),
        }
    )
)
public class OfficeRoomMapResponseDtoMappingEntity {
    @Id
    private Long roomId;
}