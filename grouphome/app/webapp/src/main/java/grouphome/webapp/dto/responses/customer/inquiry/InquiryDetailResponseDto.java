package grouphome.webapp.dto.responses.customer.inquiry;

import lombok.Data;
import java.time.LocalDateTime;
import java.time.LocalDate;
@Data
public class InquiryDetailResponseDto {
    private Long id;
    private Long inquiryInfoId;
    private Integer status;
    private String statusName;
    private Long homeId;
    private String homeName;
    private String ghData;
    private LocalDate date;

    private String breakdownSelf;
    private String breakdownFamily;
    private String breakdownCounselor;
    private String breakdownSupport;
    private String breakdownThirdParty;

    private String recordTime;
    private String recordVisitTime;
    private LocalDate recordFreeTrial;
    private LocalDate recordPaidTrial;
    private LocalDate recordSsCompletion;
    private String recordContractDate;
    private String recordPlanStatus;
    private String recordDlanStatusName;

    private LocalDateTime updatedAt;
}

