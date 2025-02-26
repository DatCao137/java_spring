package grouphome.webapp.repository.impl.office;

import grouphome.webapp.dto.requests.office.OfficeRoomSaveRequestDto;
import grouphome.webapp.dto.responses.office.room.OfficeRoomSaveResponseDto;
import grouphome.webapp.entity.OfficeRoomEntity;
import grouphome.webapp.exception.ApiException;
import grouphome.webapp.repository.define.office.OfficeRoomRepository;
import grouphome.webapp.repository.define.office.OfficeRoomRepositoryCustom;
import grouphome.webapp.utils.ResponseCodeAndMsg;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;
import grouphome.webapp.dto.responses.office.room.OfficeRoomListResponseDto;
import grouphome.webapp.dto.requests.office.OfficeRoomListRequestDto;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public class OfficeRoomRepositoryCustomerImpl implements OfficeRoomRepositoryCustom {
    @PersistenceContext
    private EntityManager entityManager;
    private final OfficeRoomRepository officeRoomRepository;

    public OfficeRoomRepositoryCustomerImpl(OfficeRoomRepository officeRoomRepository) {
        this.officeRoomRepository = officeRoomRepository;
    }


    @Override
    public List<OfficeRoomListResponseDto> findAll(OfficeRoomListRequestDto request) {
        String sql = """
                SELECT
                    dor.id AS id,
                    dor.unit_id AS unitId,
                    dor.name AS name,
                    dor.contents AS contents,
                    dor.updated_at AS updatedAt 
                FROM d_office_room dor 
                WHERE dor.deleted_at IS NULL 
                    AND dor.unit_id = :unitId 
                ORDER BY dor.name ASC
            """;

        Query query = entityManager.createNativeQuery(sql, "OfficeRoomListResponseDtoMapping");
        query.setParameter("unitId", request.getUnitId());
        List<OfficeRoomListResponseDto> results = query.getResultList();

        return results;
    }

    @Override
    @Transactional
    public OfficeRoomSaveResponseDto save(OfficeRoomSaveRequestDto request) {
        Long id = request.getId();
        if (request == null) {
            throw new IllegalArgumentException("Request data cannot be null.");
        }

        OfficeRoomEntity officeRoom = (id == null)
                ? new OfficeRoomEntity()
                : officeRoomRepository.findById4Update(request.getId())
                .orElseGet(OfficeRoomEntity::new);

        if (officeRoom.getUpdatedAt() != null && !officeRoom.getUpdatedAt().isEqual(request.getUpdatedAt())) {
            throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
        }

        officeRoom.setUnitId(request.getUnitId());
        officeRoom.setName(request.getName());
        officeRoom.setContents(request.getContents());
        officeRoom.setUpdatedAt(LocalDateTime.now());
        officeRoom = officeRoomRepository.save(officeRoom);

        OfficeRoomSaveResponseDto detailOfficeRoom = new OfficeRoomSaveResponseDto();
        detailOfficeRoom.setId(officeRoom.getId());

        return detailOfficeRoom;
    }

    @Override
    @Transactional
    public Long delete(Long id) {
        String sql = "UPDATE d_office_room SET deleted_at = NOW() WHERE id = :id";
        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("id", id);
        if (query.executeUpdate() > 0) {
            return id;
        } else {
            return null;
        }
    }
}
