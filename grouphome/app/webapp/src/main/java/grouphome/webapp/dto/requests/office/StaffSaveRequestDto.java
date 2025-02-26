package grouphome.webapp.dto.requests.office;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.relational.core.sql.In;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StaffSaveRequestDto {

    @NotNull
    private Long id;

    private Integer branchId;

    private Integer mainHomeId;

    private Integer subHomeId;

    @NotNull
    private LocalDateTime updatedAt;
}
