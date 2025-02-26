package grouphome.webapp.repository.define.office;

import grouphome.webapp.entity.OfficeRoomManageEntity;
import grouphome.webapp.repository.define.blc_common.BaseRepository;
import grouphome.webapp.repository.define.office.RoomManageRepositoryCustom;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomManageRepository extends BaseRepository<OfficeRoomManageEntity, Long>, RoomManageRepositoryCustom {
}
