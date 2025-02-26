package grouphome.webapp.entity.mapping;

import grouphome.webapp.dto.responses.customer.inquiry.SalesFollowListResponseDto;
import jakarta.persistence.ColumnResult;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.Entity;
import jakarta.persistence.SqlResultSetMapping;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@SqlResultSetMapping(
    name = "CustomerSalesFollowListResponseDtoMapping",
    classes = @ConstructorResult(
        targetClass = SalesFollowListResponseDto.class,
        columns = {
            @ColumnResult(name = "id", type = Long.class),
            @ColumnResult(name = "salesInfoId", type = Long.class),
            @ColumnResult(name = "staffId", type = Long.class),
            @ColumnResult(name = "step", type = Integer.class),
            @ColumnResult(name = "stepName", type = String.class),
            @ColumnResult(name = "staffName", type = String.class),
            @ColumnResult(name = "followDate", type = LocalDate.class),
            @ColumnResult(name = "contents", type = String.class),
            @ColumnResult(name = "updatedAt", type = LocalDateTime.class),
        }
    )
)
public class CustomerSalesFollowListResponseDtoMappingEntity extends Base {

}