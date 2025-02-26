package grouphome.webapp.dto.responses.customer.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetailResponseDto {   
    private Long id;
    private Long requestInfoId;
    private String requestType;
    private String contents;
    private LocalDateTime infoUpdatedAt;
    private LocalDateTime detailUpdatedAt;
}
