package grouphome.webapp.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import grouphome.core.entity.base.EntityBase;
import grouphome.webapp.converter.customer.RequestDesiredDateConverter;
import grouphome.webapp.converter.customer.RequestRepresentativeInfoConverter;
import grouphome.webapp.dto.requests.customer.SaveRequestRequestDto.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "t_customer_request")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerRequestEntity extends EntityBase {
    /**
     * ID 
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    /**
     * 氏名
     */
    @Column(name = "name", length = 128)
    private String name; 

    /**
     * 申込日
     */
    @Column(name = "request_date")
    private LocalDateTime requestDate; 
    /**
     * 種類・申込書
     */
    @Column(name = "request_type", columnDefinition = "ENUM('visit', 'movein')")
    private String requestType;

    /**
     * 種類・項目
     */
    @Column(name = "request_item", columnDefinition = "ENUM('visit', 'exp', 'exp-free', 'exp-pay', 'movein')")
    private String requestItem;

    /**
     * 対象事業所(ホーム)
     */
    @Column(name = "home_id")
    private Long homeId; 

    @ManyToOne
    @JoinColumn(name = "home_id", referencedColumnName = "id", insertable = false, updatable = false)
    private OfficeHomeEntity honeInfo;

    /**
     * 希望日
     */
    @Convert(converter = RequestDesiredDateConverter.class)
    @Column(name = "desired_date", columnDefinition = "JSON")
    private DesiredDate desiredDate;

    /**
     * 代表情報
     */
    @Convert(converter = RequestRepresentativeInfoConverter.class)
    @Column(name = "representative_info", columnDefinition = "JSON")
    private RepresentativeInfo representativeInfo;

    /**
     * 利用者ID
     */
    @Column(name = "customer_id")
    private Long customerId;

    /**
     * 補足
     */
    @Column(name = "remark", columnDefinition = "TEXT")
    private String remark;

    @OneToOne(mappedBy = "requestInfo")
    @JsonIgnore
    private CustomerRequestItemEntity requestInfoDetail;

    public enum RequestType {
        visit("visit"),
        movein("movein");

        private final String value;

        RequestType(String value) {
            this.value = value;
        }

        @Override
        public String toString() {
            return this.value;
        }

        @JsonCreator
        public static RequestType fromValue(String value) {
            for (RequestType item : RequestType.values()) {
                if (item.value.equalsIgnoreCase(value)) {
                    return item;
                }
            }
            throw new IllegalArgumentException("Request item must be one of 'visit' or 'movein'");
        }
    }

    public enum RequestItem {
        VISIT("visit"),
        EXP("exp"),
        EXP_FREE("exp-free"),
        EXP_PAY("exp-pay"),
        MOVEIN("movein");

        private final String value;

        RequestItem(String value) {
            this.value = value;
        }

        @Override
        public String toString() {
            return this.value;
        }

        @JsonCreator
        public static RequestItem fromValue(String value) {
            for (RequestItem item : RequestItem.values()) {
                if (item.value.equalsIgnoreCase(value)) {
                    return item;
                }
            }
            throw new IllegalArgumentException("Request item must be one of 'visit', 'exp', 'exp-free', 'exp-pay', or 'movein'");
        }
    }
}
