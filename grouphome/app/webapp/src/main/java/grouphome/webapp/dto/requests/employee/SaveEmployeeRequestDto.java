package grouphome.webapp.dto.requests.employee;

import lombok.Data;
import lombok.EqualsAndHashCode;
import java.util.Map;
import java.time.LocalDateTime;
import java.time.LocalDate;

import org.springframework.web.multipart.MultipartFile;

@Data
@EqualsAndHashCode(callSuper=false)
public class SaveEmployeeRequestDto{
    private Long id;

    private String name;

    private LocalDate birthDay;

    private String address;
    private String message;
    private Integer unitId;

    
    
    private LocalDateTime updatedAt;
    private MultipartFile imageEmployee;
    private String fileName;
    }