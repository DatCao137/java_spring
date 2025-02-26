package grouphome.webapp.entity;

import grouphome.core.entity.base.EntityBase;
import grouphome.webapp.converter.facility.daily.FacilityDailyCustomerItemsValueConverter;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "d_facility_daily_customer_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FacilityDailyCustomerItemsEntity extends EntityBase {
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
    @Convert(converter = FacilityDailyCustomerItemsValueConverter.class)
    @Column(name = "value", columnDefinition = "json", nullable = false)
    private Object value;

    /**
     * 作成者ID
     */
    @Column(name = "created_by", nullable = false)
    private Long createdBy;
}
