package grouphome.webapp.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import grouphome.core.entity.base.EntityBase;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "t_office_room_manage")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OfficeRoomManageEntity extends EntityBase {
    /**
     * ID 
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    /**
     * 顧客ID
     */
    @Column(name = "customer_id", nullable = false)
    private Long customerId;
  
    /**
     * 居室ID
     */
    @Column(name = "room_id", nullable = false)
    private Long roomId;
    
    /**
     * ユニットID
     */
    @Column(name = "unit_id", nullable = false)
    private Long unitId;

    /**
     * 入居開始日
     */
    @Column(name = "movein_at", nullable = false)
    private LocalDate moveinAt;

    /**
     * 退去・移動日
     */
    @Column(name = "leaving_at")
    private LocalDate leavingAt;
    
    /**
     * 障がい支援区分
     */
    @Column(name = "category", nullable = false)
    private Integer category;
}