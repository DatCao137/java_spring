package grouphome.webapp.entity;

import grouphome.core.entity.base.EntityBase;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import grouphome.webapp.converter.customer.inquiry.InquiryConverter;
import grouphome.webapp.dto.requests.customer.inquiry.InquirySaveRequestDto.*;

@Entity
@Table(name = "t_customer_inquiry")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerInquiryEntity extends EntityBase {
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
    @Column(name = "name", nullable = false, length = 128)
    private String name; 

    /**
     * ふりがな
     */
    @Column(name = "gana", length = 128)
    private String gana; 

    /**
     * 性別
     */
    @Column(name = "sex")
    private Integer sex; 

    /**
     * 年齢
     */
    @Column(name = "age")
    private Integer age; 

    /**
     * 問合わせ支援機関等
     */
    @Convert(converter = InquiryConverter.class)
    @Column(name = "inquiry_src", columnDefinition = "json", nullable = false)
    private InquirySrc inquirySrc; 

    /**
     * ステータス
     */
    @Column(name = "status", nullable = false)
    private Integer status; 

    /**
     * 入居者ID
     */
    @Column(name = "tenant_id")
    private Long tenantId; 

    /**
     * 利用者ID
     */
    @Column(name = "customer_id")
    private Long customerId; 

    /**
     * ネクストアクション
     */
    @Column(name = "next_action", length = 256)
    private String nextAction; 
}