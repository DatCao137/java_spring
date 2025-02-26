package grouphome.webapp.entity;

import java.math.BigDecimal;

import grouphome.core.entity.base.EntityBase;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "t_office_personnel_standards")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OfficePersonnelStandardsEntity extends EntityBase {
    /**
     * ID 
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    /**
     * 対象年月
     */
    @Column(name = "yyyymm", nullable = false, length = 6)
    private String yyyymm;
  
    /**
     * ユニットID
     */
    @Column(name = "unit_id", nullable = false)
    private Long unitId;
    
    /**
     * 利用者の数
     */
    @Column(name = "total", nullable = false)
    private BigDecimal total;

    /**
     * 区分3の人数
     */
    @Column(name = "category3", nullable = false)
    private BigDecimal category3;

    /**
     * 区分4の人数
     */
    @Column(name = "category4", nullable = false)
    private BigDecimal category4;
    
    /**
     * 区分5の人数
     */
    @Column(name = "category5", nullable = false)
    private BigDecimal category5;
    
    /**
     * 区分6の人数
     */
    @Column(name = "category6", nullable = false)
    private BigDecimal category6;
    
    /**
     * 必要世話人数
     */
    @Column(name = "caregivers", nullable = false)
    private BigDecimal caregivers;
    
    /**
     * 必要生活支援員数
     */
    @Column(name = "supporter", nullable = false)
    private BigDecimal supporter;
}