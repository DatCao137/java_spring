package grouphome.core.entity.base;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

/**
 * Entity 基底クラス
 */
@MappedSuperclass
@Getter
@Setter
public abstract class EntityBase {

    /**
     * 作成日時
     * -- GETTER --
     *  作成日時を返す
     * -- SETTER --
     *  作成日時をセットする
     */
    @CreationTimestamp
    @Column(updatable = false, name = "created_at", nullable = false)
    protected LocalDateTime createdAt;

    /**
     * 更新日時
     * -- GETTER --
     *  更新日時を返す
     * -- SETTER --
     *  更新日時をセットする
     */
    @UpdateTimestamp
    @Column(name = "updated_at")
    protected LocalDateTime updatedAt;

    /**
     * 削除日
     * -- GETTER --
     * 削除時刻を返します
     * -- SETTER --
     * 削除時刻を設定します
     */
    @Column(name = "deleted_at")
    protected LocalDateTime deletedAt;

    /**
     * データ登録前に共通的に実行されるメソッド
     */
    @PrePersist
    public void preInsert() {
//        LocalDateTime date = LocalDateTime.now();
//        setCreatedAt(date);
//        setUpdatedAt(date);
    }

    /**
     * データ更新前に共通的に実行されるメソッド
     */
    @PreUpdate
    public void preUpdate() {
//        setUpdatedAt(LocalDateTime.now());
    }

}

