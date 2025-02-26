package grouphome.webapp.dto.requests.customer.inquiry;

import grouphome.webapp.dto.requests.blc_common.AddressDto;
import grouphome.webapp.dto.requests.office.OfficeRoomSaveRequestDto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerSalesSaveRequestDto {
    private Long id;

    @NotNull(message = "inquiryInfoId must be not null")
    private Long inquiryInfoId;

    private LocalDate firstInquiryDate;

    private Integer firstInquiryHow;

    @Valid
    private Contact contact;

    @Valid
    private Decision decision;

    private LocalDateTime updatedAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Contact {
        @Pattern(regexp = "^[0-9-]{0,13}$", message = "半角ハイフンを含めて13桁以内で入力してください")
        private String tel;

        @Pattern(regexp = "^[0-9-]{0,13}$", message = "半角ハイフンを含めて13桁以内で入力してください")
        private String fax;

        @Email(message = "正しいメールアドレス形式で入力してください")
        private String mail;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Decision {
        private String name;

        private String maker;

        private String address;

        private String contactableHour;
    }
}
