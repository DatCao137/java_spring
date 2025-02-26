package grouphome.webapp.utils;

import java.util.Map;
import java.util.Objects;

public class SQLUtils {
    public static void filterString(StringBuilder wk, String sql) {
        wk.append(wk.length() == 0 ? "WHERE " : " AND ");
        wk.append(sql);
        return;
    }

    public static void filterRange(StringBuilder wk, Map<String, Object> params, String val, String clm) {
        if (Objects.isNull(val) || val.isBlank()) {
            return;
        }

        // We need to generate a unique parameter name for each column to handle case clm is not a column name, ex: JSON path in the table
        String paramBase = "param_" + Math.abs(clm.hashCode());

        String[] ranges = val.split(",");

        if (ranges.length != 1 && ranges.length != 2) {
            return;
        }

        StringBuilder range = new StringBuilder();

        if (ranges.length == 1) {
            String clmVal = paramBase + "_val";
            range.append(wk.isEmpty() ? "WHERE " : " AND ");
            range.append(String.format("%s >= :%s", clm, clmVal));
            params.put(clmVal, ranges[0]);
            wk.append(range);
            return;
        }

        range.append(wk.isEmpty() ? "WHERE " : " AND ");

        if (!ranges[0].isBlank() && !ranges[1].isBlank()) {
            String clmMin = paramBase + "_min";
            String clmMax = paramBase + "_max";
            range.append(String.format("%s BETWEEN :%s AND :%s", clm, clmMin, clmMax));
            params.put(clmMin, ranges[0]);
            params.put(clmMax, ranges[1]);
        } else {
            String clmVal = paramBase + "_val";
            if (!ranges[0].isBlank()) {
                range.append(String.format("%s >= :%s", clm, clmVal));
                params.put(clmVal, ranges[0]);
            } else if (!ranges[1].isBlank()) {
                range.append(String.format("%s <= :%s", clm, clmVal));
                params.put(clmVal, ranges[1]);
            }
        }

        wk.append(range);
    }

    public static void filterChoice(StringBuilder wk, String val, String clm, String key) {
        final String sql = String.format("JSON_EXTRACT(%s, '$.%s')", clm, key);
        switch (val) {
            case "1":
                wk.append(wk.length() == 0 ? "WHERE " : " AND ");
                wk.append(sql).append(" = true");
                break;
            case "2":
                wk.append(wk.length() == 0 ? "WHERE " : " AND ");
                wk.append(String.format("(%s = false OR %s IS NULL)", sql, sql));
                break;
        }
    }

    public static void andCondition(StringBuilder whereClause, Map<String, Object> parameters, String condition, String paramName, Object value) {
        if (condition == null || condition.trim().isEmpty()) {
            throw new IllegalArgumentException("Condition cannot be null or empty");
        }
        if (value != null) {
            if (!whereClause.isEmpty()) {
                whereClause.append(" AND ");
            }
            whereClause.append(condition);
            if (paramName != null && !paramName.trim().isEmpty()) {
                parameters.put(paramName, value);
            }
        }
    }
}
