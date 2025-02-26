package grouphome.webapp.dto.responses.customer.tenant;

import grouphome.webapp.dto.requests.customer.tenant.SaveCustomerMonitoringRequestDto.MonitoringInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerMonitoringDto {
    Long id;
    Long customerId;
    String yyyymm;
    MonitoringInfo info;
    LocalDateTime updatedAt;
}
