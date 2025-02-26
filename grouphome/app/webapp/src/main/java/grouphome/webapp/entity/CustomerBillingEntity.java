package grouphome.webapp.entity;

import grouphome.core.entity.base.EntityBase;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "d_customer_billing")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerBillingEntity extends EntityBase {
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
     * 本入居分（初回）
     */
    @Column(name = "movein_1st_at")
    private LocalDate movein1stAt;

    /**
     * 口座振替依頼書原本発送
     */
    @Column(name = "original_request_at")
    private LocalDate originalRequestAt;

    /**
     * 口座振替RP入力
     */
    @Column(name = "rp_input_at")
    private LocalDate rpInputAt;

    /**
     * 初回口座振替日
     */
    @Column(name = "transfer_1st_at")
    private LocalDate transfer1stAt;

    /**
     * 備考
     */
    @Column(name = "remark", columnDefinition = "TEXT")
    private String remark;
}