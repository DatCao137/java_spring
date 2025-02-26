package grouphome.webapp.entity;

import grouphome.core.entity.base.EntityBase;
import grouphome.webapp.converter.office.UnitContentConverter;
import grouphome.webapp.dto.requests.office.SaveUnitRequestDto.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "d_office_unit")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OfficeUnitEntity extends EntityBase {
    /**
     * ID 
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    /**
     * 所属ホーム
     */
    @Column(name = "home_id", nullable = false)
    private Long homeId; 

    /**
     * 共同生活住居名
     */
    @Column(name = "name", nullable = false, length = 128)
    private String name;

    /**
     * 住所(電話)
     */
    @Column(name = "addr_id", nullable = false, unique = true)
    private Long addrId; 

    /**
     * メールアドレス
     */
    @Column(name = "mail", length = 255)
    private String mail;

    /**
     * 定員数
     */
    @Convert(converter = UnitContentConverter.class)
    @Column(name = "contents", columnDefinition = "JSON")
    private UnitContent contents; 
}