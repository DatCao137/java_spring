package grouphome.webapp.repository.impl.office;

import java.util.List;
import grouphome.webapp.dto.requests.office.GeneralRequestDto;
import grouphome.webapp.repository.define.office.UnitRepositoryCustom;
import jakarta.persistence.*;
import org.springframework.stereotype.Repository;

@Repository
public class UnitRepositoryImpl implements UnitRepositoryCustom {
    @PersistenceContext
    private EntityManager entityManager;

    /**
     * Get unit info for office details
     *
     * @param request BranchRequestDto
     * @return List<Object[]>
     */
    @Override
    public List<Object[]> getUnit(GeneralRequestDto request) {
        String sql = """
                SELECT  unit.id AS unitId
                    ,   unit.home_id AS homeId
                    ,   unit.name AS unitName
                    ,   unit.addr_id AS addrId
                    ,   addr.post_no AS postNo
                    ,   addr.pref_id AS prefId
                    ,   pref.name AS prefName
                    ,	addr.city AS city
                    ,	addr.town AS town
                    ,   addr.tel AS tel
                    ,   addr.fax AS fax
                    ,   unit.mail AS mail
                    ,   unit.contents AS contents
                    ,   unit.updated_at AS updatedAtUnit
                    ,   addr.updated_at AS updatedAtAddr
                FROM d_office_unit as unit
                LEFT JOIN d_office_home AS home ON unit.home_id = home.id AND home.deleted_at IS NULL
                LEFT JOIN d_blc_addr AS addr ON unit.addr_id = addr.id AND addr.deleted_at IS NULL
                LEFT JOIN (SELECT id FROM m_blc_item_type AS m WHERE m.name = 'prefectures') AS item_type_pref ON TRUE
                LEFT JOIN m_blc_item AS pref ON pref.type_id = addr.pref_id AND pref.item_type_id = item_type_pref.id
                WHERE unit.home_id = :homeId
                  AND unit.deleted_at IS NULL
                """;

        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("homeId", request.getHomeId());

        return query.getResultList();
    }
}
