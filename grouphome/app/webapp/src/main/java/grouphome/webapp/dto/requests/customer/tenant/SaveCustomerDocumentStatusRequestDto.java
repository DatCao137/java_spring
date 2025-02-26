package grouphome.webapp.dto.requests.customer.tenant;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveCustomerDocumentStatusRequestDto {
    private Long id;
    
    @NotNull(message = "顧客IDは必須項目です。")
    private Long customerId;

    @Valid
    private DocumentStatusItem tour;

    @Valid
    private DocumentStatusItem assessment;

    @Valid
    private DocumentStatusItem trial;

    @Valid
    private DocumentStatusItem trialImportantExperience;

    @Valid
    private DocumentStatusItem usageContract;

    @Valid
    private DocumentStatusItem importantExperience;

    @Valid
    private DocumentStatusItem plan;

    @Valid
    private List<Monitoring> monitoring;

    private LocalDateTime updatedAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DocumentStatusItem {
        private Boolean apply;
        private Integer fileId;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Monitoring {
        @Min(value = 0, message = "IDは0以上の値でなければなりません。")
        private Long id;
        private Boolean apply;
        private Long fileId;
    }
}
