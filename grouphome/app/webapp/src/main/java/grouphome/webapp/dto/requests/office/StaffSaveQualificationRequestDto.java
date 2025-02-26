package grouphome.webapp.dto.requests.office;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StaffSaveQualificationRequestDto {

    @NotNull
    private Long id;

    @NotNull
    private List<Qualification> qualification;

    @NotNull
    private LocalDateTime updatedAt;

    @Data
    @NoArgsConstructor
    public static class Qualification {
        private Long qualificationId;
        private Boolean hold;

        @JsonInclude(JsonInclude.Include.NON_EMPTY)
        private String etcName;
    }
}
