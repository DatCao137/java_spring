package grouphome.webapp.dto.requests.blc_common;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddressDto {
    /**
     * 所在地 (Address ID)
     */
    @Min(value = 0, message = "Address ID must be greater than or equal to 0")
    @Digits(message = "Address ID must contain only digits from 0 to 9", integer = 9, fraction = 0)
    private Long addrId;

    @Size(max = 8, message = "postNo must be less than or equal to 8 characters")
    private String postNo;

    @Min(value = 0, message = "prefId must be greater than or equal to 0")
    @Digits(message = "Pref ID must contain only digits from 0 to 9", integer = 9, fraction = 0)
    private Integer prefId;

    @Size(max = 16, message = "city must be less than or equal to 16 characters")
    private String city;

    @Size(max = 255, message = "town must be less than or equal to 255 characters")
    private String town;

    @Size(max = 13, message = "tel must be less than or equal to 13 characters")
    private String tel;

    @Size(max = 13, message = "fax must be less than or equal to 13 characters")
    private String fax;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.S")
    private LocalDateTime updatedAtAddr;
}
