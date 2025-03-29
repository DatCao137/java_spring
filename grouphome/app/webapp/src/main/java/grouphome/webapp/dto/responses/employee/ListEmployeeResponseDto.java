package grouphome.webapp.dto.responses.employee;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ListEmployeeResponseDto {
    private Integer id;
    private String  name;
    private String birthDay;
    private String address;
    private String  message;
    private Integer unitId;
    private String updatedAt;
    private byte[] image_employee;
}