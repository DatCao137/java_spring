package grouphome.webapp.dto.requests.employee;

import grouphome.webapp.dto.requests.blc_common.AddressDto;
import grouphome.webapp.validator.ValidJson;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.web.multipart.MultipartFile;
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor

public class SaveEmployeeRequestDto extends AddressDto {
    @Min(value = 0, message = "id must be greater than or equal to 0")
    @Digits(message = "id must contain only digits from 0 to 9", integer = 9, fraction = 0)
    private Long id;
    @Size(max = 255, message = "Name must be less than or equal to 255 characters")
    private String name;

    //@JsonFormat(pattern = "yyyy-MM-dd ")
    private LocalDate birthDay;

    private String address;
    private String message;
    private Integer unitId;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.S")
    private LocalDateTime updatedAt;
    private MultipartFile image_employee;
    
}
