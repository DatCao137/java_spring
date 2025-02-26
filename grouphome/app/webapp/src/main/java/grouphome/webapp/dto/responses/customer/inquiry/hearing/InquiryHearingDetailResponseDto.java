package grouphome.webapp.dto.responses.customer.inquiry.hearing;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InquiryHearingDetailResponseDto {
    private Long id;

    private Long hearingInfoId;

    private Integer step; 

    private String contents;

    private LocalDateTime updatedAt;
}

