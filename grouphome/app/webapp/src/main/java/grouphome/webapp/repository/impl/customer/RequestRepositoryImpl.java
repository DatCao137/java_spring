package grouphome.webapp.repository.impl.customer;

import com.fasterxml.jackson.databind.ObjectMapper;
import grouphome.webapp.dto.requests.customer.RequestListRequestDto;
import grouphome.webapp.dto.responses.customer.request.ListResponseDto;
import grouphome.webapp.repository.define.customer.RequestRepositoryCustom;
import grouphome.webapp.repository.impl.blc_common.PagerRepositoryImpl;
import grouphome.webapp.utils.SQLUtils;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class RequestRepositoryImpl extends PagerRepositoryImpl implements RequestRepositoryCustom {
    @PersistenceContext
    private EntityManager entityManager;

    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public Page<ListResponseDto> findAll(RequestListRequestDto request, Pageable pageable) {
        String baseSql = """
                SELECT
                    tcr.id AS id,
                    tcr.name AS name,
                    tcr.request_date AS requestDate,
                    tcr.request_type AS requestType,
                    tcr.request_item AS requestItem,
                    tcr.customer_id AS customerId,
                    tcr.home_id AS homeId,
                    tcr.desired_date AS desiredDate,
                    tcr.representative_info AS representative,
                    tcr.remark AS remark,
                    tcri.contents AS contents,
                    doh.name AS homeName,
                    tcri.id AS requestInfoDetailId,
                    tcr.updated_at AS updatedAtRequest
                FROM t_customer_request tcr
                LEFT JOIN t_customer_request_item tcri ON tcr.id = tcri.request_info_id
                LEFT JOIN d_office_home doh ON tcr.home_id = doh.id
            """;

        StringBuilder whereClause = new StringBuilder();
        Map<String, Object> parameters = new HashMap<>();

        whereClause.append("tcr.deleted_at IS NULL");
        String requestId = request.getFilter().getId();
        if (requestId != null && requestId.isEmpty()){
            whereClause.append(" AND tcr.id IS NULL");
        }
        SQLUtils.andCondition(whereClause, parameters, "tcr.id = :id", "id", requestId != null && !requestId.isEmpty() ? requestId : null);

        String requestName = request.getFilter().getName();
        if (requestName != null && requestName.isEmpty()){
            whereClause.append(" AND tcr.name =''");
        }
        SQLUtils.andCondition(whereClause, parameters, "tcr.name LIKE :name", "name", requestName != null && !requestName.isEmpty() ? "%" +requestName + "%" : null);

        String requestHomeName = request.getFilter().getHomeName();
        if (requestHomeName != null && requestHomeName.isEmpty()){
            whereClause.append(" AND doh.name IS NULL");
        }
        SQLUtils.andCondition(whereClause, parameters, "doh.name LIKE :homeName", "homeName", requestHomeName != null && !requestHomeName.isEmpty() ? "%" + requestHomeName + "%" : null);

        // Handle requestDate as a time period
        String requestDateRange = request.getFilter().getRequestDate();
        if (requestDateRange != null && !requestDateRange.isEmpty()) {
            String[] dates = new String[0];
            if (requestDateRange.length() == 1){
            // Case when both startDate and endDate are not provided: find records with request_date as NULL
            // Case when clearing the calendar
                whereClause.append(" AND DATE(tcr.request_date) IS NULL");
            } else {
                dates = requestDateRange.split(",");
            }
            if (dates.length == 2) {
            String startDate = dates[0].trim();
            String endDate = dates[1].trim();

            if (startDate.equals(endDate)) {
                whereClause.append(" AND DATE(tcr.request_date) = :specificDate");
                parameters.put("specificDate", startDate);
                } else {
                    whereClause.append(" AND DATE(tcr.request_date) BETWEEN :startDate AND :endDate");
                    parameters.put("startDate", startDate);
                    parameters.put("endDate", endDate);
                }
            }
            // Case when only startDate is provided
            else if (dates.length == 1) {
                whereClause.append(" AND DATE(tcr.request_date) >= :startDate");
                parameters.put("startDate", dates[0]);
            }

        } else if (requestDateRange != null && requestDateRange.isEmpty()){
            // Case when neither startDate nor endDate is provided: find records with request_date as NULL
            // Case when the calendar is not cleared
            whereClause.append(" AND DATE(tcr.request_date) IS NULL");
        }

        String strDesiredDate = request.getFilter().getDesiredDate();
        if (strDesiredDate != null) {
            if (strDesiredDate.isEmpty() || strDesiredDate.length() == 1 ) {
            // Case when desired_date is empty
            whereClause.append(" AND ("
                + "((JSON_UNQUOTE(JSON_EXTRACT(tcr.desired_date, '$.first.date')) = 'null') AND (JSON_UNQUOTE(JSON_EXTRACT(tcr.desired_date, '$.second.date'))  = 'null') AND (JSON_UNQUOTE(JSON_EXTRACT(tcr.desired_date, '$.desired')) = 'null')) "
                + "OR ((JSON_EXTRACT(tcr.desired_date, '$.desired') = '') AND (JSON_EXTRACT(tcr.desired_date, '$.first.date') IS NULL)) "
                + ")");
            } else {
                String[] datesDesired = strDesiredDate.split(",");
                if (datesDesired.length == 2) {
                    String startDate = datesDesired[0].trim();
                    String endDate = datesDesired[1].trim();

                    if (startDate.equals(endDate)) {
                        whereClause.append(" AND ((JSON_EXTRACT(tcr.desired_date, '$.first.date') = :specificDesiredDate)"
                            + " OR (JSON_EXTRACT(tcr.desired_date, '$.second.date') = :specificDesiredDate)"
                            + " OR (LEFT(JSON_UNQUOTE(JSON_EXTRACT(tcr.desired_date, '$.desired')), 7) = LEFT(DATE_FORMAT(:specificDesiredDate, '%Y-%m'), 7)))");
                        parameters.put("specificDesiredDate", startDate);
                    } else {
                      whereClause.append(" AND ("
                          + "  (CASE WHEN :startDate IS NULL OR :startDate = '' "
                          + "    THEN (CAST(JSON_EXTRACT(tcr.desired_date, '$.first.date') AS DATE) <= :endDate "
                          + "          OR CAST(JSON_EXTRACT(tcr.desired_date, '$.second.date') AS DATE) <= :endDate "
                          + "          OR (JSON_UNQUOTE(JSON_EXTRACT(tcr.desired_date, '$.desired')) <>'' AND JSON_UNQUOTE(JSON_EXTRACT(tcr.desired_date, '$.desired')) <> 'null' AND (LEFT(JSON_UNQUOTE(JSON_EXTRACT(tcr.desired_date, '$.desired')), 7) "
                          + "          <= LEFT(DATE_FORMAT(:endDate, '%Y-%m'), 7)))) "
                          + "    ELSE (CAST(JSON_EXTRACT(tcr.desired_date, '$.first.date') AS DATE) BETWEEN :startDate AND :endDate "
                          + "          OR CAST(JSON_EXTRACT(tcr.desired_date, '$.second.date') AS DATE) BETWEEN :startDate AND :endDate "
                          + "          OR LEFT(JSON_UNQUOTE(JSON_EXTRACT(tcr.desired_date, '$.desired')), 7) "
                          + "          BETWEEN LEFT(DATE_FORMAT(:startDate, '%Y-%m'), 7) AND LEFT(DATE_FORMAT(:endDate, '%Y-%m'), 7)) "
                          + "  END)"
                          + ")");
                        parameters.put("startDate", startDate);
                        parameters.put("endDate", endDate);
                    }
                } else if (datesDesired.length == 1) {
                    String startDate = datesDesired[0].trim();
                   whereClause.append(" AND ("
                       + " (CAST(JSON_EXTRACT(tcr.desired_date, '$.first.date') AS DATE) >= :startDate)"
                       + " OR (CAST(JSON_EXTRACT(tcr.desired_date, '$.second.date') AS DATE) >= :startDate)"
                       + " OR (JSON_UNQUOTE(JSON_EXTRACT(tcr.desired_date, '$.desired')) <>'' AND JSON_UNQUOTE(JSON_EXTRACT(tcr.desired_date, '$.desired')) <> 'null'"
                       + " AND LEFT(JSON_UNQUOTE(JSON_EXTRACT(tcr.desired_date, '$.desired')), 7) >= LEFT(DATE_FORMAT(:startDate, '%Y-%m'), 7))"
                   + ")");
                    parameters.put("startDate", startDate);
                }
            }
        }

        String strRequestType = request.getFilter().getRequestType();
        if (strRequestType != null && !strRequestType.isEmpty()) {
            Set<String> requestType = new HashSet<>();
            String[] split = strRequestType.split(",");
            for (int i = 0; i < split.length; i++) {
                requestType.add(split[i]);
            }
            whereClause.append(" AND tcr.request_type IN (:requestType)");
            parameters.put("requestType", requestType);
        }
        if (strRequestType != null && strRequestType.isEmpty()){
            whereClause.append(" AND tcr.request_type is NULL");
        }

        String strRequestItem = request.getFilter().getRequestItem();
        if (strRequestItem != null && !strRequestItem.isEmpty()) {
            Set<String> requestItem = new HashSet<>();
            String[] split = strRequestItem.split(",");
            for (int i = 0; i < split.length; i++) {
                requestItem.add(split[i]);
            }
            whereClause.append(" AND tcr.request_item IN (:requestItem)");
            parameters.put("requestItem", requestItem);
        }
        if (strRequestItem != null && strRequestItem.isEmpty()){
            whereClause.append(" AND tcr.request_item is NULL");
        }

        String requestRepresentativeName = request.getFilter().getRepresentativeName();
        if (requestRepresentativeName != null && requestRepresentativeName.isEmpty()){
            whereClause.append(" AND JSON_EXTRACT(tcr.representative_info, '$.name') =''");
        }
        SQLUtils.andCondition(whereClause, parameters, "JSON_EXTRACT(tcr.representative_info, '$.name') LIKE :representativeName", "representativeName", requestRepresentativeName != null && !requestRepresentativeName.isEmpty() ? "%" + requestRepresentativeName + "%" : null);

        String requestRepresentativeCall = request.getFilter().getRepresentativeCall();
        if (requestRepresentativeCall != null && requestRepresentativeCall.isEmpty()){
            whereClause.append(" AND JSON_EXTRACT(tcr.representative_info, '$.tel') =''");
        }
        SQLUtils.andCondition(whereClause, parameters, "JSON_EXTRACT(tcr.representative_info, '$.tel') LIKE :representativeCall", "representativeCall", requestRepresentativeCall != null && !requestRepresentativeCall.isEmpty() ? "%" + requestRepresentativeCall + "%" : null);

        String requestRemark = request.getFilter().getRemark();
        if (requestRemark != null && requestRemark.isEmpty()){
            whereClause.append(" AND tcr.remark = ''");
        }
        SQLUtils.andCondition(whereClause, parameters, "tcr.remark LIKE :remark", "remark", requestRemark != null && !requestRemark.isEmpty() ? "%" + requestRemark + "%" : null);

        String sql = baseSql + (!whereClause.isEmpty() ? " WHERE " + whereClause : "");
        String orderBy = " ORDER BY tcr.created_at DESC";
        sql += orderBy;
        Query query = entityManager.createNativeQuery(sql, "RequestListResponseDtoMapping");

        parameters.forEach(query::setParameter);

        query.setFirstResult((int) pageable.getOffset());
        query.setMaxResults(pageable.getPageSize());

        List<ListResponseDto> results = query.getResultList();

        // Count query for total records
        String joinSql = "LEFT JOIN t_customer_request_item tcri ON tcr.id = tcri.request_info_id " +
                        "LEFT JOIN d_office_home doh ON tcr.home_id = doh.id ";
        String countSql = "SELECT COUNT(*) FROM t_customer_request tcr " + joinSql + (!whereClause.isEmpty() ? " WHERE " + whereClause : "");
        Query countQuery = entityManager.createNativeQuery(countSql);

        parameters.forEach(countQuery::setParameter);

        long totalRecords = ((Number) countQuery.getSingleResult()).longValue();

        return new PageImpl<>(results, pageable, totalRecords);
    }
}
