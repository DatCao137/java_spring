package grouphome.webapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import grouphome.core.entity.base.EntityBase;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "d_office_staff")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OfficeStaffEntity extends EntityBase {
    /**
     * ID 
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    /**
     * SmartHR連携
     */
    @Column(name = "smart_hr_crew_id", nullable = false, unique = true, length = 255)
    private String smartHrCrewId;

    @Column(name = "employee_no", nullable = false, length = 8)
    private String employeeNo;

    @Column(name = "nameSei", nullable = false, length = 64)
    private String nameSei;

    @Column(name = "nameMei", nullable = false, length = 64)
    private String nameMei;

    @Column(name = "occupation_id")
    private Integer occupationId;

    @Column(name = "affiliations")
    private String affiliations;

    @Column(name = "employee_type")
    private Integer employeeType;

    @Column(name = "enrollment")
    private String enrollment;

    @Column(name = "qualification")
    private String qualification;

    @Column(name = "smart_hr_data")
    private String smartHrData;
}