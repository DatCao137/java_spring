package grouphome.webapp.entity;

import grouphome.core.entity.base.EntityBase;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "m_office_calc_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OfficeCalcItemsEntity extends EntityBase {
    /**
     * ID 
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    /**
     * 類型ID
     */
    @Column(name = "group_home_type_id")
    private Integer groupHomeTypeId; 

    /**
     * 算定項目名
     */
    @Column(name = "name", nullable = false, length = 255)
    private String name;

    /**
     * 選択肢
     */
    @Column(name = "choices", columnDefinition = "JSON")
    private String choices;

    /**
     * 前提
     */
    @Column(name = "depends", columnDefinition = "JSON")
    private String depends;

    /**
     * 区分
     */
    @Column(name = "type", columnDefinition = "ENUM('', 'add', 'del')")
    private String type;
}
