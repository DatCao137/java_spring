package grouphome.webapp.dto.requests.office;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

import java.util.Map;

import grouphome.webapp.dto.requests.blc_common.PagerDto;

@Data
@EqualsAndHashCode(callSuper=true)
public class HomeRequestDto extends PagerDto {
    private Integer id;

    private String branchName;
    private LocalDateTime dateFrom;
    private LocalDateTime dateTo;

    private Map<String, String> filter;
}
