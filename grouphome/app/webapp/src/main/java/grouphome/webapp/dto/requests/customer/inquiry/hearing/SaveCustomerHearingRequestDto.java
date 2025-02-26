package grouphome.webapp.dto.requests.customer.inquiry.hearing;

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
public class SaveCustomerHearingRequestDto {

    private Long id;

    @NotNull(message = "inquiryInfoIdはnullにできません。")
    private Long inquiryInfoId;

    @Size(max = 512, message = "結果は512文字を超えてはいけません。")
    private String result;

    @Size(max = 512, message = "見込み状況は512文字を超えてはいけません。")
    private String prospect;

    @Size(max = 512, message = "メモは512文字を超えてはいけません。")
    private String remark;

    private LocalDateTime updatedAt;
}