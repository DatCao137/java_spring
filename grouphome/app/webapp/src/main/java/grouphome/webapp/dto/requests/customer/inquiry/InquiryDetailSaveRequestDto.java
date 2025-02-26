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
public class InquiryDetailSaveRequestDto {

    private Long id;

    @NotNull(message = "inquiryInfoIdはnullにできません。")
    private Long inquiryInfoId;

    @NotNull(message = "ステータスはnullにできません。")
    private Integer status;

    private Long homeId;

    @Size(max = 32, message = "契約GH転送用データは32文字を超えてはいけません。")
    private String ghData;

    private LocalDate date;

    @Valid
    private Breakdown breakdown;

    @Valid
    private RecordType record;

    private LocalDateTime updatedAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Breakdown {
        private Integer self;

        private Integer family;

        private Integer counselor;

        private Integer support;

        private Integer thirdParty;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RecordType {
        private String time;

        private String visitTime;

        private String freeTrial;

        private String paidTrial;

        private String ssCompletion;

        private String contractDate;

        private Integer planStatus;
    }
}