package grouphome.webapp.dto.responses.customer.inquiry;

import lombok.Data;

@Data
public class SalesInfoResponseDto {
    private Long id;
    private String inquiryDate;
    private String inquiryMethod;
    private String tel;
    private String fax;
    private String mail;
    private String decisionMaker;
    private String decisionName;
    private String decisionAddress;
    private String contactableHours;
}
