package grouphome.webapp.dto.responses.customer.inquiry;

import lombok.Data;

@Data
public class DetailTableResponseDto {
    private String status;
    private String home;
    private String ghData;
    private String date;
    private String breakdownSelf;
    private String breakdownFamily;
    private String breakdownCounselor;
    private String breakdownSupportStaff;
    private String breakdownThirdParty;
    private String breakdownSum;
}
