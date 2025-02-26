package grouphome.webapp.entity;

import grouphome.core.entity.base.EntityBase;
import grouphome.webapp.converter.office.BranchContentConverter;
import grouphome.webapp.converter.office.OfficeRoomContentConverter;
import grouphome.webapp.dto.requests.office.OfficeRoomSaveRequestDto.*;
import grouphome.webapp.dto.requests.office.SaveBranchRequestDto.BranchContent;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "d_office_room")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OfficeRoomEntity extends EntityBase {
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
    @Column(name = "unit_id", nullable = false)
    private Long unitId;

    /**
     * 事業所名
     */
    @Column(name = "name", nullable = false, length = 255)
    private String name;

    /**
     * 詳細情報
     */
    @Convert(converter = OfficeRoomContentConverter.class)
    @Column(name = "contents", columnDefinition = "JSON")
    private Content contents;
}