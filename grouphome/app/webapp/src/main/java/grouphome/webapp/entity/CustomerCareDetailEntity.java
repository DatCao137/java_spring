package grouphome.webapp.entity;

import grouphome.core.entity.base.EntityBase;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "d_customer_care_detail")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerCareDetailEntity extends EntityBase {
    /**
     * ID 
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    /**
     * 介護保険基本ID
     */
    @Column(name = "care_id", nullable = false)
    private Long careId;

    /**
     * 枝番
     */
    @Column(name = "sub", nullable = false)
    private Integer sub;

    /**
     * 利用サービス名
     */
    @Column(name = "service_name", length = 128, nullable = false)
    private String serviceName;

    /**
     * 利用事業者
     */
    @Column(name = "use_company", length = 128, nullable = false)
    private String useCompany;

    /**
     * ステータス
     */
    @Column(name = "status", nullable = false)
    private Integer status;

    /**
     * 利用頻度
     */
    @Column(name = "pace", nullable = false)
    private Integer pace;

    @ManyToOne()
    @JoinColumn(name = "care_id", referencedColumnName = "id", insertable = false, updatable = false)
    private CustomerCareEntity care;
}