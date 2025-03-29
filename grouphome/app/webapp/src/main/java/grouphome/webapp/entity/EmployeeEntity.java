package grouphome.webapp.entity;

import grouphome.core.entity.base.EntityBase;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//import java.time.LocalDateTime;
import java.time.LocalDate;
@Entity
@Table(name = "e_employee")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeEntity extends EntityBase {
    /**
     * ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;
    /**
     * 名前
     */
    @Column(name = "name", length = 255)
    private String name;
    /**
     * 生年月日
     */
    @Column(name = "birth_day")
    private LocalDate birthDay;
    /**
     * 住所
     */
    @Column(name = "address", length = 500)
    private String address;

    /**
     * メッセージ
     */
    @Column(name = "message", columnDefinition = "text")
    private String message;
    /**
     * 工場ID
     */
    @Column(name = "unit_id")
    private Integer unitId;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "image_employee")
    private byte[] imageEmployee;
    
}