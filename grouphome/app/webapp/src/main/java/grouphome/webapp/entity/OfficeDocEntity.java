package grouphome.webapp.entity;

import grouphome.core.entity.base.EntityBase;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "d_office_doc")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OfficeDocEntity extends EntityBase {
    /**
     * ID 
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    /**
     * パスID
     */
    @Column(name = "path_id", nullable = false)
    private Long pathId; 

    /**
     * ファイル名
     */
    @Column(name = "name", nullable = false, length = 255)
    private String name; 
}