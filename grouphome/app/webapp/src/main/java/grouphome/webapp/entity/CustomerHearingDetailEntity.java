package grouphome.webapp.entity;

import grouphome.core.entity.base.EntityBase;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "t_customer_hearing_detail", uniqueConstraints = @UniqueConstraint(columnNames = {"hearing_info_id", "step"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerHearingDetailEntity extends EntityBase {
    /**
     * ID 
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    /**
     * ヒアリング情報ID
     */
    @Column(name = "hearing_info_id", nullable = false)
    private Long hearingInfoId; 

    /**
     * STEP
     */
    @Column(name = "step", nullable = false)
    private Integer step; 

    /**
     * ヒアリング内容
     */
    @Column(name = "contents", length = 512)
    private String contents; 
}