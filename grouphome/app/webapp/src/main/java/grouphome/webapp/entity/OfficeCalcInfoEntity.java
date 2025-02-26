package grouphome.webapp.entity;

import grouphome.core.entity.base.EntityBase;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;

@Entity
@Table(name = "t_office_calc_info")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OfficeCalcInfoEntity extends EntityBase {
    /**
     * ID 
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    /**
     * 事業所ID
     */
    @Column(name = "branch_id", nullable = false)
    private Long branchId; 

    /**
     * 適用開始日
     */
    @Column(name = "start_date")
    private LocalDate startDate; 

    /**
     * 届出日
     */
    @Column(name = "notification_date")
    private LocalDate notificationDate;

    /**
     * 有効期間開始
     */
    @Column(name = "valid_start_date")
    private LocalDate validStartDate;

    /**
     * 有効期間終了
     */
    @Column(name = "valid_end_date")
    private LocalDate validEndDate;

    /**
     * 算定項目ID
     */
    @Column(name = "calc_items_id")
    private Long calcItemsId;

    /**
     * 値
     */
    @Column(name = "value", columnDefinition = "JSON")
    private String value;

    /**
     * 備考
     */
    @Column(name = "remark", columnDefinition = "TEXT")
    private String remark;
}
