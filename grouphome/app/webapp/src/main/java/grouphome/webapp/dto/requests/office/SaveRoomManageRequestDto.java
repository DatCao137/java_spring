package grouphome.webapp.dto.requests.office;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

@Data
@NoArgsConstructor
public class SaveRoomManageRequestDto {
    @Min(value = 0, message = "roomManage ID must be greater than or equal to 0")
    @Digits(message = "roomManage ID must contain only digits from 0 to 9", integer = 9, fraction = 0)
    private Long id;

    /**
     * ユニットID
     */
    @Min(value = 0, message = "unit ID must be greater than or equal to 0")
    @Digits(message = "unit ID must contain only digits from 0 to 9", integer = 9, fraction = 0)
    private Long unitId;

    /**
     * 居室ID
     */
    @Min(value = 0, message = "room ID must be greater than or equal to 0")
    @Digits(message = "room ID must contain only digits from 0 to 9", integer = 9, fraction = 0)
    private Long roomId;

    /**
     * 顧客ID
     */
    @Min(value = 0, message = "customer ID must be greater than or equal to 0")
    @Digits(message = "customer ID must contain only digits from 0 to 9", integer = 9, fraction = 0)
    private Long customerId;

    /**
     * 入居日
     */
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate moveinAt;

    /**
     * 退居日
     */
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate leavingAt;

    /**
     * 障害区分ID
     */
    @Min(value = 0, message = "category ID must be greater than or equal to 0")
    @Digits(message = "category ID must contain only digits from 0 to 9", integer = 3, fraction = 0)
    private Integer categoryId;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.S")
    private LocalDateTime updatedAt;
}
