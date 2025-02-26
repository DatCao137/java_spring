package grouphome.webapp.dto.requests.office;

import grouphome.webapp.dto.requests.blc_common.AddressDto;
import grouphome.webapp.dto.requests.office.SaveBranchRequestDto.BranchContent;
import grouphome.webapp.validator.ValidJson;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.Valid;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveUnitRequestDto extends AddressDto {
    @Min(value = 0, message = "Unit ID must be greater than or equal to 0")
    @Digits(message = "Unit ID must contain only digits from 0 to 9", integer = 9, fraction = 0)
    private Long unitId;

    /**
     * 所属ホーム (Home ID)
     */
    @Min(value = 0, message = "Home ID must be greater than or equal to 0")
    @Digits(message = "Home ID must contain only digits from 0 to 9", integer = 9, fraction = 0)
    private Long homeId;

    /**
     * 共同生活住居名 (Name of the Shared Unit)
     */
    @NotBlank(message = "Name cannot be blank")
    @Size(max = 128, message = "Name length should not exceed 128 characters")
    private String name;

    /**
     * メールアドレス (Email Address)
     */
    @Size(max = 255, message = "Mail length should not exceed 255 characters")
    @Email(message = "正しいメールアドレス形式で入力してください")
    private String mail;

    @Valid
    private UnitContent contents;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.S")
    private LocalDateTime updatedAtUnit;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UnitContent {
        @Valid
        private Basic basic;

        @Valid
        private Features features;

        @Valid
        private Services services;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Basic {
        private String startDate;

        @Min(value = 1, message = "1～999の整数を入力してください")
        @Max(value = 999, message = "1～999の整数を入力してください")
        private Long capacity;

        @Size(max = 255, message = "255文字以内で入力してください")
        private String concept;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Features {
        private Boolean system;

        private Boolean barrierFree;

        private Boolean menOnly;

        private Boolean womenOnly;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Services {
        @JsonProperty("GH")
        private Boolean GH;

        @JsonProperty("SS")
        private Boolean SS;
    }
}

