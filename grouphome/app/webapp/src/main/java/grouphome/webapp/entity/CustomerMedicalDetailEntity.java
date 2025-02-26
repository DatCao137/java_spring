package grouphome.webapp.entity;

import grouphome.core.entity.base.EntityBase;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "d_customer_medical_detail")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerMedicalDetailEntity extends EntityBase {
    /**
     * ID 
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    /**
     * 医療保険基本ID
     */
    @Column(name = "medical_id", nullable = false)
    private Long medicalId;

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
     * 利用機関名
     */
    @Column(name = "institution", length = 128, nullable = false)
    private String institution;

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

    @ManyToOne
    @JoinColumn(name = "medical_id", insertable = false, updatable = false)
    private CustomerMedicalEntity medical;
}
