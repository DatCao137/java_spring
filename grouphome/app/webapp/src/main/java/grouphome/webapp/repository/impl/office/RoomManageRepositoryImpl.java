package grouphome.webapp.repository.impl.office;

import grouphome.webapp.dto.requests.office.GeneralRequestDto;
import grouphome.webapp.dto.requests.office.RoomIsFreeRequestDto;
import grouphome.webapp.dto.requests.office.RoomListRequestDto;
import grouphome.webapp.dto.requests.office.RoomSumsRequestDto;
import grouphome.webapp.dto.responses.office.room.SumsResponseDto;
import grouphome.webapp.dto.responses.office.room.OfficeRoomIsFreeResponseDto;
import grouphome.webapp.dto.responses.office.room.OfficeRoomMapResponseDto;
import grouphome.webapp.entity.OfficeRoomManageEntity;
import grouphome.webapp.repository.impl.blc_common.PagerRepositoryImpl;
import grouphome.webapp.repository.define.office.RoomManageRepositoryCustom;
import grouphome.webapp.utils.Exchanger;
import jakarta.persistence.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class RoomManageRepositoryImpl extends PagerRepositoryImpl implements RoomManageRepositoryCustom {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Map<String, Object> getRoomList(GeneralRequestDto request) {
        final String baseSql = """
                SELECT  room.id AS id
                    ,   room.customer_id AS customerId
                    ,   room.room_id AS roomId
                    ,   room.unit_id AS unitId
                    ,   room.movein_at AS moveinAt
                    ,   room.leaving_at AS leavingAt
                    ,   room.category AS categoryId
                    ,   room.updated_at AS updatedAt
                FROM t_office_room_manage AS room
                %s

                """;

        Map<String, Object> params = new HashMap<String, Object>();
        StringBuilder where = new StringBuilder("WHERE room.deleted_at IS NULL ");
        StringBuilder outerWhere = new StringBuilder();

        if (request.getId() != null) {
            where.append("AND room.id = :id ");
            params.put("id", request.getId());
        }

        if (request.getCustomerId() != null) {
            where.append("AND room.customer_id = :customerId ");
            params.put("customerId", request.getCustomerId());
        }

        if (request.getRoomId() != null) {
            where.append("AND room.room_id = :roomId ");
            params.put("roomId", request.getRoomId());
        }

        if (request.getUnitId() != null) {
            where.append("AND room.unit_id = :unitId ");
            params.put("unitId", request.getUnitId());
        }

        // Paging
        Map<String, Integer> page = new HashMap<String, Integer>();
        page.put("pageNumber", request.getPageNumber());
        page.put("pageSize", request.getPageSize());

        // Sorting
        Map<String, String> sort = new HashMap<String, String>();
        sort.put(request.getSortBy(), request.getSortDirection());

        String sql = String.format(baseSql, where);
        String sub = outerWhere.toString();
        return execQuery(sql, sub, page, params, sort);
    }

    @Override
    public List<OfficeRoomMapResponseDto> getRoomListFromHome(RoomListRequestDto req) {
        final String baseSql = """
                    SELECT  room.id as roomId
                        ,   room.name as roomName
                        ,   unit.id as unitId
                        ,	unit.name as unitName
                        ,   GROUP_CONCAT(
                                CASE WHEN mgr.movein_at is null THEN '' ELSE mgr.movein_at end,
                        		'/',
                        		CASE WHEN mgr.leaving_at is null THEN '' ELSE mgr.leaving_at end,
                                '/',
                                CASE WHEN mgr.id is null THEN '' ELSE mgr.id end) as period
                    FROM d_office_room room
                    JOIN d_office_unit unit on room.unit_id = unit.id
                    LEFT JOIN t_office_room_manage mgr on mgr.room_id = room.id
                     AND mgr.deleted_at IS NULL
                     AND ((mgr.movein_at < :startDate
                      AND (mgr.leaving_at IS NULL OR mgr.leaving_at BETWEEN :startDate AND :endDate))
                       OR (mgr.movein_at BETWEEN :startDate AND :endDate))
                    %s
                    GROUP BY room.id

                """;

        Map<String, Object> params = new HashMap<String, Object>();
        StringBuilder where = new StringBuilder(
                "WHERE room.deleted_at IS NULL AND unit.deleted_at IS NULL ");
        StringBuilder outerWhere = new StringBuilder();

        DateTimeFormatter pattern = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate now = LocalDate.parse(req.getBaseDate(), pattern);
        LocalDate first = now.withDayOfMonth(1);
        LocalDate last = now.withDayOfMonth(now.lengthOfMonth());
        params.put("startDate", first.format(pattern));
        params.put("endDate", last.format(pattern));
        if (req.getHomeId() != null) {
            where.append("AND unit.home_id = :homeId ");
            params.put("homeId", req.getHomeId());
        }

        // Sorting
        Map<String, String> sort = new HashMap<String, String>();

        String sql = String.format(baseSql, where);
        String sub = outerWhere.toString();
        Page<OfficeRoomMapResponseDto> ret = execQueryWithMap(sql, sub, "OfficeRoomMapResponseDtoMapping", null, params,
                sort);
        return ret.getContent();
    }

    @Override
    public OfficeRoomIsFreeResponseDto getFreeStatus(RoomIsFreeRequestDto req) {
        final String baseSql = """
                SELECT movein_at, leaving_at from t_office_room_manage mgr
                WHERE
                	mgr.room_id = :roomId
                AND mgr.deleted_at IS NULL
                AND
                	(mgr.movein_at > :startDate
                 OR  (mgr.movein_at < :startDate AND mgr.leaving_at IS NULL))
                 %s
                ORDER BY movein_at
                LIMIT 1;
                """;
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("roomId", req.getRoomId());
        params.put("startDate", req.getStartDate());

        StringBuilder sbWk = new StringBuilder();
        final Long customerId = req.getCustomerId();
        if(customerId != null) {
            sbWk.append(" AND mgr.customer_id != :customerId ");
            params.put("customerId", customerId);
        }

        final String endDate = req.getEndDate();
        if((endDate != null)
        && !endDate.isEmpty()) {
            sbWk.append(" AND (mgr.movein_at < :endDate) ");
            params.put("endDate", req.getEndDate());
        }
        final String sql = String.format(baseSql, sbWk.toString());
        Query query = entityManager.createNativeQuery(sql);
        params.forEach(query::setParameter);
        List<Object[]> lst = query.getResultList();
        OfficeRoomIsFreeResponseDto ret = new OfficeRoomIsFreeResponseDto();
        if(lst.size() == 0) {
            ret.setIsFree(true);
        } else {
            ret.setIsFree(false);
            ret.setStartDate(Exchanger.toString(lst.get(0)[0]));
            ret.setEndDate(Exchanger.toString(lst.get(0)[1]));
        }
        return ret;
    }

    @Override
    public List<SumsResponseDto> getPersonDayData(RoomSumsRequestDto dto) {
        final String dateCalcSql = """
                CASE
                WHEN movein_at < '%%%START%%%'
                THEN CASE
                     WHEN leaving_at is null or leaving_at >= '%%%END%%%'
                     THEN DATEDIFF('%%%END%%%', '%%%START%%%')
                     ELSE DATEDIFF(leaving_at, '%%%START%%%')
                     END
                ELSE CASE
                     WHEN leaving_at is null or leaving_at >= '%%%END%%%'
                     THEN DATEDIFF('%%%END%%%', movein_at)
                     ELSE DATEDIFF(leaving_at, movein_at)
                     END
                END
                """;
        final String baseSql = """
                 WITH days AS (select UnitID,
                     r.StartDate AS StartDate,
                     DATEDIFF(CASE WHEN r.EndDate is null or r.EndDate > '%%%END%%%' THEN '%%%END%%%' ELSE r.EndDate END
                             ,CASE WHEN r.StartDate is null or StartDate < '%%%START%%%' THEN '%%%START%%%' ELSE r.StartDate END) AS days
                     from (
                     select id AS UnitID
                     ,	DATE_FORMAT(JSON_EXTRACT(contents, '$.basic.startDate'), '%Y%m%d') AS StartDate
                     ,	DATE_FORMAT(JSON_EXTRACT(contents, '$.basic.endDate'), '%Y%m%d') AS EndDate
                     from d_office_unit) AS r)
                 select
                     unit_id
                 ,   StartDate
                 ,   CASE WHEN days < 0 THEN 0 ELSE days END AS days
                 ,	sum(%%%CALC%%%) AS total
                 ,   sum(CASE WHEN category=3 THEN %%%CALC%%% ELSE 0 END) AS category3
                 ,   sum(CASE WHEN category=4 THEN %%%CALC%%% ELSE 0 END) AS category4
                 ,   sum(CASE WHEN category=5 THEN %%%CALC%%% ELSE 0 END) AS category5
                 ,   sum(CASE WHEN category=6 THEN %%%CALC%%% ELSE 0 END) AS category6
                from t_office_room_manage
                 join days on days.UnitID = unit_id
                 where deleted_at is NULL
                     %%%WHERE%%%
                     and (movein_at <= '%%%END%%%'
                      and (leaving_at is null or leaving_at >= '%%%START%%%'))
                 group by unit_id
                 """;

        String execSql = baseSql.replace("%%%CALC%%%", dateCalcSql);
        String startDate = dto.getStartDate();
        String endDate = dto.getEndDate();
        String where = "";

        if (dto.getUnitId() != null) {
            where = " and unit_id = " + dto.getUnitId();
        }

        execSql = execSql.replace("%%%WHERE%%%", where).replace("%%%START%%%", startDate).replace("%%%END%%%", endDate);
        Query query = entityManager.createNativeQuery(execSql);

        List<SumsResponseDto> lstDto = new ArrayList<>();
        List<Object[]> person = query.getResultList();
        for (Object[] row : person) {
            lstDto.add(this.exchangeDto(row));
        }

        return lstDto;
    }

    private SumsResponseDto exchangeDto(Object[] data) {
        SumsResponseDto dto = new SumsResponseDto();
        int nPos = 0;
        dto.setUnitId(Exchanger.toLong(data[nPos++]));
        dto.setStartYYYYMMDD(Exchanger.toString(data[nPos++]));
        dto.setDays(Exchanger.toInt(data[nPos++]));
        dto.setTotal(Exchanger.toInt(data[nPos++]));
        dto.setCategory3(Exchanger.toInt(data[nPos++]));
        dto.setCategory4(Exchanger.toInt(data[nPos++]));
        dto.setCategory5(Exchanger.toInt(data[nPos++]));
        dto.setCategory6(Exchanger.toInt(data[nPos++]));
        return dto;
    }
}