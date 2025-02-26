package grouphome.webapp.dto.responses.customer.inquiry;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SalesFollowListResponseDto {
    private Long id;
    private Long salesInfoId;
    private Long staffId;
    private Integer step;
    private String stepName;
    private LocalDate followDate;
    private String staffName;
    private String contents;
    private LocalDateTime updatedAt;
}
