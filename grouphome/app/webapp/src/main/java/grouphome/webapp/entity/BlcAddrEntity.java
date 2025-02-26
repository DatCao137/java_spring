package grouphome.webapp.entity;

import grouphome.core.entity.base.EntityBase;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "d_blc_addr")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BlcAddrEntity extends EntityBase {
    /**
     * ID 
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    /**
     * 郵便番号
     */
    @Column(name = "post_no", length = 8)
    private String postNo;

    /**
     * 都道府県
     */
    @Column(name = "pref_id")
    private Integer prefId;

    /**
     * 市区
     */
    @Column(name = "city", length = 16)
    private String city;

    /**
     * 町村以下
     */
    @Column(name = "town", length = 255)
    private String town;

    /**
     * 電話番号
     */
    @Column(name = "tel", length = 13)
    private String tel;

    /**
     * FAX番号
     */
    @Column(name = "fax", length = 13)
    private String fax;
}