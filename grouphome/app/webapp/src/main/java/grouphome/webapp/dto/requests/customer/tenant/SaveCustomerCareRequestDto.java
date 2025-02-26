package grouphome.webapp.dto.requests.customer.tenant;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveCustomerCareRequestDto {
    private Long id;

    @NotNull(message = "顧客IDは必須項目です。")
    private Long customerId;

    @NotNull(message = "介護保険被保険者証(番号)は必須項目です。")
    @NotEmpty(message = "介護保険被保険者証(番号)は空ではいけません。")
    @Size(max = 10, message = "介護保険被保険者証(番号)は最大10文字までです。")
    private String careNo;

    @NotNull(message = "要介護区分は必須項目です。")
    @Min(value = 0, message = "要介護区分は0以上でなければなりません。")
    @Max(value = 255, message = "要介護区分は255以下でなければなりません。")
    private Integer careTypeId;

    @Min(value = 0, message = "支給限度額は0以上でなければなりません。")
    private Long limit;

    private LocalDateTime updatedAt;
}
