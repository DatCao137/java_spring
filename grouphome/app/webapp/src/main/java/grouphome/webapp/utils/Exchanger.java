package grouphome.webapp.utils;

public class Exchanger {
    public static Boolean toBool(Object val) {
        try {
            return val != null && Boolean.parseBoolean(val.toString());
        } catch (Exception e) {
            return false;
        }
    }

    public static Integer toInt(Object val) {
        try {
            return val != null ? ((Number) val).intValue() : null;
        } catch (Exception e) {
            return null;
        }
    }

    public static Long toLong(Object val) {
        try {
            return val != null ? ((Number) val).longValue() : null;
        } catch (Exception e) {
            return null;
        }
    }

    public static String toString(Object val) {
        try {
            return val != null ? val.toString().trim() : "";
        } catch (Exception e) {
            return "";
        }
    }
}
