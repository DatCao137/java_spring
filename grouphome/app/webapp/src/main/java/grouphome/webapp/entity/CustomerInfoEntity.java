package grouphome.webapp.entity;

import grouphome.core.entity.base.EntityBase;
import grouphome.webapp.converter.customer.tenant.DetailsConverter;
import grouphome.webapp.converter.customer.tenant.PersonalConverter;
import grouphome.webapp.dto.requests.customer.tenant.SaveCustomerRequestDto.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "d_customer_info")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerInfoEntity extends EntityBase {
    /**
     * ID 
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    /**
     * 氏名
     */
    @Column(name = "name", length = 128)
    private String name;

    /**
     * 氏名(ふりがな)
     */
    @Column(name = "name_gana", length = 128)
    private String nameGana;

    /**
     * 個人情報
     */

    @Convert(converter = PersonalConverter.class)
    @Column(name = "personal", columnDefinition = "json")
    private Personal personal;

    /**
     * 詳細情報
     */

    @Convert(converter = DetailsConverter.class)
    @Column(name = "details", columnDefinition = "json")
    private Details details;

    /**
     * 障がい支援区分
     */
    @Column(name = "category")
    private Integer category;

    /**
     * 基本利用者ID
     */
    @Column(name = "base_customer_id")
    private Long baseCustomerId;

    @OneToOne(mappedBy = "customerInfo")
    private CustomerUnitEntity customerUnit;
}