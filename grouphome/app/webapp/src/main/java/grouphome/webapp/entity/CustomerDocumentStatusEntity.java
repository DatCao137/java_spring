package grouphome.webapp.entity;

import grouphome.core.entity.base.EntityBase;
import grouphome.webapp.converter.customer.tenant.DocumentStatusItemConverter;
import grouphome.webapp.converter.customer.tenant.MonitoringConverter;
import grouphome.webapp.dto.requests.customer.tenant.SaveCustomerDocumentStatusRequestDto.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "d_customer_document_status")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDocumentStatusEntity extends EntityBase {
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
     * 見学申込書
     */
    @Convert(converter = DocumentStatusItemConverter.class)
    @Column(name = "tour", columnDefinition = "JSON")
    private DocumentStatusItem tour;

    /**
     * アセスメントシート
     */
    @Convert(converter = DocumentStatusItemConverter.class)
    @Column(name = "assessment", columnDefinition = "JSON")
    private DocumentStatusItem assessment;

    /**
     * 体験利用契約
     */
    @Convert(converter = DocumentStatusItemConverter.class)
    @Column(name = "trial", columnDefinition = "JSON")
    private DocumentStatusItem trial;

    /**
     * 体験重要事項説明書
     */
    @Convert(converter = DocumentStatusItemConverter.class)
    @Column(name = "trial_important_experience", columnDefinition = "JSON")
    private DocumentStatusItem trialImportantExperience;

    /**
     * 利用契約
     */
    @Convert(converter = DocumentStatusItemConverter.class)
    @Column(name = "usage_contract", columnDefinition = "JSON")
    private DocumentStatusItem usageContract;

    /**
     * 重要事項説明書
     */
    @Convert(converter = DocumentStatusItemConverter.class)
    @Column(name = "important_experience", columnDefinition = "JSON")
    private DocumentStatusItem importantExperience;

    /**
     * 個別支援計画
     */
    @Convert(converter = DocumentStatusItemConverter.class)
    @Column(name = "plan", columnDefinition = "JSON")
    private DocumentStatusItem plan;

    /**
     * モニタリング
     */
    @Convert(converter = MonitoringConverter.class)
    @Column(name = "monitoring", columnDefinition = "JSON")
    private List<Monitoring> monitoring;
}