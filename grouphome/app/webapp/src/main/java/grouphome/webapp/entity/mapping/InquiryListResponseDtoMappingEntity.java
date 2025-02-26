package grouphome.webapp.entity.mapping;

import grouphome.webapp.dto.responses.customer.inquiry.ListResponseDto;
import jakarta.persistence.Entity;
import jakarta.persistence.SqlResultSetMapping;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.ColumnResult;
import java.time.LocalDateTime;

@Entity
@SqlResultSetMapping(
    name = "InquiryListResponseDtoMapping",
    classes = @ConstructorResult(
        targetClass = ListResponseDto.class,
        columns = {
            @ColumnResult(name = "id", type = Long.class),
            @ColumnResult(name = "name", type = String.class),
            @ColumnResult(name = "gana", type = String.class),
            @ColumnResult(name = "sex", type = String.class),
            @ColumnResult(name = "age", type = String.class),
            @ColumnResult(name = "sexName", type = String.class),
            @ColumnResult(name = "inquirySrcName", type = String.class),
            @ColumnResult(name = "inquirySrcStaff", type = String.class),
            @ColumnResult(name = "inquirySrcRoute", type = String.class),
            @ColumnResult(name = "inquirySrcRouteName", type = String.class),
            @ColumnResult(name = "inquirySrcPhone", type = String.class),
            @ColumnResult(name = "inquirySrcLink", type = String.class),
            @ColumnResult(name = "inquirySrcLinkName", type = String.class),
            @ColumnResult(name = "status", type = String.class),
            @ColumnResult(name = "statusName", type = String.class),
            @ColumnResult(name = "nextAction", type = String.class),
            @ColumnResult(name = "updatedAt", type = LocalDateTime.class)
        }
    )
)
public class InquiryListResponseDtoMappingEntity extends Base {

}


