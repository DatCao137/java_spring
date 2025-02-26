package grouphome.webapp.entity.mapping;

import grouphome.webapp.dto.responses.customer.inquiry.ProfileInfoResponseDto;
import jakarta.persistence.Entity;
import jakarta.persistence.SqlResultSetMapping;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.ColumnResult;

@Entity
@SqlResultSetMapping(
    name = "InquiryProfileResponseDtoMappingEntity",
    classes = @ConstructorResult(
        targetClass = ProfileInfoResponseDto.class,
        columns = {
            @ColumnResult(name = "id", type = Long.class),
            @ColumnResult(name = "inquiryInfoId", type = Long.class),

            @ColumnResult(name = "introducerName", type = String.class),
            @ColumnResult(name = "introducerType", type = String.class),
            @ColumnResult(name = "introducerAddr", type = String.class),

            @ColumnResult(name = "disabledType", type = String.class),
            @ColumnResult(name = "disabledClass", type = String.class),

            @ColumnResult(name = "pocketBookType", type = Long.class),
            @ColumnResult(name = "pocketBookTypeName", type = String.class),
            @ColumnResult(name = "pocketBookGrade", type = String.class),
            @ColumnResult(name = "pocketBookWheelChair", type = Long.class),
            @ColumnResult(name = "pocketBookWheelChairName", type = String.class),

            @ColumnResult(name = "serviceDays", type = String.class),
            @ColumnResult(name = "serviceName", type = String.class),
            @ColumnResult(name = "serviceAddr", type = String.class),
            @ColumnResult(name = "serviceVisit", type = String.class),
            @ColumnResult(name = "serviceEtc", type = String.class),
            @ColumnResult(name = "serviceRecipient", type = String.class),

            @ColumnResult(name = "residenceType", type = String.class),
            @ColumnResult(name = "residenceRemark", type = String.class),

            @ColumnResult(name = "updatedAt", type = String.class)

        }
    )
)
public class InquiryProfileResponseDtoMappingEntity extends Base {

}

