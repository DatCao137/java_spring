package grouphome.webapp.repository.impl.office;

import grouphome.webapp.dto.requests.customer.inquiry.*;
import grouphome.webapp.repository.define.office.HomeRepositoryCustom;
import grouphome.webapp.repository.impl.blc_common.PagerRepositoryImpl;
import grouphome.webapp.utils.SQLUtils;
import jakarta.persistence.*;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;
import grouphome.webapp.repository.define.customer.InquiryRepositoryCustom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import grouphome.webapp.dto.responses.customer.inquiry.*;

import java.util.HashMap;
import java.util.Map;
import java.util.List;
import org.springframework.data.domain.PageImpl;
import java.util.Arrays;

@Repository
public class InquiryRepositoryImpl extends PagerRepositoryImpl implements InquiryRepositoryCustom {
    @PersistenceContext
    private EntityManager entityManager;

    /**
     * Get inquiry list
     *
     * @param request GeneralRequestDto
     * @return Map<String, Object>
     */
    @Override
    public Page<ListResponseDto> getInquiryList(GeneralRequestDto request, Pageable pageable) {
        String baseSql = """
                SELECT  inquiry.id AS id
                    ,   inquiry.name AS name
                    ,   inquiry.gana AS gana
                    ,	inquiry.sex AS sex
                    ,	inquiry.age AS age
                    ,	m1.name AS sexName
                    ,	m2.name AS statusName
                    ,   JSON_UNQUOTE(JSON_EXTRACT(inquiry.inquiry_src, '$.name')) AS inquirySrcName
                    ,   JSON_UNQUOTE(JSON_EXTRACT(inquiry.inquiry_src, '$.staff')) AS inquirySrcStaff
                    ,   NULLIF(JSON_UNQUOTE(JSON_EXTRACT(inquiry.inquiry_src, '$.route')), 'null') AS inquirySrcRoute
                    ,   m3.name AS inquirySrcRouteName
                    ,   JSON_UNQUOTE(JSON_EXTRACT(inquiry.inquiry_src, '$.phone')) AS inquirySrcPhone
                    ,   NULLIF(JSON_UNQUOTE(JSON_EXTRACT(inquiry.inquiry_src, '$.link')), 'null') AS inquirySrcLink
                    ,   m4.name AS inquirySrcLinkName
                    ,   inquiry.status AS status
                    ,   inquiry.next_action AS nextAction
                    ,   inquiry.updated_at AS updatedAt
                FROM t_customer_inquiry AS inquiry
                LEFT JOIN m_blc_item m1 ON inquiry.sex = m1.type_id
                  AND m1.item_type_id = 16
                LEFT JOIN m_blc_item m2 ON inquiry.status = m2.type_id
                  AND m2.item_type_id = 9 
                LEFT JOIN m_blc_item m3 ON JSON_UNQUOTE(JSON_EXTRACT(inquiry.inquiry_src, '$.route')) = m3.type_id
                  AND m3.item_type_id = 7
                LEFT JOIN m_blc_item m4 ON JSON_UNQUOTE(JSON_EXTRACT(inquiry.inquiry_src, '$.link')) = m4.type_id
                  AND m4.item_type_id = 8
                    
                """;

        StringBuilder whereClause = new StringBuilder();
        Map<String, Object> parameters = new HashMap<>();

        whereClause.append("inquiry.deleted_at IS NULL");

        // Add filters
         String condition = "";
         String parameterValue = "";

        //Fillter name
         String nameFilter = request.getFilter().getName();
         if (nameFilter != null) {
            condition = nameFilter.isEmpty() ? "inquiry.name = :name" : "inquiry.name LIKE :name";
            parameterValue = nameFilter.isEmpty() ? "" : "%" + nameFilter + "%";
            SQLUtils.andCondition(whereClause, parameters, condition, "name", parameterValue);
        }

        //Fillter gana
         String ganaFilter = request.getFilter().getGana();
         if (ganaFilter != null) {
            condition = ganaFilter.isEmpty() ? "inquiry.gana = :gana" : "inquiry.gana LIKE :gana";
            parameterValue = ganaFilter.isEmpty() ? "" : "%" + ganaFilter + "%";
            SQLUtils.andCondition(whereClause, parameters, condition, "gana", parameterValue);
        }

        //Fillter nextAction
         String nextActionFilter = request.getFilter().getNextAction();
         if (nextActionFilter != null) {
            condition = nextActionFilter.isEmpty() ? "inquiry.next_action = :nextAction" : "inquiry.next_action LIKE :nextAction";
            parameterValue = nextActionFilter.isEmpty() ? "" : "%" + nextActionFilter + "%";
            SQLUtils.andCondition(whereClause, parameters, condition, "nextAction", parameterValue);
        }

        //Fillter inquirySrcName
         String inquirySrcNameFilter = request.getFilter().getInquirySrcName();
         if (inquirySrcNameFilter != null) {
            condition = inquirySrcNameFilter.isEmpty() ? "JSON_UNQUOTE(inquiry.inquiry_src->'$.name') = :inquirySrcName"  : "JSON_UNQUOTE(inquiry.inquiry_src->'$.name') LIKE :inquirySrcName";
            parameterValue = inquirySrcNameFilter.isEmpty() ? "" : "%" + inquirySrcNameFilter + "%";
            SQLUtils.andCondition(whereClause, parameters, condition, "inquirySrcName", parameterValue);
        }

        //Fillter inquirySrcStaff
         String inquirySrcStaffFilter = request.getFilter().getInquirySrcStaff();
         if (inquirySrcStaffFilter != null) {
            condition = inquirySrcStaffFilter.isEmpty() ? "JSON_UNQUOTE(inquiry.inquiry_src->'$.staff') = :inquirySrcStaff"  : "JSON_UNQUOTE(inquiry.inquiry_src->'$.staff') LIKE :inquirySrcStaff";
            parameterValue = inquirySrcStaffFilter.isEmpty() ? "" : "%" + inquirySrcStaffFilter + "%";
            SQLUtils.andCondition(whereClause, parameters, condition, "inquirySrcStaff", parameterValue);
        }

        //Fillter inquirySrcRoute
         String inquirySrcRouteFilter = request.getFilter().getInquirySrcRoute();
         if (inquirySrcRouteFilter != null) {
            if (inquirySrcRouteFilter.isEmpty()) {
                whereClause.append(" AND JSON_UNQUOTE(JSON_EXTRACT(inquiry.inquiry_src, '$.route')) = 'null' ");
            } else {
                SQLUtils.andCondition(whereClause, parameters, "JSON_UNQUOTE(inquiry.inquiry_src->'$.route') IN (:inquirySrcRoute)", "inquirySrcRoute", Arrays.asList(inquirySrcRouteFilter.split(",")));
            }
        }

        //Fillter inquirySrcPhone
         String inquirySrcPhoneFilter = request.getFilter().getInquirySrcPhone();
         if (inquirySrcPhoneFilter != null) {
            condition = inquirySrcPhoneFilter.isEmpty() ? "JSON_UNQUOTE(inquiry.inquiry_src->'$.phone') = :inquirySrcPhone"  : "JSON_UNQUOTE(inquiry.inquiry_src->'$.phone') LIKE :inquirySrcPhone";
            parameterValue = inquirySrcPhoneFilter.isEmpty() ? "" : "%" + inquirySrcPhoneFilter + "%";
            SQLUtils.andCondition(whereClause, parameters, condition, "inquirySrcPhone", parameterValue);
        }

        //Fillter inquirySrcLink
         String inquirySrcLinkFilter = request.getFilter().getInquirySrcLink();
         if (inquirySrcLinkFilter != null) {
            if (inquirySrcLinkFilter.isEmpty()) {
                whereClause.append(" AND JSON_UNQUOTE(JSON_EXTRACT(inquiry.inquiry_src, '$.link')) = 'null' ");
            } else {
                SQLUtils.andCondition(whereClause, parameters, "JSON_UNQUOTE(inquiry.inquiry_src->'$.link') IN (:inquirySrcLink)", "inquirySrcLink", Arrays.asList(inquirySrcLinkFilter.split(",")));
            }
        }

        //Fillter sex
         String sexFilter = request.getFilter().getSex();
         if (sexFilter != null) {
            if (sexFilter.isEmpty()) {
                whereClause.append(" AND inquiry.sex IS NULL ");
            } else {
                SQLUtils.andCondition(whereClause, parameters, "inquiry.sex IN (:sex)", "sex", Arrays.asList(sexFilter.split(",")));
            }
        }

        //Fillter age
         String ageFilter = request.getFilter().getAge();
         if (ageFilter != null) {
            if (ageFilter.isEmpty() || ageFilter.equals(",")) {
                whereClause.append(" AND inquiry.age IS NULL ");
            } else {
                String[] ageParts = ageFilter.split(",");
                Integer minAge = null;
                Integer maxAge = null;
                if (ageParts.length == 1) {
                    ageParts = new String[] { ageParts[0], "100" }; 
                }
                    
                if(ageParts.length > 1 && !(( ageParts[0] == null || ageParts[0].trim().isEmpty()) && ( ageParts[1] == null || ageParts[1].trim().isEmpty()))) {
                    minAge = (ageParts[0] == null || ageParts[0].trim().isEmpty()) ? 0 : Integer.parseInt(ageParts[0].trim());
                    maxAge = (ageParts[1] == null || ageParts[1].trim().isEmpty()) ? 100 : Integer.parseInt(ageParts[1].trim());
                }
                SQLUtils.andCondition(whereClause, parameters, "inquiry.age BETWEEN :minAge AND :maxAge", "minAge", minAge);
                parameters.put("maxAge", maxAge);
            }
        }

        //Fillter status
         String statusFilter = request.getFilter().getStatus();
         if (statusFilter != null) {
            if (statusFilter.isEmpty()) {
                whereClause.append(" AND inquiry.status IS NULL ");
            } else {
                SQLUtils.andCondition(whereClause, parameters, "inquiry.status IN (:status)", "status", Arrays.asList(statusFilter.split(",")));
            }
        }

        String sql = baseSql + (!whereClause.isEmpty() ? " WHERE " + whereClause : "");
        Query query = entityManager.createNativeQuery(sql, "InquiryListResponseDtoMapping");

        parameters.forEach(query::setParameter);

        query.setFirstResult((int) pageable.getOffset());
        query.setMaxResults(pageable.getPageSize());

        List<ListResponseDto> results = query.getResultList();

        String countSql = "SELECT COUNT(1) FROM (" + sql + ") AS subquery";
        Query countQuery = entityManager.createNativeQuery(countSql);

        parameters.forEach(countQuery::setParameter);

        long totalRecords = ((Number) countQuery.getSingleResult()).longValue();

        return new PageImpl<>(results, pageable, totalRecords);
    }

    /**
     * Get Get details
     *
     * @param request InquiryDetailRequestDto
     * @return Map<String, Object>
     */
    @Override
    public Page<InquiryDetailResponseDto> getDetails(InquiryDetailRequestDto request, Pageable pageable) {
       String baseSql = """
                SELECT  inquiryItem.id AS id
                    ,   inquiryItem.inquiry_info_id AS inquiryInfoId
                    ,   inquiryItem.status AS status
                    ,	m1.name AS statusName
                    ,	inquiryItem.home_id AS homeId
                    ,   home.name AS homeName
                    ,	inquiryItem.gh_data AS ghData
                    ,	inquiryItem.date AS date
                    ,   inquiryItem.updated_at AS updatedAt

                    ,   NULLIF(JSON_UNQUOTE(JSON_EXTRACT(inquiryItem.breakdown, '$.self')), 'null') AS breakdownSelf
                    ,   NULLIF(JSON_UNQUOTE(JSON_EXTRACT(inquiryItem.breakdown, '$.family')), 'null') AS breakdownFamily
                    ,   NULLIF(JSON_UNQUOTE(JSON_EXTRACT(inquiryItem.breakdown, '$.counselor')), 'null') AS breakdownCounselor
                    ,   NULLIF(JSON_UNQUOTE(JSON_EXTRACT(inquiryItem.breakdown, '$.support')), 'null') AS breakdownSupport
                    ,   NULLIF(JSON_UNQUOTE(JSON_EXTRACT(inquiryItem.breakdown, '$.thirdParty')), 'null') AS breakdownThirdParty

                    ,   JSON_UNQUOTE(JSON_EXTRACT(inquiryItem.record, '$.time')) AS recordTime
                    ,   JSON_UNQUOTE(JSON_EXTRACT(inquiryItem.record, '$.visitTime')) AS recordVisitTime
                    ,   NULLIF(JSON_UNQUOTE(JSON_EXTRACT(inquiryItem.record, '$.freeTrial')), 'null') AS recordFreeTrial
                    ,   NULLIF(JSON_UNQUOTE(JSON_EXTRACT(inquiryItem.record, '$.paidTrial')), 'null') AS recordPaidTrial
                    ,   NULLIF(JSON_UNQUOTE(JSON_EXTRACT(inquiryItem.record, '$.ssCompletion')), 'null') AS recordSsCompletion
                    ,   JSON_UNQUOTE(JSON_EXTRACT(inquiryItem.record, '$.contractDate')) AS recordContractDate
                    ,   NULLIF(JSON_UNQUOTE(JSON_EXTRACT(inquiryItem.record, '$.planStatus')), 'null') AS recordPlanStatus
                    ,   m2.name AS recordDlanStatusName
                FROM t_customer_inquiry_item AS inquiryItem
                LEFT JOIN d_office_home home ON inquiryItem.home_id = home.id
                  AND home.deleted_at IS NULL
                LEFT JOIN m_blc_item m1 ON inquiryItem.status = m1.type_id
                  AND m1.item_type_id = 10
                LEFT JOIN m_blc_item m2 ON JSON_UNQUOTE(JSON_EXTRACT(inquiryItem.record, '$.planStatus')) = m2.type_id
                  AND m2.item_type_id = 52
                    
                """;

        StringBuilder whereClause = new StringBuilder();
        Map<String, Object> parameters = new HashMap<>();

        whereClause.append("inquiryItem.deleted_at IS NULL AND inquiryItem.inquiry_info_id = :inquiryIdFilter");
        parameters.put("inquiryIdFilter", request.getFilter().getId());

        String sql = baseSql + (!whereClause.isEmpty() ? " WHERE " + whereClause : "");
        Query query = entityManager.createNativeQuery(sql, "InquiryDetailsResponseDtoMapping");

        parameters.forEach(query::setParameter);

        query.setFirstResult((int) pageable.getOffset());
        query.setMaxResults(pageable.getPageSize());

        List<InquiryDetailResponseDto> results = query.getResultList();

        String countSql = "SELECT COUNT(1) FROM (" + sql + ") AS subquery";
        Query countQuery = entityManager.createNativeQuery(countSql);

        parameters.forEach(countQuery::setParameter);

        long totalRecords = ((Number) countQuery.getSingleResult()).longValue();

        return new PageImpl<>(results, pageable, totalRecords);
    }

    /**
     * get Info Profile
     * 
     * @param Long id
     * @return Object
     */
    @Override
    public ProfileInfoResponseDto getInfoProfile(InquiryRequestDto request) {

        String sql = """
            SELECT  
                profile.id                                                      AS id
            ,   profile.inquiry_info_id                                         AS inquiryInfoId
            ,   JSON_UNQUOTE(JSON_EXTRACT(profile.introducer, '$.name'))        AS introducerName
            ,   JSON_UNQUOTE(JSON_EXTRACT(profile.introducer, '$.type'))        AS introducerType
            ,   JSON_UNQUOTE(JSON_EXTRACT(profile.introducer, '$.addr'))        AS introducerAddr

            ,   JSON_UNQUOTE(JSON_EXTRACT(profile.disabled, '$.type'))          AS disabledType
            ,   JSON_UNQUOTE(JSON_EXTRACT(profile.disabled, '$.class'))         AS disabledClass

            ,   JSON_UNQUOTE(JSON_EXTRACT(profile.pocket_book, '$.type'))       AS pocketBookType
            ,   m1.name                                                         AS pocketBookTypeName
            ,   JSON_UNQUOTE(JSON_EXTRACT(profile.pocket_book, '$.grade'))      AS pocketBookGrade
            ,   JSON_UNQUOTE(JSON_EXTRACT(profile.pocket_book, '$.wheelchair')) AS pocketBookWheelChair
            ,   m2.name                                                         AS pocketBookWheelChairName

            ,   JSON_UNQUOTE(JSON_EXTRACT(profile.service, '$.days'))           AS serviceDays
            ,   JSON_UNQUOTE(JSON_EXTRACT(profile.service, '$.name'))           AS serviceName
            ,   JSON_UNQUOTE(JSON_EXTRACT(profile.service, '$.addr'))           AS serviceAddr
            ,   JSON_UNQUOTE(JSON_EXTRACT(profile.service, '$.visit'))          AS serviceVisit
            ,   JSON_UNQUOTE(JSON_EXTRACT(profile.service, '$.etc'))            AS serviceEtc
            ,   JSON_UNQUOTE(JSON_EXTRACT(profile.service, '$.recipient'))      AS serviceRecipient

            ,   JSON_UNQUOTE(JSON_EXTRACT(profile.residence, '$.type'))         AS residenceType
            ,   JSON_UNQUOTE(JSON_EXTRACT(profile.residence, '$.remark'))       AS residenceRemark
            ,   profile.updated_at                                              AS updatedAt
            FROM t_customer_inquiry AS inquiry
            INNER JOIN t_customer_inquiry_profile AS profile ON inquiry.id = profile.inquiry_info_id
            LEFT JOIN m_blc_item m1 ON JSON_UNQUOTE(JSON_EXTRACT(profile.pocket_book, '$.type')) = m1.type_id
                AND m1.item_type_id = 5
            LEFT JOIN m_blc_item m2 ON JSON_UNQUOTE(JSON_EXTRACT(profile.pocket_book, '$.wheelchair')) = m2.type_id
                AND m2.item_type_id = 14
            WHERE inquiry.id = :inquiryId
            """;

        Query query = entityManager.createNativeQuery(sql, "InquiryProfileResponseDtoMappingEntity");
        query.setParameter("inquiryId", request.getInquiryId());

        ProfileInfoResponseDto result = (ProfileInfoResponseDto) query.getSingleResult();
        
        return result;
    }
    
}
