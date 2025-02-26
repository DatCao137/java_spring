package grouphome.webapp.entity;

import grouphome.core.entity.base.EntityBase;
import grouphome.webapp.converter.office.BranchContentConverter;
import grouphome.webapp.dto.requests.office.SaveBranchRequestDto.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "d_office_branch")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OfficeBranchEntity extends EntityBase {
    /**
     * ID 
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    /**
     * 事業所番号
     */
    @Column(name = "no", nullable = false)
    private Long no; 

    /**
     * 事業所名
     */
    @Column(name = "name", nullable = false, length = 255)
    private String name;

    /**
     * 所在地
     */
    @Column(name = "addr_id", nullable = false, unique = true)
    private Long addrId; 

    /**
     * 詳細情報
     */
    @Convert(converter = BranchContentConverter.class)
    @Column(name = "contents", columnDefinition = "JSON")
    private BranchContent contents;

    /**
     * メモ
     */
    @Column(name = "memo", columnDefinition = "TEXT")
    private String memo;
}