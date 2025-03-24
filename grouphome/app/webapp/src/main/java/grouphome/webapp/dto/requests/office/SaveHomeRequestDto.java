package grouphome.webapp.dto.requests.office;

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

import com.fasterxml.jackson.annotation.JsonFormat;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveHomeRequestDto extends AddressDto {
    @Min(value = 0, message = "homeId must be greater than or equal to 0")
    @Digits(message = "homeId must contain only digits from 0 to 9", integer = 9, fraction = 0)
    private Long homeId;

    /**
     * ホーム名 (Home Name)
     */
    @Size(max = 255, message = "HomeName must be less than or equal to 255 characters")
    private String name;

    /**
     * 事業所ID(Branch ID)
     */
    @Min(value = 0, message = "Branch ID must be greater than or equal to 0")
    @Digits(message = "Branch ID must contain only digits from 0 to 9", integer = 9, fraction = 0)
    private Long branchId;

    private Boolean sameBranch;

    @ValidJson(message = "JSON形式である必要があります")
    private String contents;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.S") 
    private LocalDateTime updatedAtHome;
  
}
