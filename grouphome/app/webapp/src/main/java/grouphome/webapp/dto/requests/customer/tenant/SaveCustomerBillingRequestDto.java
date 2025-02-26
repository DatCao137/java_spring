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
public class SaveCustomerBillingRequestDto {
    @Min(value = 1, message = "IDは1以上である必要があります")
    private Long id;

    @Min(value = 1, message = "CustomerIDは1以上である必要があります")
    private Long customerId;
  
    private LocalDate movein1stAt;

    private LocalDate originalRequestAt;

    private LocalDate rpInputAt;

    private LocalDate transfer1stAt;

    private String remark;

    private LocalDateTime updatedAt;
}