package grouphome.webapp.dto.requests.customer.tenant;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveCustomerCareDetailRequestDto {
    private Long id;

    @NotNull(message = "介護保険基本IDは必須項目です。")
    private Long careId;

    @Min(value = 0, message = "枝番は0以上でなければなりません。")
    @Max(value = 255, message = "枝番は255以下でなければなりません。")
    private Integer sub;

    @NotNull(message = "利用サービス名は必須項目です。")
    @NotEmpty(message = "利用サービス名は空ではいけません。")
    @Size(max = 128, message = "利用サービス名は最大128文字までです。")
    private String serviceName;

    @NotNull(message = "利用事業者は必須項目です。")
    @NotEmpty(message = "利用事業者は空ではいけません。")
    @Size(max = 128, message = "利用事業者は最大128文字までです。")
    private String useCompany;

    @NotNull(message = "ステータスは必須項目です。")
    @Min(value = 0, message = "ステータスは0以上でなければなりません。")
    @Max(value = 255, message = "ステータスは255以下でなければなりません。")
    private Integer status;

    @NotNull(message = "利用頻度は必須項目です。")
    @Min(value = 0, message = "利用頻度は0以上でなければなりません。")
    @Max(value = 255, message = "利用頻度は255以下でなければなりません。")
    private Integer pace;

    private LocalDateTime updatedAt;
}
