package grouphome.webapp.repository.impl.office;

import com.fasterxml.jackson.core.type.TypeReference;
import grouphome.webapp.dto.requests.office.GeneralRequestDto;
import grouphome.webapp.dto.requests.office.StaffDetailRequestDto;
import grouphome.webapp.dto.requests.office.StaffListRequestDto;
import grouphome.webapp.dto.requests.office.StaffSaveQualificationRequestDto;
import grouphome.webapp.dto.requests.office.StaffSaveRequestDto;
import grouphome.webapp.dto.responses.office.staff.DetailResponseDto;
import grouphome.webapp.dto.responses.office.staff.ListResponseDto;
import grouphome.webapp.entity.OfficeStaffEntity;
import grouphome.webapp.exception.ApiException;
import grouphome.webapp.repository.define.office.StaffRepositoryCustom;
import grouphome.webapp.repository.define.office.StaffRepository;
import grouphome.webapp.repository.impl.blc_common.PagerRepositoryImpl;
import grouphome.webapp.utils.JsonUtils;
import grouphome.webapp.utils.ResponseCodeAndMsg;
import grouphome.webapp.utils.SQLUtils;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Repository
@Log4j2
public class StaffRepositoryCustomImpl extends PagerRepositoryImpl implements StaffRepositoryCustom {
    @PersistenceContext
    private EntityManager entityManager;
    private final StaffRepository staffRepository;

    public StaffRepositoryCustomImpl(StaffRepository staffRepository) {
        this.staffRepository = staffRepository;
    }

    @Override
    public List<Object[]> getStaffList(GeneralRequestDto request) {
        String sql = """
                SELECT  s.id AS id
                    ,   s.smart_hr_crew_id AS name
                    ,   CONCAT(s.name_sei, s.name_mei) AS seiMeiName
                FROM d_office_staff AS s
                """;

        Query query = entityManager.createNativeQuery(sql);
        return query.getResultList();
    }
    
    @Override
    public Page<ListResponseDto> findAll(StaffListRequestDto request, Pageable pageable) {
        String baseSql = """
                SELECT
                    dos.id AS id,
                    dos.employee_no AS employeeNo,
                    CONCAT(dos.name_sei, dos.name_mei) AS name,
                    JSON_EXTRACT(affiliations, '$.branch[*].name') AS branchNames,
                    JSON_EXTRACT(affiliations, '$.home[*].name') AS homeNames,
                    JSON_EXTRACT(affiliations, '$.unit[*].name') AS unitNames,
                    m1.name AS occupation,
                    m2.name AS employeeType,
                    m3.name AS enrollmentStatus,
                    CASE
                        WHEN m3.type_id IN (1, 2) THEN
                            CONCAT(
                                FLOOR(TIMESTAMPDIFF(MONTH, JSON_UNQUOTE(JSON_EXTRACT(dos.enrollment, '$.joinAt')), NOW()) / 12), '年',
                                MOD(TIMESTAMPDIFF(MONTH, JSON_UNQUOTE(JSON_EXTRACT(dos.enrollment, '$.joinAt')), NOW()), 12), 'ヶ月'
                            )
                        WHEN m3.type_id = 3 THEN
                            CONCAT(
                                FLOOR(TIMESTAMPDIFF(MONTH, JSON_UNQUOTE(JSON_EXTRACT(dos.enrollment, '$.joinAt')), JSON_UNQUOTE(JSON_EXTRACT(dos.enrollment, '$.leaveAt'))) / 12), '年',
                                MOD(TIMESTAMPDIFF(MONTH, JSON_UNQUOTE(JSON_EXTRACT(dos.enrollment, '$.joinAt')), JSON_UNQUOTE(JSON_EXTRACT(dos.enrollment, '$.leaveAt'))), 12), 'ヶ月'
                            )
                        ELSE NULL
                    END AS enrollmentPeriod,
                    CASE 
                        WHEN JSON_LENGTH(dos.qualification) > 0 THEN 'あり' 
                        ELSE 'なし' 
                    END AS hasQualification
                FROM 
                    d_office_staff dos
                LEFT JOIN 
                    m_blc_item m1 ON dos.occupation_id = m1.id AND m1.item_type_id = 29
                LEFT JOIN 
                    m_blc_item m2 ON dos.employee_type = m2.id AND m2.item_type_id = 30
                LEFT JOIN
                    m_blc_item m3 ON CAST(JSON_EXTRACT(dos.enrollment, '$.status') AS UNSIGNED) = m3.id
                    AND m3.item_type_id = 32
            """;

        StringBuilder whereClause = new StringBuilder();
        Map<String, Object> parameters = new HashMap<>();

        whereClause.append("dos.deleted_at IS NULL");

        // Add filters
//        SQLUtils.andCondition(whereClause, parameters, "dos.branch_id IN (:branchIds)", "branchIds", request.getFilter().getBranchId() != null ? Arrays.asList(request.getFilter().getBranchId().split(",")) : null);
//        SQLUtils.andCondition(whereClause, parameters, "dos.main_home_id IN (:mainHomeIds)", "mainHomeIds", request.getFilter().getMainHomeId() != null ? Arrays.asList(request.getFilter().getMainHomeId().split(",")) : null);
//        SQLUtils.andCondition(whereClause, parameters, "dos.sub_home_id IN (:subHomeIds)", "subHomeIds", request.getFilter().getSubHomeId() != null ? Arrays.asList(request.getFilter().getSubHomeId().split(",")) : null);
        SQLUtils.andCondition(whereClause, parameters, "dos.employee_no = :employeeNo", "employeeNo", request.getFilter().getEmployeeNo() != null ? request.getFilter().getEmployeeNo() : null);
        SQLUtils.andCondition(whereClause, parameters, "CONCAT(dos.name_sei, dos.name_mei) LIKE :name", "name", request.getFilter().getName() != null && !request.getFilter().getName().isEmpty() ? "%" + request.getFilter().getName() + "%" : null);
        SQLUtils.andCondition(whereClause, parameters, "m3.type_id IN (:enrollmentStatus)", "enrollmentStatus", request.getFilter().getEnrollmentStatus() == null || request.getFilter().getEnrollmentStatus().isEmpty() ? null : request.getFilter().getEnrollmentStatus());
        SQLUtils.andCondition(whereClause, parameters, "m1.type_id IN (:occupationTypeId)", "occupationTypeId", request.getFilter().getOccupationTypeId() != null ? Arrays.asList(request.getFilter().getOccupationTypeId().split(",")) : null);
        SQLUtils.andCondition(whereClause, parameters, "m2.type_id IN (:employeeTypeId)", "employeeTypeId", request.getFilter().getEmployeeTypeId() != null ? Arrays.asList(request.getFilter().getEmployeeTypeId().split(",")) : null);
        SQLUtils.andCondition(whereClause, parameters, "JSON_LENGTH(dos.qualification) > 0", null, request.getFilter().getHasQualification() != null ? (request.getFilter().getHasQualification() == 1 ? "1" : null) : null);
        SQLUtils.andCondition(whereClause, parameters, "JSON_LENGTH(dos.qualification) = 0", null, request.getFilter().getHasQualification() != null ? (request.getFilter().getHasQualification() == 0 ? "1" : null) : null);

        SQLUtils.filterRange(whereClause, parameters, request.getFilter().getEnrollmentPeriod(), """
            CASE
                WHEN m3.type_id IN (1, 2) THEN
                    TIMESTAMPDIFF(MONTH, JSON_UNQUOTE(JSON_EXTRACT(dos.enrollment, '$.joinAt')), NOW())
                WHEN m3.type_id = 3 THEN
                    TIMESTAMPDIFF(MONTH, JSON_UNQUOTE(JSON_EXTRACT(dos.enrollment, '$.joinAt')), JSON_UNQUOTE(JSON_EXTRACT(dos.enrollment, '$.leaveAt')))
                ELSE NULL
            END
        """);

        String sql = baseSql + (!whereClause.isEmpty() ? " WHERE " + whereClause : "");
        Query query = entityManager.createNativeQuery(sql, "StaffListResponseDtoMapping");

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

    @Override
    public DetailResponseDto findDetail(StaffDetailRequestDto request) {
        String sql = """
            WITH qualification_cte AS (
               SELECT
                  dos.id AS staff_id,
                  JSON_ARRAYAGG(JSON_OBJECT('hold',
                        q.hold,
                        'etcName',
                        q.etcName,
                        'qualificationId',
                        q.qualificationId,
                        'qualificationName',
                        m14.name,
                        'qualificationType',
                        m14.type)) AS qualificationJson
               FROM
                  d_office_staff dos
               LEFT JOIN JSON_TABLE(dos.qualification,
                  '$[*]' COLUMNS (qualificationId INT PATH '$.qualificationId',
                     hold BOOLEAN PATH '$.hold',
                     etcName TEXT
                     PATH '$.etcName')) AS q ON TRUE
               LEFT JOIN m_office_qualification m14 ON q.qualificationId = m14.id
            WHERE
               dos.id = :id 
            GROUP BY
               dos.id
            ),
            positioning_cte AS (
               SELECT
                  dos.id AS staff_id,
                  JSON_ARRAYAGG(JSON_OBJECT('department',
                        m6.name,
                        'position',
                        m7.name,
                        'departmentId',
                        pos_json.department,
                        'positionId',
                        pos_json.position)) AS positioningJson
               FROM
                  d_office_staff dos
               LEFT JOIN JSON_TABLE(dos.smart_hr_data,
                  '$.positioning[*]' COLUMNS (department INT PATH '$.department',
                     position INT PATH '$.position')) AS pos_json ON TRUE
               LEFT JOIN m_blc_item m6 ON pos_json.department = m6.id
                  AND m6.item_type_id = 35
               LEFT JOIN m_blc_item m7 ON pos_json.position = m7.id
                  AND m7.item_type_id = 36
            WHERE
               dos.id = :id
            GROUP BY
               dos.id
            )
            SELECT
               dos.id AS id,
               dos.name_sei AS nameSei,
               dos.name_mei AS nameMei,
               JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.basic.kanaSei')) AS kanaSei,
               JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.basic.kanaMei')) AS kanaMei,
               JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.basic.birthDay')) AS birthDay,
               TIMESTAMPDIFF(YEAR, JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.basic.birthDay')), CURDATE()) AS age,
               JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.basic.sex')) AS sex,
               JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.basic.businessNameSei')) AS businessNameSei,
               JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.basic.businessNameMei')) AS businessNameMei,
               JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.basic.businessNameKanaSei')) AS businessNameKanaSei,
               JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.basic.businessNameKanaMei')) AS businessNameKanaMei,
               JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.basic.mail')) AS mail,
               dos.employee_no AS employeeNo,
               JSON_EXTRACT(affiliations, '$.branch[*].name') AS branchNames,
               JSON_EXTRACT(affiliations, '$.home[*].name') AS homeNames,
               JSON_EXTRACT(affiliations, '$.unit[*].name') AS unitNames,
               JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.business.content')) AS businessContent,
               m1.name AS occupation,
               dos.occupation_id AS occupationId,
               m2.name AS employeeType,
               dos.employee_type AS employeeTypeId,
               m3.name AS enrollmentStatus,
               CAST(JSON_EXTRACT(dos.enrollment, '$.status') AS UNSIGNED) AS enrollmentStatusId,
               m4.name AS paymentForm,
               CAST(JSON_EXTRACT(dos.smart_hr_data, '$.business.paymentForm') AS UNSIGNED) AS paymentFormId,
               m5.name AS grade,
               CAST(JSON_EXTRACT(dos.smart_hr_data, '$.business.grade') AS UNSIGNED) AS gradeId,
               JSON_UNQUOTE(JSON_EXTRACT(dos.enrollment, '$.joinAt')) AS joinAt,
               CASE WHEN m3.type_id IN(1, 2) THEN
                  CONCAT(TIMESTAMPDIFF(YEAR, JSON_UNQUOTE(JSON_EXTRACT(dos.enrollment, '$.joinAt')), NOW()), '年', TIMESTAMPDIFF(MONTH, JSON_UNQUOTE(JSON_EXTRACT(dos.enrollment, '$.joinAt')), NOW()) % 12, 'ヶ月')
               WHEN m3.type_id = 3 THEN
                  CONCAT(TIMESTAMPDIFF(YEAR, JSON_UNQUOTE(JSON_EXTRACT(dos.enrollment, '$.joinAt')), JSON_UNQUOTE(JSON_EXTRACT(dos.enrollment, '$.leaveAt'))), '年', TIMESTAMPDIFF(MONTH, JSON_UNQUOTE(JSON_EXTRACT(dos.enrollment, '$.joinAt')), JSON_UNQUOTE(JSON_EXTRACT(dos.enrollment, '$.leaveAt'))) % 12, 'ヶ月')
               ELSE
                  NULL
               END AS enrollmentPeriod,
               JSON_UNQUOTE(JSON_EXTRACT(dos.enrollment, '$.leaveAt')) AS leaveAt,
               JSON_UNQUOTE(JSON_EXTRACT(dos.enrollment, '$.leaveReason')) AS leaveReason,
               JSON_OBJECT('prefId', (
                     SELECT
                        type_id FROM m_blc_item
                     WHERE
                        item_type_id = (
                           SELECT
                              id FROM m_blc_item_type
                           WHERE
                              name = 'prefectures')
                           AND name = JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.addr.pref'))), 'postNo', JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.addr.postNo')), 'pref', JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.addr.pref')), 'city', JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.addr.city')), 'town', JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.addr.town'))) AS addressJson, JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.addr.building')) AS building, JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.addr.tel')) AS tel, JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.addr.holder')) AS holder, JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.addr.relationship')) AS relationship, JSON_OBJECT('prefId', (
                     SELECT
                        type_id FROM m_blc_item
                     WHERE
                        item_type_id = (
                           SELECT
                              id FROM m_blc_item_type
                           WHERE
                              name = 'prefectures')
                           AND name = JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.residentAddr.pref'))), 'postNo', JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.residentAddr.postNo')), 'pref', JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.residentAddr.pref')), 'city', JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.residentAddr.city')), 'town', JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.residentAddr.town'))) AS residentAddressJson, JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.residentAddr.building')) AS residentBuilding, JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.residentAddr.tel')) AS residentTel, JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.residentAddr.holder')) AS residentHolder, JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.residentAddr.relationship')) AS residentRelationship, JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.emergency.nameSei')) AS emergencyNameSei, JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.emergency.nameMei')) AS emergencyNameMei, JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.emergency.nameSeiKana')) AS emergencyNameKanaSei, JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.emergency.nameMeiKana')) AS emergencyNameKanaMei, JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.emergency.relationship')) AS emergencyRelationship, JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.emergency.tel')) AS emergencyTel, JSON_OBJECT('prefId', (
                     SELECT
                        type_id FROM m_blc_item
                     WHERE
                        item_type_id = (
                           SELECT
                              id FROM m_blc_item_type
                           WHERE
                              name = 'prefectures')
                           AND name = JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.emergency.pref'))), 'postNo', JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.emergency.postNo')), 'pref', JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.emergency.pref')), 'city', JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.emergency.city')), 'town', JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.emergency.town'))) AS emergencyAddressJson, JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.emergency.building')) AS emergencyBuilding, m9.name AS contractType, CAST(JSON_EXTRACT(dos.smart_hr_data, '$.contract.type') AS UNSIGNED) AS contractTypeId, JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.contract.startAt')) AS contractStartAt, JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.contract.endAt')) AS contractEndAt, m10.name AS contractRenewalType, CAST(JSON_EXTRACT(dos.smart_hr_data, '$.contract.renewalType') AS UNSIGNED) AS contractRenewalTypeId, JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.remaining.sei')) AS remainingSei, JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.remaining.mei')) AS remainingMei, JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.remaining.middle')) AS remainingMiddleName, JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.remaining.no')) AS remainingNo, m11.name AS remainingNationality, CAST(JSON_EXTRACT(dos.smart_hr_data, '$.remaining.nationality') AS UNSIGNED) AS remainingNationalityId, m12.name AS remainingStatus, CAST(JSON_EXTRACT(dos.smart_hr_data, '$.remaining.status') AS UNSIGNED) AS remainingStatusId, JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.remaining.limitAt')) AS remainingLimitAt, CASE WHEN JSON_EXTRACT(dos.smart_hr_data, '$.remaining.permission') = TRUE THEN
                  1
               WHEN JSON_EXTRACT(dos.smart_hr_data, '$.remaining.permission') = FALSE THEN
                  0
               ELSE
                  NULL
               END AS remainingPermission, m13.name AS remainingClass, CAST(JSON_EXTRACT(dos.smart_hr_data, '$.remaining.class') AS UNSIGNED) AS remainingClassId, CASE WHEN JSON_EXTRACT(dos.smart_hr_data, '$.MaternityChildcare.twinsMore') = TRUE THEN
                  1
               WHEN JSON_EXTRACT(dos.smart_hr_data, '$.MaternityChildcare.twinsMore') = FALSE THEN
                  0
               ELSE
                  NULL
               END AS twinsMore, JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.MaternityChildcare.scheduledAt')) AS scheduledBirthAt, JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.MaternityChildcare.birthAt')) AS birthAt, JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.MaternityChildcare.prenatalStartAt')) AS prenatalStartAt, JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.MaternityChildcare.postpartumEndAt')) AS postpartumEndAt, JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.MaternityChildcare.childcare[0].startAt')) AS childcareStartAt, JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.MaternityChildcare.childcare[0].endAt')) AS childcareEndAt, JSON_UNQUOTE(JSON_EXTRACT(dos.smart_hr_data, '$.MaternityChildcare.childcare[0].plannedReturnAt')) AS plannedReturnAt, CASE WHEN JSON_EXTRACT(dos.smart_hr_data, '$.MaternityChildcare.usePlus') = TRUE THEN
                  1
               WHEN JSON_EXTRACT(dos.smart_hr_data, '$.MaternityChildcare.usePlus') = FALSE THEN
                  0
               ELSE
                  NULL
               END AS usePlus, q.qualificationJson, p.positioningJson, dos.updated_at AS updatedAt
            FROM
               d_office_staff dos
               LEFT JOIN m_blc_item m1 ON dos.occupation_id = m1.id
                  AND m1.item_type_id = 29
               LEFT JOIN JSON_TABLE(dos.smart_hr_data, '$.positioning[*]' COLUMNS (department INT PATH '$.department', position INT PATH '$.position')) AS pos_json ON TRUE
               LEFT JOIN JSON_TABLE(dos.qualification, '$[*]' COLUMNS (qualificationId INT PATH '$.qualificationId', hold BOOLEAN PATH '$.hold', limitAt VARCHAR(255)
               PATH '$.limitAt')) AS qualification_json ON TRUE
               LEFT JOIN m_blc_item m2 ON dos.employee_type = m2.id
                  AND m2.item_type_id = 30
               LEFT JOIN m_blc_item m3 ON CAST(JSON_EXTRACT(dos.enrollment, '$.status') AS UNSIGNED) = m3.id
                  AND m3.item_type_id = 32
               LEFT JOIN m_blc_item m4 ON CAST(JSON_EXTRACT(dos.smart_hr_data, '$.business.paymentForm') AS UNSIGNED) = m4.id
                  AND m4.item_type_id = 33
               LEFT JOIN m_blc_item m5 ON CAST(JSON_EXTRACT(dos.smart_hr_data, '$.business.grade') AS UNSIGNED) = m5.id
                  AND m5.item_type_id = 34
               LEFT JOIN m_blc_item m9 ON CAST(JSON_EXTRACT(dos.smart_hr_data, '$.contract.type') AS UNSIGNED) = m9.id
                  AND m9.item_type_id = 37
               LEFT JOIN m_blc_item m10 ON CAST(JSON_EXTRACT(dos.smart_hr_data, '$.contract.renewalType') AS UNSIGNED) = m10.id
                  AND m10.item_type_id = 38
               LEFT JOIN m_blc_item m11 ON CAST(JSON_EXTRACT(dos.smart_hr_data, '$.remaining.nationality') AS UNSIGNED) = m11.id
                  AND m11.item_type_id = 39
               LEFT JOIN m_blc_item m12 ON CAST(JSON_EXTRACT(dos.smart_hr_data, '$.remaining.status') AS UNSIGNED) = m12.id
                  AND m12.item_type_id = 40
               LEFT JOIN m_blc_item m13 ON CAST(JSON_EXTRACT(dos.smart_hr_data, '$.remaining.class') AS UNSIGNED) = m13.id
                  AND m13.item_type_id = 41
               LEFT JOIN qualification_cte q ON dos.id = q.staff_id
               LEFT JOIN positioning_cte p ON dos.id = p.staff_id
            WHERE
               dos.id = :id
               AND dos.deleted_at IS NULL
            GROUP BY
               dos.id, m3.name, m4.name, m5.name, m3.type_id, m9.name, m10.name, m11.name, m12.name, m13.name
            """;

        Query query = entityManager.createNativeQuery(sql, "StaffDetailResponseDtoMapping");
        query.setParameter("id", request.getId());

        DetailResponseDto result = (DetailResponseDto) query.getSingleResult();

        result.setQualification(JsonUtils.parseJson(result.getQualificationJson(), new TypeReference<>() {
        }));
        result.setPositioning(JsonUtils.parseJson(result.getPositioningJson(), new TypeReference<>() {
        }));
        result.setAddress(JsonUtils.parseJson(result.getAddressJson(), new TypeReference<>() {
        }));
        result.setResidentAddress(JsonUtils.parseJson(result.getResidentAddressJson(), new TypeReference<>() {
        }));
        result.setEmergencyAddress(JsonUtils.parseJson(result.getEmergencyAddressJson(), new TypeReference<>() {
        }));

        return result;
    }

    @Override
    @Transactional
    public Long delete(Long id) {
        String sql = "UPDATE d_office_staff SET deleted_at = NOW() WHERE id = :id";
        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("id", id);
        if (query.executeUpdate() > 0) {
            return id;
        } else {
            return null;
        }
    }

    @Override
    @Transactional
    public DetailResponseDto save(StaffSaveRequestDto request) {
        if (request == null) {
            throw new IllegalArgumentException("Request data cannot be null.");
        }

        OfficeStaffEntity staff = staffRepository.findById4Update(request.getId())
            .orElseThrow(() -> new ApiException(ResponseCodeAndMsg.NOT_FOUND, "Staff not found"));


        if (staff.getUpdatedAt() != null && !staff.getUpdatedAt().isEqual(request.getUpdatedAt())) {
            throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
        }

        /** TODO : change json */

        staff.setUpdatedAt(LocalDateTime.now());

        staff = staffRepository.save(staff);

        StaffDetailRequestDto detailRequest = new StaffDetailRequestDto();
        detailRequest.setId(staff.getId());

        return this.findDetail(detailRequest);
    }

    @Override
    @Transactional
    public List<DetailResponseDto.Qualification> saveQualification(StaffSaveQualificationRequestDto request) {
        if (request == null) {
            throw new IllegalArgumentException("Request data cannot be null.");
        }

        OfficeStaffEntity staff = staffRepository.findById4Update(request.getId())
            .orElseThrow(() -> new ApiException(ResponseCodeAndMsg.NOT_FOUND, "Staff not found"));

        if (staff.getUpdatedAt() != null && !staff.getUpdatedAt().isEqual(request.getUpdatedAt())) {
            throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
        }

        staff.setQualification(JsonUtils.toJson(request.getQualification()));
        staff.setUpdatedAt(LocalDateTime.now());

        staff = staffRepository.save(staff);

        StaffDetailRequestDto detailRequest = new StaffDetailRequestDto();
        detailRequest.setId(staff.getId());

        return this.findDetail(detailRequest).getQualification();
    }
}
