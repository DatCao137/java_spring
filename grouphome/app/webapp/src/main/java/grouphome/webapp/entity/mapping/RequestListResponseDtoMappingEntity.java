package grouphome.webapp.entity.mapping;

import grouphome.webapp.dto.responses.customer.request.ListResponseDto;
import jakarta.persistence.Entity;
import jakarta.persistence.SqlResultSetMapping;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.ColumnResult;

@Entity
@SqlResultSetMapping(
    name = "RequestListResponseDtoMapping",
    classes = @ConstructorResult(
        targetClass = ListResponseDto.class,
        columns = {
            @ColumnResult(name = "id", type = Long.class),
            @ColumnResult(name = "name", type = String.class),
            @ColumnResult(name = "requestDate", type = String.class),
            @ColumnResult(name = "requestType", type = String.class),
            @ColumnResult(name = "requestItem", type = String.class),
            @ColumnResult(name = "customerId", type = Long.class),
            @ColumnResult(name = "homeId", type = Long.class),
            @ColumnResult(name = "homeName", type = String.class),
            @ColumnResult(name = "desiredDate", type = String.class),
            @ColumnResult(name = "representative", type = String.class),
            @ColumnResult(name = "remark", type = String.class),
            @ColumnResult(name = "requestInfoDetailId", type = Long.class),
            @ColumnResult(name = "updatedAtRequest", type = String.class),
        }
    )
)
public class RequestListResponseDtoMappingEntity extends Base {

}