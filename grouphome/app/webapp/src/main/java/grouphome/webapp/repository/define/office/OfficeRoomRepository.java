package grouphome.webapp.repository.define.office;

import grouphome.webapp.entity.OfficeRoomEntity;
import grouphome.webapp.entity.OfficeStaffEntity;
import grouphome.webapp.repository.define.blc_common.BaseRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OfficeRoomRepository extends JpaRepository<OfficeRoomEntity, Long>, BaseRepository<OfficeRoomEntity, Long> {

}
