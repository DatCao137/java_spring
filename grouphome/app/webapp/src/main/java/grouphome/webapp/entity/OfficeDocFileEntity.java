package grouphome.webapp.entity;

import grouphome.core.entity.base.EntityBase;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "d_office_doc_file")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OfficeDocFileEntity extends EntityBase {
    /**
     * ID 
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    /**
     * 文書管理情報ID
     */
    @Column(name = "doc_id", nullable = false)
    private Long docId; 

    /**
     * ファイル名
     */
    @Column(name = "filename", nullable = false, length = 255)
    private String filename; 

    /**
     * 拡張子
     */
    @Column(name = "ext", nullable = false, length = 32)
    private String ext; 

    /**
     * ファイルデータ
     */
    @Lob
    @Column(name = "data", nullable = false)
    private byte[] data; 

    /**
     * コメント
     */
    @Column(name = "comment", nullable = false, length = 255)
    private String comment; 
}