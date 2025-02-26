package grouphome.webapp.entity;

import grouphome.core.entity.base.EntityBase;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "d_office_home")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OfficeHomeEntity extends EntityBase {
    /**
     * ID 
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    /**
     * ホーム名
     */
    @Column(name = "name", nullable = false, length = 255)
    private String name;

    /**
     * 事業所ID
     */
    @Column(name = "branch_id", nullable = false)
    private Long branchId; 

    /**
     * 事業所と同じ住所か？
     */
    @Column(name = "same_branch", nullable = false)
    private Boolean sameBranch; 

    /**
     * 所在地
     */
    @Column(name = "addr_id")
    private Long addrId; 
    /**
     * 詳細情報
     */
    @Column(name = "contents", columnDefinition = "JSON")
    private String contents; 
}