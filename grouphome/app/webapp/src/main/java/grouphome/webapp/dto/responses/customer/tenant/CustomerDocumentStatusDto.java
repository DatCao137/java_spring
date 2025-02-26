package grouphome.webapp.dto.responses.customer.tenant;

import grouphome.webapp.dto.requests.customer.tenant.SaveCustomerDocumentStatusRequestDto.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDocumentStatusDto {
    private Long id;
    private Long customerId;
    private DocumentStatusItem tour;
    private DocumentStatusItem assessment;
    private DocumentStatusItem trial;
    private DocumentStatusItem trialImportantExperience;
    private DocumentStatusItem usageContract;
    private DocumentStatusItem importantExperience;
    private DocumentStatusItem plan;
    private List<Monitoring> monitoring;
    private LocalDateTime updatedAt;
}
