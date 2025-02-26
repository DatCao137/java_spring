package grouphome.webapp.dto.requests.customer.tenant;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveCustomerBillingDetailRequestDto {

    @Min(value = 1, message = "IDは1以上である必要があります")
    private Long id;

    @Min(value = 1, message = "CustomerIDは1以上である必要があります")
    private Long billingId;

    private String yyyymm;

    private LocalDate nationalAt;

    private LocalDate selfGoverningAt;

    private LocalDate otherAt;

    private LocalDate issueAt;

    private String memo;

    private LocalDateTime updatedAt;
}
