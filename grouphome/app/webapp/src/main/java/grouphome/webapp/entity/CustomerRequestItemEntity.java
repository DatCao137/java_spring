package grouphome.webapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import grouphome.core.entity.base.EntityBase;
import grouphome.webapp.converter.customer.RequestContentConverter;
import grouphome.webapp.dto.requests.customer.SaveRequestRequestDto.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "t_customer_request_item")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerRequestItemEntity extends EntityBase {
    /**
     * ID 
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    /**
     * 申請情報ID
     */
    @Column(name = "request_info_id", nullable = false)
    private Long requestInfoId; 

    @OneToOne
    @JoinColumn(name = "request_info_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    private CustomerRequestEntity requestInfo;

    /**
     * 内容
     */
    @Convert(converter = RequestContentConverter.class)
    @Column(name = "contents", columnDefinition = "JSON", nullable = false)
    private Contents contents;
}