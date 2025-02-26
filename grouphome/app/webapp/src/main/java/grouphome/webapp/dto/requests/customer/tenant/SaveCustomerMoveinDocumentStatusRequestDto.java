package grouphome.webapp.dto.requests.customer.tenant;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SaveCustomerMoveinDocumentStatusRequestDto {
    private Long id;

    @NotNull(message = "顧客IDは必須項目です。")
    private Long customerId;

    @Valid
    private BasicDocumentDto basic;

    @Valid
    private Plan1stDocumentDto plan1st;

    private String memo;

    private LocalDateTime updatedAt;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BasicDocumentDto {
        @Size(max = 255, message = "判定は255文字以内で入力してください。")
        private String judge;

        @Valid
        private UsageDto usage;

        @Valid
        private FaceSheetDto faceSheet;

        @Valid
        private ImportantDocumentDto important;

        @Valid
        private UsageContractDto usageContract;

        @Getter
        @Setter
        @NoArgsConstructor
        @AllArgsConstructor
        public static class UsageDto {
            private Boolean store;

            private LocalDate createdAt;

            @Min(value = 1, message = "ファイルIDは1以上の値を指定してください。")
            private Long fileId;
        }

        @Getter
        @Setter
        @NoArgsConstructor
        @AllArgsConstructor
        public static class FaceSheetDto {
            private Boolean store;

            private LocalDate createdAt;

            @Min(value = 1, message = "ファイルIDは1以上の値を指定してください。")
            private Long fileId;
        }

        @Getter
        @Setter
        @NoArgsConstructor
        @AllArgsConstructor
        public static class ImportantDocumentDto {
            private Boolean store;

            private Boolean sign;

            private LocalDate createdAt;

            @Min(value = 1, message = "ファイルIDは1以上の値を指定してください。")
            private Long fileId;
        }

        @Getter
        @Setter
        @NoArgsConstructor
        @AllArgsConstructor
        public static class UsageContractDto {
            private Boolean store;

            private Boolean sign;

            private LocalDate createdAt;

            @Min(value = 1, message = "ファイルIDは1以上の値を指定してください。")
            private Long fileId;
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Plan1stDocumentDto {
        @Size(max = 255, message = "判定は255文字以内で入力してください。")
        private String judge;

        private LocalDate lastUpdatedAt;

        @Valid
        private DraftDto draft;

        @Valid
        private MeetingDto meeting;

        @Valid
        private MainDto main;

        @Getter
        @Setter
        @NoArgsConstructor
        @AllArgsConstructor
        public static class DraftDto {
            private Boolean store;

            private Boolean sign;

            private Long staff;

            private LocalDate createdAt;

            @Min(value = 1, message = "ファイルIDは1以上の値を指定してください。")
            private Long fileId;
        }

        @Getter
        @Setter
        @NoArgsConstructor
        @AllArgsConstructor
        public static class MeetingDto {
            private Boolean store;

            private Boolean writeCheck;

            private LocalDate createdAt;

            @Min(value = 1, message = "ファイルIDは1以上の値を指定してください。")
            private Long fileId;
        }

        @Getter
        @Setter
        @NoArgsConstructor
        @AllArgsConstructor
        public static class MainDto {
            private Boolean store;

            private Boolean sign;

            private Long staff;

            private LocalDate createdAt;

            @Min(value = 1, message = "ファイルIDは1以上の値を指定してください。")
            private Long fileId;
        }
    }
}
