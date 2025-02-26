package grouphome.webapp.entity;

import grouphome.core.entity.base.EntityBase;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "d_office_doc_path")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OfficeDocPathEntity extends EntityBase {
    /**
     * ID 
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    /**
     * フォルダ名
     */
    @Column(name = "name", nullable = false, length = 255)
    private String name; 

    /**
     * ベースフラグ
     */
    @Column(name = "is_base", nullable = false)
    private Boolean isBase; 

    /**
     * 親フォルダID
     */
    @Column(name = "parent_id")
    private Long parentId; 
}