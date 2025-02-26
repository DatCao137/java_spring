package grouphome.webapp.dto.requests.customer.inquiry;

import grouphome.webapp.validator.ValidJson;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.Valid;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InquirySaveRequestDto {

    private Long id;

    @NotBlank(message = "氏名は空白にできません。")
    @Size(max = 128, message = "氏名は128文字を超えてはいけません。")
    private String name;

    @Size(max = 128, message = "ふりがなは128文字を超えてはいけません。")
    private String gana;

    private Integer sex;

    private Integer age;

    @NotNull(message = "ステータスはnullにできません。")
    private Integer status;

    @Size(max = 256, message = "ネクストアクションは256文字を超えてはいけません。")
    private String nextAction;

    private LocalDateTime updatedAt;

    @Valid
    private InquirySrc inquirySrc;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class InquirySrc {
        private Integer link;

        @Size(max = 128, message = "調査の名前は128文字を超えてはいけません。")
        private String name;

        @Size(max = 20, message = "調査の電話番号は20文字を超えてはいけません。")
        private String phone;

        private Integer route;

        private String staff;
    }
}

