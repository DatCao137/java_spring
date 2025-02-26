package grouphome.webapp.entity.mapping;

import grouphome.webapp.dto.responses.customer.inquiry.InquiryDetailResponseDto;
import jakarta.persistence.Entity;
import jakarta.persistence.SqlResultSetMapping;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.ColumnResult;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@SqlResultSetMapping(
    name = "InquiryDetailsResponseDtoMapping",
    classes = @ConstructorResult(
        targetClass = InquiryDetailResponseDto.class,
        columns = {
            @ColumnResult(name = "id", type = Long.class),
            @ColumnResult(name = "inquiryInfoId", type = Long.class),
            @ColumnResult(name = "status", type = Integer.class),
            @ColumnResult(name = "statusName", type = String.class),
            @ColumnResult(name = "homeId", type = Long.class),
            @ColumnResult(name = "homeName", type = String.class),
            @ColumnResult(name = "ghData", type = String.class),
            @ColumnResult(name = "date", type = LocalDate.class),
            @ColumnResult(name = "breakdownSelf", type = String.class),
            @ColumnResult(name = "breakdownFamily", type = String.class),
            @ColumnResult(name = "breakdownCounselor", type = String.class),
            @ColumnResult(name = "breakdownSupport", type = String.class),
            @ColumnResult(name = "breakdownThirdParty", type = String.class),
            @ColumnResult(name = "recordTime", type = String.class),
            @ColumnResult(name = "recordVisitTime", type = String.class),
            @ColumnResult(name = "recordFreeTrial", type = LocalDate.class),
            @ColumnResult(name = "recordPaidTrial", type = LocalDate.class),
            @ColumnResult(name = "recordSsCompletion", type = LocalDate.class),
            @ColumnResult(name = "recordContractDate", type = String.class),
            @ColumnResult(name = "recordPlanStatus", type = String.class),
            @ColumnResult(name = "recordDlanStatusName", type = String.class),
            @ColumnResult(name = "updatedAt", type = LocalDateTime.class)
        }
    )
)
public class InquiryDetailsResponseDtoMappingEntity extends Base {

}

