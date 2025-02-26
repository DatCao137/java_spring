package grouphome.webapp.dto.requests.blc_common;

import lombok.Data;

@Data
public class PagerDto {
    private Integer pageNumber = 1;
    private Integer pageSize = 20;
    private String sortBy = "id";
    private String sortDirection = "ASC";
}
