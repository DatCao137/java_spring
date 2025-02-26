package grouphome.webapp.dto.responses.office.room;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ListResponseDto {
    private Integer id;

    private Integer customerId;
    private Integer roomId;
    private Integer unitId;
    private String moveinAt;
    private String leavingAt;
    private Integer categoryId;
    private String updatedAt;
}
