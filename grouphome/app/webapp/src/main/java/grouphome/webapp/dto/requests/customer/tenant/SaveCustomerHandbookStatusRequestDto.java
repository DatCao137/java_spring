package grouphome.webapp.dto.requests.customer.tenant;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveCustomerHandbookStatusRequestDto {

    private Long id;
    /**
     * 顧客ID
     */
    @NotNull(message = "顧客IDは必須項目です。")
    private Long customerId;

    /**
     * 受給者情報
     */
    @Valid
    private Recipient recipient;

    /**
     * 障害者情報
     */
    @Valid
    private Disabled disabled;

    /**
     * 上限情報
     */
    @Valid
    private Limit limit;

    /**
     * 通所先
     */
    @Size(max = 128, message = "通所先は最大128文字までです。")
    private String visitingPlace;

    /**
     * サービス
     */
    @Size(max = 128, message = "サービスは最大128文字までです。")
    private String service;

    /**
     * 障がい者手帳種類
     */
    @Size(max = 10, message = "障がい者手帳種類は最大10文字までです。")
    private String handbookType;

    private LocalDateTime updatedAt;

    /**
     * 内部クラス: Recipient
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Recipient {
        @Size(max = 255, message = "受給者番号は最大255文字までです。")
        private String no;

        private Boolean certificateGH;

        @Size(max = 255, message = "支給決定期限は最大255文字までです。")
        private String limit;
    }

    /**
     * 内部クラス: Disabled
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Disabled {
        @Min(value = 0, message = "障害者支援区分は0以上でなければなりません。")
        @Max(value = 255, message = "障害者支援区分は255以下でなければなりません。")
        private Integer category;

        @Size(max = 255, message = "認定期限は最大255文字までです。")
        private String limit;
    }

    /**
     * 内部クラス: Limit
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Limit {
        @Min(value = 0, message = "上限額管理は0以上でなければなりません。")
        private Long amount;

        @Size(max = 255, message = "上限額管理期限は最大255文字までです。")
        private String limit;
    }
}
