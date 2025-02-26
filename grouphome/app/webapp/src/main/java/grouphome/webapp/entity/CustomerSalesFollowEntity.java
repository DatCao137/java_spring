package grouphome.webapp.entity;

import grouphome.core.entity.base.EntityBase;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "t_customer_sales_follow", uniqueConstraints = @UniqueConstraint(columnNames = {"sales_info_id", "step"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerSalesFollowEntity extends EntityBase {
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
    @Column(name = "sales_info_id", nullable = false)
    private Long salesInfoId; 

    /**
     * 段階
     */
    @Column(name = "step", nullable = false)
    private Integer step; 

    /**
     * フォロー日付
     */
    @Column(name = "follow_date")
    private LocalDate followDate; 

    /**
     * 担当者職員ID
     */
    @Column(name = "staff_id")
    private Long staffId;

    /**
     * 担当職員名
     */
    @Column(name = "staff_name", length = 128)
    private String staffName; 

    /**
     * フォロー内容
     */
    @Column(name = "contents", length = 255)
    private String contents; 
}