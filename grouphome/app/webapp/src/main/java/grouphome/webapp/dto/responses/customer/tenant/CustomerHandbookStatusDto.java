package grouphome.webapp.dto.responses.customer.tenant;

import grouphome.webapp.dto.requests.customer.tenant.SaveCustomerHandbookStatusRequestDto.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerHandbookStatusDto {
    private Long id;
    private Long customerId;
    private Recipient recipient;
    private Disabled disabled;
    private Limit limit;
    private String visitingPlace;
    private String service;
    private String handbookType;
    private LocalDateTime updatedAt;
}
