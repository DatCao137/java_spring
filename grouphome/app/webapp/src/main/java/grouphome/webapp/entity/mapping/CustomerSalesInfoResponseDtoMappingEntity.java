package grouphome.webapp.entity.mapping;

import grouphome.webapp.dto.responses.customer.inquiry.CustomerSalesInfoResponseDto;
import grouphome.webapp.entity.CustomerSalesEntity;
import jakarta.persistence.ColumnResult;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.Entity;
import jakarta.persistence.SqlResultSetMapping;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@SqlResultSetMapping(
    name = "CustomerSalesInfoResponseDtoMapping",
    classes = @ConstructorResult(
        targetClass = CustomerSalesInfoResponseDto.class,
        columns = {
            @ColumnResult(name = "id", type = Long.class),
            @ColumnResult(name = "inquiryInfoId", type = Long.class),
            @ColumnResult(name = "firstInquiryDate", type = LocalDate.class),
            @ColumnResult(name = "firstInquiryHow", type = Integer.class),
            @ColumnResult(name = "firstInquiryHowName", type = String.class),
            @ColumnResult(name = "contact", type = String.class),
            @ColumnResult(name = "decision", type = String.class),
            @ColumnResult(name = "updatedAt", type = LocalDateTime.class),
        }
    )
)
public class CustomerSalesInfoResponseDtoMappingEntity extends Base {

}