package grouphome.webapp.entity;

import grouphome.core.entity.base.EntityBase;
import grouphome.webapp.converter.customer.tenant.BasicDocumentDtoConverter;
import grouphome.webapp.converter.customer.tenant.Plan1stDocumentDtoConverter;
import grouphome.webapp.dto.requests.customer.tenant.SaveCustomerMoveinDocumentStatusRequestDto.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "d_customer_movein_document_status")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerMoveinDocumentStatusEntity extends EntityBase {
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
     * 基本書類
     */
    @Convert(converter = BasicDocumentDtoConverter.class)
    @Column(name = "basic", columnDefinition = "JSON")
    private BasicDocumentDto basic;

    /**
     * 初回個別支援計画
     */
    @Convert(converter = Plan1stDocumentDtoConverter.class)
    @Column(name = "plan_1st", columnDefinition = "JSON")
    private Plan1stDocumentDto plan1st;

    /**
     * MEMO
     */
    @Column(name = "memo", columnDefinition = "TEXT")
    private String memo;
}