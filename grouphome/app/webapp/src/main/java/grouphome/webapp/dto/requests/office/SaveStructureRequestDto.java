package grouphome.webapp.dto.requests.office;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import grouphome.webapp.dto.requests.office.SaveBranchRequestDto.OfficeNumber;
import grouphome.webapp.validator.ValidJson;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveStructureRequestDto {
    private Long id;

    @Min(value = 0, message = "branchId must be greater than or equal to 0")
    @Digits(message = "branchId must contain only digits from 0 to 9", integer = 9, fraction = 0)
    @NotNull(message = "branchId is required")
    private Long branchId;

    @Size(max = 64, message = "Manager Name must be less than or equal to 64 characters")
    private String managerName;

    @Valid
    private Service service1;

    @Valid
    private Service service2;

    @Valid
    private LifeSupporter lifeSupporter;

    @Valid
    private WelfareWorker welfareWorker;

    @Valid
    private Nurse nurse;

    @Valid
    private VisitingContract visitingContract;

    private LocalDateTime updatedAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Service {
        private String name;

        @Valid
        private Training training;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Training {
        private String type;

        private String implementation;

        private String limit;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LifeSupporter {
        private Integer[] name;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class WelfareWorker {
        private Integer[] name;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Nurse {
        private Integer[] name;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class VisitingContract {
        @Min(value = 0, message = "0～999の整数を入力してください")
        @Max(value = 999, message = "0～999の整数を入力してください")
        private Long capacity;
    }
}
