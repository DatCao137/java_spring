package grouphome.webapp.entity;

import grouphome.core.entity.base.EntityBase;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "d_facility_daily_homes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FacilityDailyHomesEntity extends EntityBase {
    /**
     * ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    /**
     * ホームID
     */
    @Column(name = "home_id", nullable = false)
    private Integer homeId;

    /**
     * 対象年月日
     */
    @Column(name = "yyyymmdd", nullable = false, length = 8)
    private String yyyymmdd;

    /**
     * 献立
     */
    @Column(name = "menu", columnDefinition = "json", nullable = false)
    private String menu; 

    /**
     * 勤務状況
     */
    @Column(name = "works", columnDefinition = "json", nullable = false)
    private String works; 
}