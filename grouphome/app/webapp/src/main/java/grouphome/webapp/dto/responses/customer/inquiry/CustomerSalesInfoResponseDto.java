package grouphome.webapp.dto.responses.customer.inquiry;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class CustomerSalesInfoResponseDto {
    private Long id;
    private Long inquiryInfoId;
    private LocalDate firstInquiryDate;
    private Integer firstInquiryHow;
    private String firstInquiryHowName;
    private String contact;
    private String decision;
    private LocalDateTime updatedAt;
}
