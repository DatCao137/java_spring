package grouphome.webapp.repository.impl.office;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import grouphome.webapp.dto.requests.office.DocRequestDto;
import grouphome.webapp.repository.define.office.OfficeDocFileRepositoryCustom;
import grouphome.webapp.dto.responses.office.doc.ListResponseDto;

import grouphome.webapp.repository.impl.blc_common.PagerRepositoryImpl;
import grouphome.webapp.utils.SQLUtils;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class DocManageRepositoryImpl extends PagerRepositoryImpl implements OfficeDocFileRepositoryCustom {
    @PersistenceContext
    private EntityManager entityManager;

    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public Page<ListResponseDto> findAll(DocRequestDto request, Pageable pageable) {
        Integer pathId = request.getFilter().getPathId() == null? 0 : request.getFilter().getPathId();
        String docName = request.getFilter().getDocName() != null && !request.getFilter().getDocName().isEmpty() ? "%" + request.getFilter().getDocName() + "%" : null;
        String fileName = request.getFilter().getFileName() != null && !request.getFilter().getFileName().isEmpty() ? "%" + request.getFilter().getFileName() + "%" : null;
        String comment = request.getFilter().getComment() != null && !request.getFilter().getComment().isEmpty() ? "%" + request.getFilter().getComment() + "%" : null;
        String created_at = request.getFilter().getCreated_at() != null && !request.getFilter().getCreated_at().isEmpty() ? request.getFilter().getCreated_at() : null;
        String updated_at = request.getFilter().getUpdated_at() != null && !request.getFilter().getUpdated_at().isEmpty() ? request.getFilter().getUpdated_at() : null;
        String baseSql = """
                SELECT 
                docfile.id 			AS id
            ,   docfile.doc_id 		AS docId
            ,   doc.name 			AS docName
            ,	docfile.filename 	AS fileName
            ,	docfile.ext 	    AS ext
            ,	docfile.data 	    AS dataFile
            ,	docfile.comment		AS comment
            ,	DATE_FORMAT(doc.created_at, '%Y/%m/%d %H:%i:%s')	AS created_at
            ,	DATE_FORMAT(doc.updated_at, '%Y/%m/%d %H:%i:%s')	AS updated_at	
            FROM d_office_doc_path  AS docpath
            INNER JOIN d_office_doc AS doc 
                ON docpath.id  = doc.path_id
            INNER JOIN d_office_doc_file AS docfile
                ON doc.id = docfile.doc_id
            """;

        StringBuilder whereClause = new StringBuilder();
        Map<String, Object> parameters = new HashMap<>();

        whereClause.append("docpath.deleted_at IS NULL AND doc.deleted_at IS NULL AND docfile.deleted_at IS NULL");

        SQLUtils.andCondition(whereClause, parameters, "docpath.id = :pathId", "pathId", pathId);
        SQLUtils.andCondition(whereClause, parameters, "doc.name LIKE :docName", "docName", docName);
        SQLUtils.andCondition(whereClause, parameters, "docfile.filename LIKE :fileName", "fileName", fileName);
        SQLUtils.andCondition(whereClause, parameters, "docfile.comment LIKE :comment", "comment", comment);
        SQLUtils.andCondition(whereClause, parameters, "CAST(docfile.created_at AS DATE) = :created_at", "created_at", created_at);
        SQLUtils.andCondition(whereClause, parameters, "CAST(docfile.updated_at AS DATE) = :updated_at", "updated_at", updated_at);

        String sql = baseSql + (!whereClause.isEmpty() ? " WHERE " + whereClause : "");
        sql = sql + " ORDER BY docfile.created_at DESC ";

        Query query = entityManager.createNativeQuery(sql, "ListResponseDtoMapping");

        parameters.forEach(query::setParameter);

        query.setFirstResult((int) pageable.getOffset());
        query.setMaxResults(pageable.getPageSize());

        List<ListResponseDto> results = query.getResultList();

        // Count query for total records
        String countSql = """
                    SELECT 
                        COUNT(1)	
                    FROM d_office_doc_path  AS docpath
                    INNER JOIN d_office_doc AS doc 
                        ON docpath.id  = doc.path_id
                    INNER JOIN d_office_doc_file AS docfile
                        ON doc.id = docfile.doc_id 
                """; 
        countSql = countSql + (!whereClause.isEmpty() ? " WHERE " + whereClause : "");
        Query countQuery = entityManager.createNativeQuery(countSql);

        parameters.forEach(countQuery::setParameter);

        long totalRecords = ((Number) countQuery.getSingleResult()).longValue();

        return new PageImpl<>(results, pageable, totalRecords);
    }

}
