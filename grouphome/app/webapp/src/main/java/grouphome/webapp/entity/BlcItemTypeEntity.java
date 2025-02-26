package grouphome.webapp.entity;

import grouphome.core.entity.base.EntityBase;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "m_blc_item_type")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BlcItemTypeEntity extends EntityBase {
    /**
     * ID 
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    /**
     * 項目種別(英記) 
     */
    @Column(name = "name", nullable = false, unique = true, length = 32)
    private String name;

    /**
     * 説明(日本語) 
     */
    @Column(name = "remark", length = 32)
    private String remark;

}
