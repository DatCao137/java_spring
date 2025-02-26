package grouphome.webapp.entity;

import grouphome.core.entity.base.EntityBase;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "d_customer_unit")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerUnitEntity extends EntityBase {
    /**
     * ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    /**
     * 顧客ID
     */
    @Column(name = "customer_id", nullable = false)
    private Long customerId;

    /**
     * 事業所ID
     */
    @Column(name = "brunch_id", nullable = false)
    private Long brunchId;

    /**
     * ユニットID
     */
    @Column(name = "unit_id", nullable = false)
    private Long unitId;

    /**
     * 部屋番号
     */
    @Column(name = "room_no", nullable = false, length = 5)
    private String roomNo;

    /**
     * 入居状況
     */
    @Column(name = "status", nullable = false)
    private Integer status;

    /**
     * 入居開始日
     */
    @Column(name = "movein_at", nullable = false)
    private LocalDate moveInAt;

    /**
     * 退去・移動日
     */
    @Column(name = "leaving_at")
    private LocalDate leavingAt;

    /**
     * 顧客情報 (一対一の関係)
     */
    @OneToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id", insertable = false, updatable = false)
    private CustomerInfoEntity customerInfo;

    /**
     * 事業所情報 (一対一の関係)
     */
    @OneToOne
    @JoinColumn(name = "brunch_id", referencedColumnName = "id", insertable = false, updatable = false)
    private OfficeBranchEntity officeBranch;

    /**
     * ユニット情報 (一対一の関係)
     */
    @OneToOne
    @JoinColumn(name = "unit_id", referencedColumnName = "id", insertable = false, updatable = false)
    private OfficeUnitEntity unit;
}
