package grouphome.webapp.entity;

import grouphome.core.entity.base.EntityBase;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "d_customer_billing_detail")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerBillingDetailEntity extends EntityBase {
    /**
     * ID 
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    /**
     * 請求状況基本ID
     */
    @Column(name = "billing_id", nullable = false)
    private Long billingId;

    /**
     * 提供月
     */
    @Column(name = "yyyymm", nullable = false, length = 6)
    private String yyyymm;

    /**
     * 国保連
     */
    @Column(name = "national_at")
    private LocalDate nationalAt;

    /**
     * 自治単独加算等
     */
    @Column(name = "self_governing_at")
    private LocalDate selfGoverningAt;

    /**
     * その他助成金等
     */
    @Column(name = "other_at")
    private LocalDate otherAt;

    /**
     * 発行日
     */
    @Column(name = "issue_at")
    private LocalDate issueAt;

    /**
     * メモ
     */
    @Column(name = "memo", columnDefinition = "TEXT")
    private String memo;
}