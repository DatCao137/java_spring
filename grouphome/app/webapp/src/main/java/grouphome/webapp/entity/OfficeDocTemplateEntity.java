package grouphome.webapp.entity;

import grouphome.core.entity.base.EntityBase;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "m_office_doc_template")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OfficeDocTemplateEntity extends EntityBase {
    /**
     * ID 
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    /**
     * テンプレート種別
     */
    @Column(name = "type", nullable = false)
    private Integer type; 

    /**
     * フォルダ名
     */
    @Column(name = "name", nullable = false, length = 255)
    private String name; 

    /**
     * 親フォルダID
     */
    @Column(name = "parent_id")
    private Long parentId; 
}