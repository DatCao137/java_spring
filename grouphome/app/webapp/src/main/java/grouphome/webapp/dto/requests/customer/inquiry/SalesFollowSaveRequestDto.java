package grouphome.webapp.dto.requests.customer.inquiry;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SalesFollowSaveRequestDto {
    private Long id;

    @NotNull(message = "salesInfoId must be not null")
    private Long salesInfoId;

    @NotNull(message = "step must be not null")
    @Min(value = 1, message = "フォロー回は1以上でなければなりません。")
    @Digits(message = "フォロー回は0から9までの数字のみ含めることができます。", integer = 9, fraction = 0)
    private Integer step;

    private LocalDate followDate;

    @Digits(message = "staffIdは0から9までの数字のみ含めることができます。", integer = 9, fraction = 0)
    private Long staffId;

    private String staffName;

    private String contents;

    private LocalDateTime updatedAt;
}
