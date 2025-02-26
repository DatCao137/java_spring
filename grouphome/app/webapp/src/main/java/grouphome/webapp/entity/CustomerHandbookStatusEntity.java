package grouphome.webapp.entity;

import grouphome.core.entity.base.EntityBase;
import grouphome.webapp.converter.customer.tenant.DisabledConverter;
import grouphome.webapp.converter.customer.tenant.LimitConverter;
import grouphome.webapp.converter.customer.tenant.RecipientConverter;
import grouphome.webapp.dto.requests.customer.tenant.SaveCustomerHandbookStatusRequestDto.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "d_customer_handbook_status")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerHandbookStatusEntity extends EntityBase {
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
     * 受給者情報
     */
    @Convert(converter = RecipientConverter.class)
    @Column(name = "recipient", columnDefinition = "JSON")
    private Recipient recipient;

    /**
     * 障害者情報
     */
    @Convert(converter = DisabledConverter.class)
    @Column(name = "disabled", columnDefinition = "JSON")
    private Disabled disabled;

    /**
     * 上限情報
     */
    @Convert(converter = LimitConverter.class)
    @Column(name = "`limit`", columnDefinition = "JSON")
    private Limit limit;

    /**
     * 通所先
     */
    @Column(name = "visiting_place", length = 128)
    private String visitingPlace;

    /**
     * サービス
     */
    @Column(name = "service", length = 128)
    private String service;

    /**
     * 障がい者手帳種類
     */
    @Column(name = "handbook_type", length = 10)
    private String handbookType;
}