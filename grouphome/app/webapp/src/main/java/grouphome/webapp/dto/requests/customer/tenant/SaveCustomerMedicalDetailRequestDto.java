package grouphome.webapp.dto.requests.customer.tenant;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveCustomerMedicalDetailRequestDto {
    private Long id;

    @NotNull(message = "医療保険基本IDは必須です。")
    private Long medicalId;

    @NotNull(message = "customerIdはnullではいけません")
    private Long customerId;

    @Min(value = 1, message = "subは1以上である必要があります。")
    @Max(value = 255, message = "subは255以下である必要があります。")
    private Integer sub;

    @NotNull(message = "利用サービス名は必須です。")
    @NotEmpty(message = "利用サービス名は空ではいけません。")
    @Size(max = 128, message = "利用サービス名は128文字以内で入力してください。")
    private String serviceName;

    @NotNull(message = "利用機関名は必須です。")
    @NotEmpty(message = "利用機関名は空ではいけません。")
    @Size(max = 128, message = "利用機関名は128文字以内で入力してください。")
    private String institution;

    @NotNull(message = "ステータスは必須です。")
    @Min(value = 1, message = "statusは1以上である必要があります。")
    @Max(value = 255, message = "statusは255以下である必要があります。")
    private Integer status;

    @NotNull(message = "利用頻度は必須です。")
    @Min(value = 1, message = "paceは1以上である必要があります。")
    @Max(value = 255, message = "paceは255以下である必要があります。")
    private Integer pace;

    private LocalDateTime updatedAt;
}
