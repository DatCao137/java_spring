package grouphome.webapp.entity;

import grouphome.core.entity.base.EntityBase;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "d_customer_care")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerCareEntity extends EntityBase {
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
     * 介護保険被保険者証(番号)
     */
    @Column(name = "care_no", length = 10, nullable = false)
    private String careNo;

    /**
     * 要介護区分
     */
    @Column(name = "care_type_id", nullable = false)
    private Integer careTypeId;

    /**
     * 支給限度額
     */
    @Column(name = "`limit`", nullable = false)
    private Long limit;

    @OneToMany(mappedBy = "care")
    @OrderBy("createdAt DESC")
    private List<CustomerCareDetailEntity> details;
}