package grouphome.webapp.dto.requests.customer.tenant;

import com.fasterxml.jackson.annotation.JsonProperty;
import grouphome.webapp.dto.requests.blc_common.PagerDto;
import jakarta.annotation.Nullable;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper=true)
public class CustomerRequestDto extends PagerDto {
    private Long id;

    @Valid
    private Filter filter;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Filter {
        private String name;
        private String nameGana;

        @JsonProperty("personal.nickname")
        @Size(max = 255, message = "nicknameは255文字以内でなければなりません")
        private String nickname;

        @JsonProperty("personal.sex")
        private String sex;

        @JsonProperty("personal.birthDay")
        private String age;

        private String category;

        @Valid
        private String status;

        private LocalDate moveInAt;
        private LocalDate leavingAt;

        @Size(max = 5, message = "部屋番号は5文字以内で入力してください")
        private String roomNo;

        @Size(max = 255, message = "事業所名は255文字以内で入力してください")
        private String brunchName;

        @Size(max = 255, message = "ユニット名は255文字以内で入力してください")
        private String unitName;
    }
}
