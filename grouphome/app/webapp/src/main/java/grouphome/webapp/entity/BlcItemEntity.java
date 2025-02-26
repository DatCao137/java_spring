package grouphome.webapp.entity;

import grouphome.core.entity.base.EntityBase;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "m_blc_item")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BlcItemEntity extends EntityBase {
    
    /**
     * ID 
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    /**
     * 項目種別
     */
    @Column(name = "item_type_id", nullable = false)
    private Long itemTypeId;

    /**
     * 項目ID 
     */
    @Column(name = "type_id", nullable = false, length = 32)
    private String typeId;

    /**
     * 項目名 
     */
    @Column(name = "name", nullable = false, length = 32)
    private String name;

    /**
     * 表示順 
     */
    @Column(name = "sort", nullable = false)
    private Long sort;

}