package grouphome.webapp.entity;

import grouphome.core.entity.base.EntityBase;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "t_customer_hearing")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerHearingEntity extends EntityBase {
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
     * 結果
     */
    @Column(name = "result", length = 512)
    private String result; 

    /**
     * 見込み状況
     */
    @Column(name = "prospect", length = 512)
    private String prospect; 

    /**
     * メモ
     */
    @Column(name = "remark", length = 512)
    private String remark; 
}