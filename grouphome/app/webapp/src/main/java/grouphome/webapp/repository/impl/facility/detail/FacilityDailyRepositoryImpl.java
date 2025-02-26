package grouphome.webapp.repository.impl.facility.detail;

import grouphome.webapp.dto.requests.facility.DailyRecorderBasicInfoRequestDto;
import grouphome.webapp.dto.responses.facility.DailyRecorderBasicInfoResponseDto;
import grouphome.webapp.utils.SQLUtils;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import grouphome.webapp.dto.responses.facility.detail.*;
import grouphome.webapp.dto.requests.facility.detail.*;

import grouphome.webapp.repository.define.facility.detail.FacilityDailyRepositoryCustom;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class FacilityDailyRepositoryImpl implements FacilityDailyRepositoryCustom {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<ListUnitResponseDto> getDataListUnits(ListUnitRequestDto request) {
        String sql = """
            SELECT
                office_unit.id		    AS unitId
            ,	office_unit.name        AS unitName
            FROM d_facility_daily_homes AS daily_homes
            LEFT JOIN d_office_unit AS office_unit 
                ON daily_homes.home_id = office_unit.home_id
                AND office_unit.deleted_at IS NULL
            WHERE 
                daily_homes.home_id = :homeId 
                AND daily_homes.yyyymmdd = :homeDate
                AND daily_homes.deleted_at IS NULL
            ORDER BY office_unit.name ASC
            """;

        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("homeId", request.getHomeId());
        query.setParameter("homeDate", request.getHomeDate());

        List<ListUnitResponseDto> results = query.getResultList();
        
        return results;
    }

    @Override
    public List<ListDetailUnitResponseDto> getDataListUnitsRoom(ListUnitRequestDto request) {
        String sql = """
            SELECT
                office_unit.id		            AS unitId
            ,   customer_unit.room_no           AS rooomNo
            ,	customer_info.name              AS customerName
            ,	customer_info.name_gana         AS customerNameGana
            FROM d_facility_daily_homes AS daily_homes
            LEFT JOIN d_office_unit AS office_unit 
                ON daily_homes.home_id = office_unit.home_id
                AND office_unit.deleted_at IS NULL
            LEFT JOIN d_customer_unit AS customer_unit
                ON office_unit.id = customer_unit.unit_id
                AND customer_unit.deleted_at IS NULL 
            LEFT JOIN d_customer_info AS customer_info
                ON customer_unit.customer_id = customer_info.id
                AND customer_info.deleted_at IS NULL 
            WHERE 
                daily_homes.home_id = :homeId 
                AND daily_homes.yyyymmdd = :homeDate
                AND daily_homes.deleted_at IS NULL
            ORDER BY office_unit.name ASC
            """;

        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("homeId", request.getHomeId());
        query.setParameter("homeDate", request.getHomeDate());
        
        List<ListDetailUnitResponseDto> results = query.getResultList();

        return results;
    }

    @Override
    public DailyRecorderBasicInfoResponseDto getFacilityDailyRecorderBasicInfo(DailyRecorderBasicInfoRequestDto req) {
        String sql = """
            SELECT
                -- Menu
                dh.menu->>'$.breakfast' as menuBreakfast,
                dh.menu->>'$.lunch' as menuLunch,
                dh.menu->>'$.dinner' as menuDinner,
            
                -- Night patrols as JSON array
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'name', dhi.name,
                        'time', dhi.value->>'$.time',
                        'report', dhi.value->>'$.report'
                    )
                ) as nightPatrolsJson,
            
                -- Staff shifts as JSON objects
                JSON_OBJECT(
                    'id', CAST(dh.works->>'$.shift.morning' AS UNSIGNED),
                    'nameSei', s1.name_sei,
                    'nameMei', s1.name_mei
                ) as shiftMorningJson,
            
                JSON_OBJECT(
                    'id', CAST(dh.works->>'$.shift.afternoon' AS UNSIGNED),
                    'nameSei', s2.name_sei,
                    'nameMei', s2.name_mei
                ) as shiftAfternoonJson,
            
                JSON_OBJECT(
                    'id', CAST(dh.works->>'$.shift.evening' AS UNSIGNED),
                    'nameSei', s3.name_sei,
                    'nameMei', s3.name_mei
                ) as shiftEveningJson,
            
                JSON_OBJECT(
                    'id', CAST(dh.works->>'$.shift.night' AS UNSIGNED),
                    'nameSei', s4.name_sei,
                    'nameMei', s4.name_mei
                ) as shiftNightJson,
            
                JSON_OBJECT(
                    'id', CAST(dh.works->>'$.shift.patrol' AS UNSIGNED),
                    'nameSei', s5.name_sei,
                    'nameMei', s5.name_mei
                ) as shiftPatrolJson,
            
                JSON_OBJECT(
                    'id', CAST(dh.works->>'$.shift.staff' AS UNSIGNED),
                    'nameSei', s6.name_sei,
                    'nameMei', s6.name_mei
                ) as shiftStaffJson,
            
                -- Confirmations as JSON objects
                JSON_OBJECT(
                    'id', CAST(dh.works->>'$.confirm.calendar' AS UNSIGNED),
                    'nameSei', s7.name_sei,
                    'nameMei', s7.name_mei
                ) as confirmCalendarJson,
            
                JSON_OBJECT(
                    'id', CAST(dh.works->>'$.confirm.order' AS UNSIGNED),
                    'nameSei', s8.name_sei,
                    'nameMei', s8.name_mei
                ) as confirmOrderJson,
            
                JSON_OBJECT(
                    'id', CAST(dh.works->>'$.confirm.trial' AS UNSIGNED),
                    'nameSei', s9.name_sei,
                    'nameMei', s9.name_mei
                ) as confirmTrialJson,
            
                JSON_OBJECT(
                    'id', CAST(dh.works->>'$.confirm.previousDiary' AS UNSIGNED),
                    'nameSei', s10.name_sei,
                    'nameMei', s10.name_mei
                ) as confirmPreviousDiaryJson,
            
                dh.works->>'$.remark' as remark
            
            FROM d_facility_daily_homes dh
            LEFT JOIN d_facility_daily_home_items dhi
                ON dhi.home_id = dh.home_id
                AND dhi.yyyymmdd = dh.yyyymmdd
                AND dhi.name IN ('NightPatrol1', 'NightPatrol2', 'NightPatrol3')
                AND dhi.deleted_at IS NULL
            LEFT JOIN d_office_staff s1 ON CAST(dh.works->>'$.shift.morning' AS UNSIGNED) = s1.id
            LEFT JOIN d_office_staff s2 ON CAST(dh.works->>'$.shift.afternoon' AS UNSIGNED) = s2.id
            LEFT JOIN d_office_staff s3 ON CAST(dh.works->>'$.shift.evening' AS UNSIGNED) = s3.id
            LEFT JOIN d_office_staff s4 ON CAST(dh.works->>'$.shift.night' AS UNSIGNED) = s4.id
            LEFT JOIN d_office_staff s5 ON CAST(dh.works->>'$.shift.patrol' AS UNSIGNED) = s5.id
            LEFT JOIN d_office_staff s6 ON CAST(dh.works->>'$.shift.staff' AS UNSIGNED) = s6.id
            LEFT JOIN d_office_staff s7 ON CAST(dh.works->>'$.confirm.calendar' AS UNSIGNED) = s7.id
            LEFT JOIN d_office_staff s8 ON CAST(dh.works->>'$.confirm.order' AS UNSIGNED) = s8.id
            LEFT JOIN d_office_staff s9 ON CAST(dh.works->>'$.confirm.trial' AS UNSIGNED) = s9.id
            LEFT JOIN d_office_staff s10 ON CAST(dh.works->>'$.confirm.previousDiary' AS UNSIGNED) = s10.id
            WHERE dh.yyyymmdd = :date
            AND dh.home_id = :homeId
            AND dh.deleted_at IS NULL
            GROUP BY
                dh.id,
                dh.menu,
                dh.works,
                s1.id, s1.name_sei, s1.name_mei,
                s2.id, s2.name_sei, s2.name_mei,
                s3.id, s3.name_sei, s3.name_mei,
                s4.id, s4.name_sei, s4.name_mei,
                s5.id, s5.name_sei, s5.name_mei,
                s6.id, s6.name_sei, s6.name_mei,
                s7.id, s7.name_sei, s7.name_mei,
                s8.id, s8.name_sei, s8.name_mei,
                s9.id, s9.name_sei, s9.name_mei,
                s10.id, s10.name_sei, s10.name_mei
            """;

        Query query = entityManager.createNativeQuery(sql, "DailyRecorderBasicInfoMapping");
        query.setParameter("date", req.getDate());
        query.setParameter("homeId", req.getHomeId());

        try {
            return (DailyRecorderBasicInfoResponseDto) query.getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    /**
     * getDataListCustomerItems
     *
     * @param request ListCustomerItemsRequestDto
     * @return Page<ListCustomerItemsResponseDtoMapping>
     */
    @Override
    public Page<ListCustomerItemsResponseDtoMapping> findAll(ListCustomerItemsRequestDto request, Pageable pageable) {
        String sql = """
            SELECT
                items.customer_id AS customerId,
                items.yyyymmdd AS yyyymmdd,
                MAX(CASE WHEN items.name = 'PlaceToGo' THEN items.value END) AS placeToGo,
                MAX(CASE WHEN items.name = 'Outer' THEN items.value END) AS outerInfo,
                MAX(CASE WHEN items.name = 'DaySupport' THEN items.value END) AS daySupport,
                MAX(CASE WHEN items.name = 'StateMorning' THEN items.value END) AS stateMorning,
                MAX(CASE WHEN items.name = 'StateNoon' THEN items.value END) AS stateNoon,
                MAX(CASE WHEN items.name = 'StateNight' THEN items.value END) AS stateNight,
                MAX(CASE WHEN items.name = 'TimeWakeUp' THEN items.value END) AS timeWakeUp,
                MAX(CASE WHEN items.name = 'TimeToWork' THEN items.value END) AS timeToWork,
                MAX(CASE WHEN items.name = 'TimeToReturn' THEN items.value END) AS timeToReturn,
                MAX(CASE WHEN items.name = 'TimeBathing' THEN items.value END) AS timeBathing,
                MAX(CASE WHEN items.name = 'TimeToBed' THEN items.value END) AS timeToBed,
                MAX(CASE WHEN items.name = 'Breakfast' THEN items.value END) AS breakfast,
                MAX(CASE WHEN items.name = 'Lunch' THEN items.value END) AS lunch,
                MAX(CASE WHEN items.name = 'Dinner' THEN items.value END) AS dinner,
                MAX(CASE WHEN items.name = 'MedicineMorning1' THEN items.value END) AS medicineMorning1,
                MAX(CASE WHEN items.name = 'MedicineMorning2' THEN items.value END) AS medicineMorning2,
                MAX(CASE WHEN items.name = 'MedicineNoon1' THEN items.value END) AS medicineNoon1,
                MAX(CASE WHEN items.name = 'MedicineNoon2' THEN items.value END) AS medicineNoon2,
                MAX(CASE WHEN items.name = 'MedicineNight1' THEN items.value END) AS medicineNight1,
                MAX(CASE WHEN items.name = 'MedicineNight2' THEN items.value END) AS medicineNight2,
                MAX(CASE WHEN items.name = 'BodyTempMorning' THEN items.value END) AS bodyTempMorning,
                MAX(CASE WHEN items.name = 'BodyTempNoon' THEN items.value END) AS bodyTempNoon,
                MAX(CASE WHEN items.name = 'BodyTempNight' THEN items.value END) AS bodyTempNight,
                MAX(CASE WHEN items.name = 'PressureHigh' THEN items.value END) AS pressureHigh,
                MAX(CASE WHEN items.name = 'PressureLow' THEN items.value END) AS pressureLow,
                MAX(CASE WHEN items.name = 'Pulse' THEN items.value END) AS pulse,
                MAX(CASE WHEN items.name = 'OxygenConcentration' THEN items.value END) AS oxygenConcentration,
                MAX(items.updated_at) AS updatedAt,
                MAX(info.name) AS customerName,
                MAX(unit.room_no) AS roomNo,
                MAX(items.created_by) AS createdBy,
                MAX(CASE WHEN items.name = 'StateMorning' THEN items.created_by END) AS createdByMorning,
                MAX(CASE WHEN items.name = 'StateNoon' THEN items.created_by END) AS createdByNoon,
                MAX(CASE WHEN items.name = 'StateNight' THEN items.created_by END) AS createdByNight,
                MAX(CASE WHEN items.name = 'StateMorning' THEN staff.name_sei END) AS createdNameMorning,
                MAX(CASE WHEN items.name = 'StateNoon' THEN staff.name_sei END) AS createdNameNoon,
                MAX(CASE WHEN items.name = 'StateNight' THEN staff.name_sei END) AS createdNameNight
            FROM
                d_office_home AS home
            LEFT JOIN d_office_unit AS office
                ON office.home_id = home.id AND office.deleted_at IS NULL
            LEFT JOIN d_customer_unit AS unit
                ON unit.unit_id = office.id AND unit.deleted_at IS NULL
            LEFT JOIN d_customer_info AS info
                ON info.id = unit.customer_id AND info.deleted_at IS NULL
            LEFT JOIN d_facility_daily_customer_items AS items
                ON items.customer_id = unit.customer_id AND items.deleted_at IS NULL
            LEFT JOIN d_office_staff AS staff
                ON staff.id = items.created_by AND staff.deleted_at IS NULL
            """;

        Long homeId = request.getFilter().getHomeId();
        Long unitId = request.getFilter().getUnitId();
        Long customerId = request.getFilter().getCustomerId();
        int type = unitId == null || request.getFilter().getType() == null ? 2 : request.getFilter().getType();
        String yyyymmdd = request.getFilter().getYyyymmdd();

        String[] days = getFirstAndLastDayOfMonth(yyyymmdd);
        String firstDayOfMonth = days[0];
        String lastDayOfMonth = days[1];

        StringBuilder whereClause = new StringBuilder();
        whereClause.append(" WHERE home.id = :homeId AND home.deleted_at IS NULL");
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("homeId", homeId);

        if (type == 1) {
            SQLUtils.andCondition(whereClause, parameters, "office.id = :unitId", "unitId", unitId);
            SQLUtils.andCondition(whereClause, parameters, "items.yyyymmdd = :yyyymmdd", "yyyymmdd", yyyymmdd);
        } else {
            SQLUtils.andCondition(whereClause, parameters, "unit.customer_id = :customerId", "customerId", customerId);
            SQLUtils.andCondition(whereClause, parameters, "items.yyyymmdd >= :firstDayOfMonth", "firstDayOfMonth", firstDayOfMonth);
            SQLUtils.andCondition(whereClause, parameters, "items.yyyymmdd <= :lastDayOfMonth", "lastDayOfMonth", lastDayOfMonth);
        }

        sql = sql + (!whereClause.isEmpty() ? whereClause : "WHERE TRUE");
        sql = sql + """
            GROUP BY
            items.customer_id,
            items.yyyymmdd
        """;

        if (type == 2) {
            sql += "ORDER BY items.yyyymmdd ASC ";
        } else {
            sql += "ORDER BY items.customer_id ASC ";
        }
        Query query = entityManager.createNativeQuery(sql, "FacilityCustomerItemsResponseDtoMapping");

        parameters.forEach(query::setParameter);

        query.setFirstResult((int) pageable.getOffset());
        query.setMaxResults(pageable.getPageSize());

        List<ListCustomerItemsResponseDtoMapping> results = query.getResultList();

        String countSql = "SELECT COUNT(1) FROM (" + sql + ") AS subquery";
        Query countQuery = entityManager.createNativeQuery(countSql);

        parameters.forEach(countQuery::setParameter);

        long totalRecords = ((Number) countQuery.getSingleResult()).longValue();
        return new PageImpl<>(results, pageable, totalRecords);
    }

    private String[] getFirstAndLastDayOfMonth(String yyyymmdd) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        LocalDate input = LocalDate.parse(yyyymmdd, formatter);
        YearMonth ym = YearMonth.from(input);
        LocalDate firstDayOfMonth = ym.atDay(1);
        LocalDate lastDayOfMonth = ym.atEndOfMonth();

        String firstDayOfMonthStr = firstDayOfMonth.format(formatter);
        String lastDayOfMonthStr = lastDayOfMonth.format(formatter);
        return new String[]{firstDayOfMonthStr, lastDayOfMonthStr};
    }
}
