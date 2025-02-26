package grouphome.webapp.dto.responses.customer.inquiry;

import lombok.Data;

@Data
public class SalesFollowInfoResponseDto {
    private Long id;
    private String step;
    private String date;
    private String elapsed;
    private String staff;
    private String contents;
}
