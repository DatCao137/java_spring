package grouphome.webapp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "m_blc_postal_address")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BlcPostalAddressEntity {

    /**
     * ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    /**
     * 郵便番号
     */
    @Column(name = "post_no", nullable = false, length = 7)
    private String postNo;

    /**
     * 都道府県名
     */
    @Column(name = "pref", nullable = false, length = 4)
    private String pref;

    /**
     * 市区町村名
     */
    @Column(name = "city", nullable = false, length = 16)
    private String city;

    /**
     * その他
     */
    @Column(name = "town", nullable = false, length = 64)
    private String town;

}