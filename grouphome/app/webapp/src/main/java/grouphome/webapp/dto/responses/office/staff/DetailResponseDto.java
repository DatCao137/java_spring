package grouphome.webapp.dto.responses.office.staff;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DetailResponseDto {

    private Long id;
    private String nameSei;
    private String nameMei;
    private String kanaSei;
    private String kanaMei;
    private String birthDay;
    private Integer age;
    private String sex;
    private String businessNameSei;
    private String businessNameMei;
    private String businessNameKanaSei;
    private String businessNameKanaMei;
    private String mail;

    private String employeeNo;
    private String branchNames;
    private String homeNames;
    private String unitNames;
    private String businessContent;
    private Integer occupationId;
    private String occupation;
    private String employeeType;
    private String paymentForm;
    private String grade;

    private Integer paymentFormId;
    private Integer gradeId;
    private Integer contractTypeId;
    private Integer contractRenewalTypeId;
    private Integer remainingNationalityId;
    private Integer remainingStatusId;
    private Integer remainingClassId;
    private Integer employeeTypeId;

    @JsonIgnore
    private String positioningJson;

    private List<Positioning> positioning;

    private String enrollmentStatus;
    private Integer enrollmentStatusId;
    private String joinAt;
    private String enrollmentPeriod;
    private String leaveAt;
    private String leaveReason;

    @JsonIgnore
    private String addressJson;

    private PostalAddress address;

    private String building;
    private String tel;
    private String holder;
    private String relationship;

    @JsonIgnore
    private String residentAddressJson;

    private PostalAddress residentAddress;

    private String residentBuilding;
    private String residentTel;
    private String residentHolder;
    private String residentRelationship;

    @JsonIgnore
    private String emergencyAddressJson;

    private PostalAddress emergencyAddress;

    private String emergencyNameSei;
    private String emergencyNameMei;
    private String emergencyNameKanaSei;
    private String emergencyNameKanaMei;
    private String emergencyRelationship;
    private String emergencyTel;
    private String emergencyBuilding;

    private String contractType;
    private String contractStartAt;
    private String contractEndAt;
    private String contractRenewalType;

    private String remainingSei;
    private String remainingMei;
    private String remainingMiddleName;
    private String remainingNo;
    private String remainingNationality;
    private String remainingStatus;
    private String remainingLimitAt;
    private Boolean remainingPermission;
    private String remainingClass;

    private Boolean twinsMore;
    private String scheduledBirthAt;
    private String birthAt;
    private String prenatalStartAt;
    private String postpartumEndAt;
    private String childcareStartAt;
    private String childcareEndAt;
    private String plannedReturnAt;
    private Boolean usePlus;
    private LocalDateTime updatedAt;

    @JsonIgnore
    private String qualificationJson;

    private List<Qualification> qualification;

    @Data
    @NoArgsConstructor
    public static class Positioning {
        private String department;
        private Integer departmentId;
        private String position;
        private Integer positionId;
    }

    @Data
    @NoArgsConstructor
    public static class PostalAddress {
        private String postNo;
        private String pref;
        private String city;
        private String town;
        private String prefId;
    }

    @Data
    @NoArgsConstructor
    public static class Qualification {
        private Long qualificationId;
        private String qualificationName;
        private String qualificationType;
        private Boolean hold;
        private String limitAt;
        private String etcName;
    }
}
