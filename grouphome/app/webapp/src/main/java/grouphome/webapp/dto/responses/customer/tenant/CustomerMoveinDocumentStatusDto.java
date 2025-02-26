package grouphome.webapp.dto.responses.customer.tenant;

import grouphome.webapp.dto.requests.customer.tenant.SaveCustomerMoveinDocumentStatusRequestDto.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerMoveinDocumentStatusDto {
    private Long id;
    private Long customerId;
    private BasicDocumentDto basic;
    private Plan1stDocumentDto plan1st;
    private String memo;
    private LocalDateTime updatedAt;
}
