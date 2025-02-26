package grouphome.webapp.entity.mapping;

import grouphome.webapp.dto.responses.customer.request.DetailResponseDto;
import jakarta.persistence.Entity;
import jakarta.persistence.SqlResultSetMapping;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.ColumnResult;

import java.time.LocalDateTime;

@Entity
@SqlResultSetMapping(
        name = "RequestDetailResponseDtoMapping",
        classes = @ConstructorResult(
                targetClass = DetailResponseDto.class,
                columns = {
                        @ColumnResult(name = "id", type = Long.class),
                        @ColumnResult(name = "requestInfoId", type = Long.class),
                        @ColumnResult(name = "requestType", type = String.class),
                        @ColumnResult(name = "contents", type = String.class),
                        @ColumnResult(name = "infoUpdatedAt", type = LocalDateTime.class),
                        @ColumnResult(name = "detailUpdatedAt", type = LocalDateTime.class),
                }
        )
)
public class RequestDetailResponseDtoMappingEntity extends Base {

}