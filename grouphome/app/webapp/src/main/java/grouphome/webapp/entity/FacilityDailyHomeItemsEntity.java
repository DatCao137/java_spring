package grouphome.webapp.entity;

import grouphome.core.entity.base.EntityBase;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "d_facility_daily_home_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FacilityDailyHomeItemsEntity extends EntityBase {
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
     * 項目名
     */
    @Column(name = "name", nullable = false, length = 32)
    private String name;

    /**
     * 値
     */
    @Column(name = "value", columnDefinition = "json", nullable = false)
    private String value; 

    /**
     * 作成者ID
     */
    @Column(name = "created_by", nullable = false)
    private Integer createdBy;
}