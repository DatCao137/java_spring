package grouphome.webapp.entity;

import grouphome.core.entity.base.EntityBase;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import grouphome.webapp.converter.customer.inquiry.ProfileIntroducerConverter;
import grouphome.webapp.converter.customer.inquiry.ProfileDisabledConverter;
import grouphome.webapp.converter.customer.inquiry.ProfilePocketBookConverter;
import grouphome.webapp.converter.customer.inquiry.ProfileServiceConverter;
import grouphome.webapp.converter.customer.inquiry.ProfileResidenceConverter;

import grouphome.webapp.dto.requests.customer.inquiry.InquiryProfileSaveRequestDto.*;

@Entity
@Table(name = "t_customer_inquiry_profile")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerInquiryProfileEntity extends EntityBase {
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
     * 紹介者
     */
    @Convert(converter = ProfileIntroducerConverter.class)
    @Column(name = "introducer", columnDefinition = "JSON", nullable = false)
    private Introducer introducer; 

    /**
     * 障害特性
     */
    @Convert(converter = ProfileDisabledConverter.class)
    @Column(name = "disabled", columnDefinition = "JSON", nullable = false)
    private Disabled disabled;

    /**
     * 手帳状況
     */
    @Convert(converter = ProfilePocketBookConverter.class)
    @Column(name = "pocket_book", columnDefinition = "JSON", nullable = false)
    private PocketBook pocketBook;

    /**
     * 利用中サービス
     */
    @Convert(converter = ProfileServiceConverter.class)
    @Column(name = "service", columnDefinition = "JSON", nullable = false)
    private Service service;

    /**
     * 現在の住居
     */
    @Convert(converter = ProfileResidenceConverter.class)
    @Column(name = "residence", columnDefinition = "JSON", nullable = false)
    private Residence residence;

}