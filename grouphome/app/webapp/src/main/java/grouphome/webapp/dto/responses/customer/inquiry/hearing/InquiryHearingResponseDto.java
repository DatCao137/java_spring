package grouphome.webapp.dto.responses.customer.inquiry.hearing;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InquiryHearingResponseDto {
    private Long id;
   
    private Long inquiryInfoId;
  
    private String result;

    private String prospect;

    private String remark;

    private LocalDateTime updatedAt;

    private List<InquiryHearingDetailResponseDto> inquiryHearingDetails;
}