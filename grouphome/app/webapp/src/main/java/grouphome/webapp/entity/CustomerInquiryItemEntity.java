package grouphome.webapp.entity;

import grouphome.core.entity.base.EntityBase;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import grouphome.webapp.converter.customer.inquiry.DetailBreakdownConverter;
import grouphome.webapp.converter.customer.inquiry.DetailRecordConverter;
import grouphome.webapp.dto.requests.customer.inquiry.InquiryDetailSaveRequestDto.*;

import java.time.LocalDate;

@Entity
@Table(name = "t_customer_inquiry_item", uniqueConstraints = @UniqueConstraint(columnNames = {"inquiry_info_id", "status"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerInquiryItemEntity extends EntityBase {
    /**
     * ID 
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    /**
     * 申請情報ID
     */
    @Column(name = "inquiry_info_id", nullable = false)
    private Long inquiryInfoId; 

    /**
     * 進捗状況
     */
    @Column(name = "status", nullable = false)
    private Integer status; 

    /**
     * 対象ホーム
     */
    @Column(name = "home_id")
    private Long homeId; 

    /**
     * 契約GH転送用データ
     */
    @Column(name = "gh_data", length = 32)
    private String ghData; 

    /**
     * 日付
     */
    @Column(name = "date")
    private LocalDate date; 

    /**
     * 内訳人数
     */
    @Convert(converter = DetailBreakdownConverter.class)
    @Column(name = "breakdown", columnDefinition = "JSON", nullable = false)
    private Breakdown breakdown; 

    /**
     * 記録
     */
    @Convert(converter = DetailRecordConverter.class)
    @Column(name = "record", columnDefinition = "JSON", nullable = false)
    private RecordType record; 
}