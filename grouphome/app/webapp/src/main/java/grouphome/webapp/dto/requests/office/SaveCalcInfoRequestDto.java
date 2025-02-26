package grouphome.webapp.dto.requests.office;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveCalcInfoRequestDto {
    private Long id;
    private Long branchId;
    private LocalDate startDate;
    private LocalDate notificationDate;
    private LocalDate validStartDate;
    private LocalDate validEndDate;
    private Long calcItemsId;
    private String[] value;

    /**
     * 備考
     */
    @Size(max = 255, message = "Remark must be less than or equal to 255 characters")
    private String remark;

    private LocalDateTime updatedAt;
}
