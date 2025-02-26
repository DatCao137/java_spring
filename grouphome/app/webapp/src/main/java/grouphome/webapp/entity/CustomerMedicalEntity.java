package grouphome.webapp.entity;

import grouphome.core.entity.base.EntityBase;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "d_customer_medical")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerMedicalEntity extends EntityBase {
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
    @Column(name = "customer_id", nullable = false, unique = true)
    private Long customerId;

    /**
     * 保険証種別ID
     */
    @Column(name = "insurance_type_id", nullable = false)
    private Integer insuranceTypeId;

    /**
     * 記号-番号-枝番
     */
    @Column(name = "number", length = 15, nullable = false)
    private String number;

    @OneToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id", insertable = false, updatable = false)
    private CustomerInfoEntity customerInfo;

    @OneToMany(mappedBy = "medical")
    @OrderBy("createdAt DESC")
    private List<CustomerMedicalDetailEntity> details;
}
