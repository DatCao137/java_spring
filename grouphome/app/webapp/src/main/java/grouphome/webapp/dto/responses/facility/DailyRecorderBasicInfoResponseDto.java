package grouphome.webapp.dto.responses.facility;

import com.fasterxml.jackson.core.type.TypeReference;
import grouphome.webapp.utils.JsonUtils;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DailyRecorderBasicInfoResponseDto {
    private String menuBreakfast;
    private String menuLunch;
    private String menuDinner;

    private List<NightPatrol> nightPatrols;
    private StaffMember shiftMorning;
    private StaffMember shiftAfternoon;
    private StaffMember shiftEvening;
    private StaffMember shiftNight;
    private StaffMember shiftPatrol;
    private StaffMember shiftStaff;
    private StaffMember confirmCalendar;
    private StaffMember confirmOrder;
    private StaffMember confirmTrial;
    private StaffMember confirmPreviousDiary;
    private String remark;

    @Data
    @NoArgsConstructor
    public static class NightPatrol {
        private String name;
        private String time;
        private String report;
    }

    @Data
    @NoArgsConstructor
    public static class StaffMember {
        private Long id;
        private String nameSei;
        private String nameMei;
    }

    // This constructor is used by the SQL result set mapping, don't remove it
    public DailyRecorderBasicInfoResponseDto(
        String menuBreakfast, String menuLunch, String menuDinner,
        String nightPatrolsJson,
        String shiftMorningJson, String shiftAfternoonJson, String shiftEveningJson,
        String shiftNightJson, String shiftPatrolJson, String shiftStaffJson,
        String confirmCalendarJson, String confirmOrderJson, String confirmTrialJson,
        String confirmPreviousDiaryJson,
        String remark) {
        this.menuBreakfast = menuBreakfast;
        this.menuLunch = menuLunch;
        this.menuDinner = menuDinner;

        this.nightPatrols = JsonUtils.parseJson(nightPatrolsJson, new TypeReference<>() {
        });

        this.shiftMorning = JsonUtils.parseJson(shiftMorningJson, new TypeReference<>() {
        });
        this.shiftAfternoon = JsonUtils.parseJson(shiftAfternoonJson, new TypeReference<>() {
        });
        this.shiftEvening = JsonUtils.parseJson(shiftEveningJson, new TypeReference<>() {
        });
        this.shiftNight = JsonUtils.parseJson(shiftNightJson, new TypeReference<>() {
        });
        this.shiftPatrol = JsonUtils.parseJson(shiftPatrolJson, new TypeReference<>() {
        });
        this.shiftStaff = JsonUtils.parseJson(shiftStaffJson, new TypeReference<>() {
        });

        this.confirmCalendar = JsonUtils.parseJson(confirmCalendarJson, new TypeReference<>() {
        });
        this.confirmOrder = JsonUtils.parseJson(confirmOrderJson, new TypeReference<>() {
        });
        this.confirmTrial = JsonUtils.parseJson(confirmTrialJson, new TypeReference<>() {
        });
        this.confirmPreviousDiary = JsonUtils.parseJson(confirmPreviousDiaryJson, new TypeReference<>() {
        });

        this.remark = remark;
    }
}
