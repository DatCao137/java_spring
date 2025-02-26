package grouphome.webapp.dto.requests.office;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import grouphome.webapp.dto.requests.blc_common.AddressDto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OfficeRoomSaveRequestDto extends AddressDto {
    private Long id;

    @NotNull
    @Min(value = 0, message = "事業所情報IDは0以上である必要があります")
    @Digits(message = "事業所情報IDは0から9までの数字のみを含む必要があります", integer = 9, fraction = 0)
    private Long unitId;

    /**
     * 事業所名
     */
    @NotNull
    @Size(max = 128, message = "名前は255文字以下でなければなりません。")
    private String name;

    @Valid
    private Content contents;

    private LocalDateTime updatedAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Content {
        @Valid
        private Basic basic;

        @Valid
        private String remark;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Basic {
        @Min(value = 1, message = "feeは1から999999の間である必要があります")
        @Max(value = 999999, message = "feeは1から999999の間である必要があります")
        private Integer fee;
    }
}