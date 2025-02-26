package grouphome.webapp.entity;

import grouphome.core.entity.base.EntityBase;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "d_facility_state_templates")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FacilityStateTemplatesEntity extends EntityBase {
    /**
     * ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Integer id;

    /**
     * 住居ID
     */
    @Column(name = "unit_id")
    private Integer unitId;

    /**
     * 時間帯
     */
    @Column(name = "zone", columnDefinition = "ENUM('morning', 'noon', 'night')")
    private String zone;

    /**
     * メッセージ
     */
    @Column(name = "message", columnDefinition = "TEXT")
    private String message;
}