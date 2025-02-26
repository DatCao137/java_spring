package grouphome.webapp.dto.requests.customer.inquiry;

import grouphome.webapp.validator.ValidJson;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InquiryProfileSaveRequestDto {

    private Long id;

    private Long inquiryInfoId;

    private Long age;

    @Valid
    private Introducer introducer;

    @Valid
    private Disabled disabled;

    @Valid
    private PocketBook pocketBook;

    @Valid
    private Service service;

    @Valid
    private Residence residence;
    
    private LocalDateTime updatedAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Introducer {
        private String name;

        private String type;

        private String addr;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Disabled {
        private String type;

        @JsonProperty("class")
        private String iclass;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PocketBook {
        private Integer type;

        private String grade;

        private Integer wheelchair;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Service {
        private String days;

        private String name;

        private String addr;
        
        private String visit;

        private String etc;

        private String recipient;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Residence {
        private String type;

        private String remark;
    }
}