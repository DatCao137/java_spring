package grouphome.webapp.entity.mapping;

import grouphome.webapp.dto.responses.office.branch.FacilityDailyListResponseDto;
import jakarta.persistence.ColumnResult;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.Entity;
import jakarta.persistence.SqlResultSetMapping;

import java.time.LocalDateTime;

@Entity
@SqlResultSetMapping(
    name = "FacilityDailyListResponseDtoMapping",
    classes = @ConstructorResult(
        targetClass = FacilityDailyListResponseDto.class,
        columns = {
            @ColumnResult(name = "branchId", type = Long.class),
            @ColumnResult(name = "branchName", type = String.class),
            @ColumnResult(name = "homeId", type = Long.class),
            @ColumnResult(name = "homeName", type = String.class),
            @ColumnResult(name = "addrId", type = Long.class),
            @ColumnResult(name = "prefName", type = String.class),
            @ColumnResult(name = "postNo", type = String.class),
            @ColumnResult(name = "prefId", type = Long.class),
            @ColumnResult(name = "city", type = String.class),
            @ColumnResult(name = "town", type = String.class),
            @ColumnResult(name = "tel", type = String.class),
            @ColumnResult(name = "fax", type = String.class),
            @ColumnResult(name = "updatedAt", type = LocalDateTime.class)
        }
    )
)
public class FacilityDailyListResponseDtoMappingEntity extends Base {

}