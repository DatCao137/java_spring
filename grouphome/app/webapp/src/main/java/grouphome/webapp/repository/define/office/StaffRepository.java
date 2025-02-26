package grouphome.webapp.repository.define.office;

import grouphome.webapp.entity.OfficeStaffEntity;
import grouphome.webapp.repository.define.blc_common.BaseRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StaffRepository extends JpaRepository<OfficeStaffEntity, Long>, BaseRepository<OfficeStaffEntity, Long> {
    OfficeStaffEntity findBySmartHrCrewId(String smartHrCrewId);
//    List<OfficeStaffEntity> findAllByBranchId(Integer branchId);
}
