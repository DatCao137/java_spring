package grouphome.webapp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "m_office_qualification")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OfficeQualificationEntity {
    
    /**
     * ID 
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    /**
     * 資格種別
     */
    @Column(name = "type", columnDefinition = "ENUM('common', 'care', 'related ', 'construction', 'etc')")
    private String type;

    /**
     * 資格名
     */
    @Column(name = "name", length = 255, nullable = false)
    private String name;

    /**
     * 更新条件
     */
    @Column(name = "limit", columnDefinition = "JSON")
    private String limit; 

    @PrePersist
    private void setDefaultLimit() {
        if (this.limit == null) {
            this.limit = "{\"period\": false, \"rangeYear\": null}";
        }
    }
}