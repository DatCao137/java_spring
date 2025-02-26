package grouphome.webapp.dto.responses.customer.inquiry;

import lombok.Data;

@Data
public class DetailResponseDto {
    private String inquiryTime;
    private String visit;
    private String freeTrial;
    private String paidTrial;
    private String ssCompletion;
    private String contractDate;
    private String planStatus;
}
