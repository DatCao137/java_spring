package grouphome.webapp.entity.mapping;

import grouphome.webapp.dto.responses.office.doc.ListResponseDto;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.SqlResultSetMapping;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.ColumnResult;

@Entity
@SqlResultSetMapping(
    name = "ListResponseDtoMapping",
    classes = @ConstructorResult(
        targetClass = ListResponseDto.class,
        columns = {
            @ColumnResult(name = "id", type = Integer.class),
            @ColumnResult(name = "docId", type = Integer.class),
            @ColumnResult(name = "docName", type = String.class),
            @ColumnResult(name = "fileName", type = String.class),
            @ColumnResult(name = "ext", type = String.class),
            @ColumnResult(name = "dataFile", type = byte[].class),
            @ColumnResult(name = "comment", type = String.class),
            @ColumnResult(name = "created_at", type = String.class),
            @ColumnResult(name = "updated_at", type = String.class),

        }
    )
)
public class DocManageListResponseDtoMappingEntity extends Base {

}