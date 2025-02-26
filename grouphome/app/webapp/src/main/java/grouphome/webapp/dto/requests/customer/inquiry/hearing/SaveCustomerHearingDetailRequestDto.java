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
public class SaveCustomerHearingDetailRequestDto {

    private Long id;

    @NotNull(message = "ヒアリング情報IDはnullにできません。")
    private Long hearingInfoId;

    @NotNull(message = "STEPはnullにできません。")
    private Integer step; 

    @Size(max = 512, message = "ヒアリング内容は512文字を超えてはいけません。")
    private String contents;

    private LocalDateTime updatedAt;
}


