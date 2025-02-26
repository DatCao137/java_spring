package grouphome.webapp.dto.responses.customer.inquiry;

import lombok.Data;

@Data
public class HearingListInfoResponseDto {
    private Long id;
    private String step;
    private String memo;
    private String lastUpdate;
}
