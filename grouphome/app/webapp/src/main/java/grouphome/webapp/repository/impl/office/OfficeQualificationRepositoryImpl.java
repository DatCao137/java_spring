package grouphome.webapp.repository.impl.office;

import com.fasterxml.jackson.core.type.TypeReference;
import grouphome.webapp.dto.responses.office.qualification.OfficeQualificationListResponseDto;
import grouphome.webapp.repository.define.office.OfficeQualificationRepositoryCustom;
import grouphome.webapp.utils.JsonUtils;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class OfficeQualificationRepositoryImpl implements OfficeQualificationRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<OfficeQualificationListResponseDto> getList() {
        String sql = """
            SELECT
                oq.id,
                oq.type,
                oq.name,
                oq.limit as limitJson
            FROM
                m_office_qualification oq
            """;

        Query query = entityManager.createNativeQuery(sql, "OfficeQualificationListResponseDtoMapping");
        List<OfficeQualificationListResponseDto> result = query.getResultList();
        result.forEach(dto -> {
            dto.setLimit(JsonUtils.parseJson(dto.getLimitJson(), new TypeReference<>() {
            }));
        });
        return result;
    }
}
