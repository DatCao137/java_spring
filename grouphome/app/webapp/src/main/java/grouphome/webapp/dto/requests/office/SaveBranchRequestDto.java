package grouphome.webapp.dto.requests.office;

import com.fasterxml.jackson.annotation.JsonProperty;
import grouphome.webapp.dto.requests.blc_common.AddressDto;
import grouphome.webapp.validator.ValidJson;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveBranchRequestDto extends AddressDto {
    @Min(value = 0, message = "事業所情報IDは0以上である必要があります")
    @Digits(message = "事業所情報IDは0から9までの数字のみを含む必要があります", integer = 9, fraction = 0)
    private Long branchId;

    /**
     * 事業所番号 (Office Number)
     */
    @Min(value = 0, message = "事業所番号は0以上である必要があります")
    @Digits(message = "事業所番号は0から9までの数字のみを含む必要があります", integer = 9, fraction = 0)
    private Long no;

    /**
     * 事業所名
     */
    private String name;

    @Valid
    private BranchContent contents;

    private String memo;

    @Pattern(regexp = "^$|^\\d{3}-\\d{4}$", message = "郵便番号は3桁-4桁の形式で入力してください")
    private String postNo;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.S")
    private LocalDateTime updatedAtBranch;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BranchContent {
        @Valid
        private Basic basic;

        @Valid
        private OfficeNumber officeNumber;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Basic {
        @Min(value = 0, message = "groupHomeTypeIdは0以上である必要があります")
        private Integer groupHomeTypeId;

        @Min(value = 0, message = "classDivisionIdは0以上である必要があります")
        private Integer classDivisionId;

        @Min(value = 1, message = "feeは1から999999の間である必要があります")
        @Max(value = 999999, message = "feeは1から999999の間である必要があります")
        private Integer fee;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OfficeNumber {
        @JsonProperty("GH")
        @Max(value = 9999999999L, message = "GH番号は10桁までである必要があります")
        private Long GH;

        @JsonProperty("SS")
        @Max(value = 9999999999L, message = "SS番号は10桁までである必要があります")
        private Long SS;

        @Max(value = 9999999999L, message = "タイプAの事業所番号は10桁までである必要があります")
        private Long typeA;

        @Max(value = 9999999999L, message = "タイプBの事業所番号は10桁までである必要があります")
        private Long typeB;
    }
}