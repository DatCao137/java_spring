package grouphome.webapp.entity.mapping;

import jakarta.persistence.Entity;
import jakarta.persistence.SqlResultSetMapping;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.ColumnResult;

import java.time.LocalDateTime;

@Entity
@SqlResultSetMapping(
    name = "StaffDetailResponseDtoMapping",
    classes = @ConstructorResult(
        targetClass = grouphome.webapp.dto.responses.office.staff.DetailResponseDto.class,
        columns = {
            @ColumnResult(name = "id", type = Long.class),
            @ColumnResult(name = "nameSei", type = String.class),
            @ColumnResult(name = "nameMei", type = String.class),
            @ColumnResult(name = "kanaSei", type = String.class),
            @ColumnResult(name = "kanaMei", type = String.class),
            @ColumnResult(name = "birthDay", type = String.class),
            @ColumnResult(name = "age", type = Integer.class),
            @ColumnResult(name = "sex", type = String.class),
            @ColumnResult(name = "businessNameSei", type = String.class),
            @ColumnResult(name = "businessNameMei", type = String.class),
            @ColumnResult(name = "businessNameKanaSei", type = String.class),
            @ColumnResult(name = "businessNameKanaMei", type = String.class),
            @ColumnResult(name = "mail", type = String.class),
            @ColumnResult(name = "qualificationJson", type = String.class),
            @ColumnResult(name = "employeeNo", type = String.class),
            @ColumnResult(name = "branchNames", type = String.class),
            @ColumnResult(name = "homeNames", type = String.class),
            @ColumnResult(name = "unitNames", type = String.class),
            @ColumnResult(name = "businessContent", type = String.class),
            @ColumnResult(name = "occupationId", type = Integer.class),
            @ColumnResult(name = "occupation", type = String.class),
            @ColumnResult(name = "employeeType", type = String.class),
            @ColumnResult(name = "employeeTypeId", type = Integer.class),
            @ColumnResult(name = "paymentForm", type = String.class),
            @ColumnResult(name = "paymentFormId", type = Integer.class),
            @ColumnResult(name = "grade", type = String.class),
            @ColumnResult(name = "gradeId", type = Integer.class),

            @ColumnResult(name = "positioningJson", type = String.class),

            @ColumnResult(name = "enrollmentStatus", type = String.class),
            @ColumnResult(name = "enrollmentStatusId", type = Integer.class),
            @ColumnResult(name = "joinAt", type = String.class),
            @ColumnResult(name = "enrollmentPeriod", type = String.class),
            @ColumnResult(name = "leaveAt", type = String.class),
            @ColumnResult(name = "leaveReason", type = String.class),

            @ColumnResult(name = "addressJson", type = String.class),
            @ColumnResult(name = "building", type = String.class),
            @ColumnResult(name = "tel", type = String.class),
            @ColumnResult(name = "holder", type = String.class),
            @ColumnResult(name = "relationship", type = String.class),

            @ColumnResult(name = "residentAddressJson", type = String.class),
            @ColumnResult(name = "residentBuilding", type = String.class),
            @ColumnResult(name = "residentTel", type = String.class),
            @ColumnResult(name = "residentHolder", type = String.class),
            @ColumnResult(name = "residentRelationship", type = String.class),

            @ColumnResult(name = "emergencyNameSei", type = String.class),
            @ColumnResult(name = "emergencyNameMei", type = String.class),
            @ColumnResult(name = "emergencyNameKanaSei", type = String.class),
            @ColumnResult(name = "emergencyNameKanaMei", type = String.class),
            @ColumnResult(name = "emergencyRelationship", type = String.class),
            @ColumnResult(name = "emergencyTel", type = String.class),
            @ColumnResult(name = "emergencyAddressJson", type = String.class),
            @ColumnResult(name = "emergencyBuilding", type = String.class),

            @ColumnResult(name = "contractType", type = String.class),
            @ColumnResult(name = "contractTypeId", type = Integer.class),
            @ColumnResult(name = "contractStartAt", type = String.class),
            @ColumnResult(name = "contractEndAt", type = String.class),
            @ColumnResult(name = "contractRenewalType", type = String.class),
            @ColumnResult(name = "contractRenewalTypeId", type = Integer.class),

            @ColumnResult(name = "remainingSei", type = String.class),
            @ColumnResult(name = "remainingMei", type = String.class),
            @ColumnResult(name = "remainingMiddleName", type = String.class),
            @ColumnResult(name = "remainingNo", type = String.class),
            @ColumnResult(name = "remainingNationality", type = String.class),
            @ColumnResult(name = "remainingNationalityId", type = Integer.class),
            @ColumnResult(name = "remainingStatus", type = String.class),
            @ColumnResult(name = "remainingStatusId", type = Integer.class),
            @ColumnResult(name = "remainingLimitAt", type = String.class),
            @ColumnResult(name = "remainingPermission", type = Boolean.class),
            @ColumnResult(name = "remainingClass", type = String.class),
            @ColumnResult(name = "remainingClassId", type = Integer.class),

            @ColumnResult(name = "twinsMore", type = Boolean.class),
            @ColumnResult(name = "scheduledBirthAt", type = String.class),
            @ColumnResult(name = "birthAt", type = String.class),
            @ColumnResult(name = "prenatalStartAt", type = String.class),
            @ColumnResult(name = "postpartumEndAt", type = String.class),
            @ColumnResult(name = "childcareStartAt", type = String.class),
            @ColumnResult(name = "childcareEndAt", type = String.class),
            @ColumnResult(name = "plannedReturnAt", type = String.class),
            @ColumnResult(name = "usePlus", type = Boolean.class),
            @ColumnResult(name = "updatedAt", type = LocalDateTime.class)
        }
    )
)
public class StaffDetailResponseDtoMappingEntity extends Base {

}