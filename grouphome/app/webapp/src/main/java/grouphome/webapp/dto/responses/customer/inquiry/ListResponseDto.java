package grouphome.webapp.dto.responses.customer.inquiry;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ListResponseDto {
    private Long id;
    private String name;
    private String gana;
    private String sex;
    private String age;
    private String sexName;
    private String inquirySrcName;
    private String inquirySrcStaff;
    private String inquirySrcRoute;
    private String inquirySrcRouteName;
    private String inquirySrcPhone;
    private String inquirySrcLink;
    private String inquirySrcLinkName;
    private String status;
    private String statusName;
    private String nextAction;
    private LocalDateTime updatedAt;
}


