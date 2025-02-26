package grouphome.webapp.entity;

import grouphome.core.entity.base.EntityBase;
import grouphome.webapp.converter.customer.inquiry.CustomerSalesContactConverter;
import grouphome.webapp.converter.customer.inquiry.CustomerSalesDecisionConverter;
import grouphome.webapp.converter.office.OfficeRoomContentConverter;
import grouphome.webapp.dto.requests.customer.inquiry.CustomerSalesSaveRequestDto.Contact;
import grouphome.webapp.dto.requests.customer.inquiry.CustomerSalesSaveRequestDto.Decision;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "t_customer_sales")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerSalesEntity extends EntityBase {
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
    @Column(name = "inquiry_info_id", nullable = false, unique = true)
    private Long inquiryInfoId; 

    /**
     * 初回問合わせ
     */
    @Column(name = "first_inquiry_date")
    private LocalDate firstInquiryDate; 

    /**
     * 初回問合わせ方法
     */
    @Column(name = "first_inquiry_how")
    private Integer firstInquiryHow; 

    /**
     * 連絡情報
     */
    @Convert(converter = CustomerSalesContactConverter.class)
    @Column(name = "contact", columnDefinition = "JSON", nullable = false)
    private Contact contact;

    /**
     * 意思決定者情報
     */
    @Convert(converter = CustomerSalesDecisionConverter.class)
    @Column(name = "decision", columnDefinition = "JSON", nullable = false)
    private Decision decision;
}