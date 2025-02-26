package grouphome.webapp.entity;

import grouphome.core.entity.base.EntityBase;
import grouphome.webapp.converter.customer.tenant.MonitoringInfoConverter;
import grouphome.webapp.dto.requests.customer.tenant.SaveCustomerMonitoringRequestDto.MonitoringInfo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "d_customer_monitoring")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerMonitoringEntity extends EntityBase {
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
     * 提供月
     */
    @Column(name = "yyyymm", nullable = false, length = 6)
    private String yyyymm;

    /**
     * JSON情報
     */
    @Convert(converter = MonitoringInfoConverter.class)
    @Column(name = "info", columnDefinition = "JSON", nullable = false)
    private MonitoringInfo info;
}