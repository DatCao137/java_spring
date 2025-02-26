package grouphome.webapp.dto.requests.facility.detail;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.lang.reflect.Field;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveCustomerItemsRequestDto {

    @Min(value = 1, message = "IDは1以上である必要があります")
    private Long id;

    @Min(value = 1, message = "顧客IDは1以上である必要があります")
    private Long customerId;

    @NotNull(message = "年月日を入力してください。")
    @Pattern(regexp = "\\d{8}", message = "年月日の形式が正しくありません (例: 20240101)。")
    private String yyyymmdd;

    @NotNull(message = "項目名を入力してください。")
    @Size(max = 32, message = "項目名は32文字以内で入力してください。")
    private String name;

    @Valid
    private Value value;

    private Long createdBy;

    private LocalDateTime updatedAt;

    @NotNull
    private Integer type;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Value {
        @Valid
        private PlaceToGo placeToGo;

        @Valid
        private Outer outer;

        @Valid
        private DaySupport daySupport;

        @Valid
        private State stateMorning;

        @Valid
        private State stateNoon;

        @Valid
        private State stateNight;

        @Valid
        private TimeInfo timeWakeUp;

        @Valid
        private TimeInfo timeToWork;

        @Valid
        private TimeInfo timeToReturn;

        @Valid
        private TimeInfo timeBathing;

        @Valid
        private TimeInfo timeToBed;

        @Valid
        private Meal breakfast;

        @Valid
        private Meal lunch;

        @Valid
        private Meal dinner;

        @Valid
        private Medicine medicineMorning1;

        @Valid
        private Medicine medicineMorning2;

        @Valid
        private Medicine medicineNoon1;

        @Valid
        private Medicine medicineNoon2;

        @Valid
        private Medicine medicineNight1;

        @Valid
        private Medicine medicineNight2;

        @Valid
        private Measurement bodyTempMorning;

        @Valid
        private Measurement bodyTempNoon;

        @Valid
        private Measurement bodyTempNight;

        @Valid
        private Measurement pressureHigh;

        @Valid
        private Measurement pressureLow;

        @Valid
        private Measurement pulse;

        @Valid
        private Measurement oxygenConcentration;

        public Object getValue(String key) {
            try {
                Field field = this.getClass().getDeclaredField(key);
                field.setAccessible(true);
                return field.get(this);
            } catch (NoSuchFieldException | IllegalAccessException e) {
                return new Object();
            } catch (Exception e) {
                return null;
            }
        }
    }

    // PlaceToGo
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PlaceToGo {
        @Valid
        private Plans plans;
        private String name;

        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        public static class Plans {
            private Boolean goOut;
            private Boolean absence;
            private Boolean no;
        }
    }

    // Outer
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Outer {
        @Valid
        private Status hospital;
        @Valid
        private Status myhome;

        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        public static class Status {
            private Boolean first;
            private Boolean now;
            private Boolean Return;
        }
    }

    // DaySupport
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DaySupport {
        private Boolean daySupport;
    }

    // State (Morning/Noon/Night)
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class State {
        @Size(max = 255, message = "メッセージは255文字以内で入力してください。")
        private String message;
    }

    // TimeInfo
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TimeInfo {
        @Pattern(regexp = "^([0-1]\\d|2[0-3]):([0-5]\\d)$", message = "時間はhh:mm形式で入力してください。")
        private String time;
    }

    // Meal (Breakfast/Lunch/Dinner)
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Meal {
        @Valid
        private MealType type;
        private Integer amount;
        private Integer refill;
        private Boolean cancel;
        @Pattern(regexp = "mousse|soft|normal", message = "硬さは'mousse', 'soft', 'normal'のいずれかを指定してください。")
        private String hardness;

        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        public static class MealType {
            private Boolean rice;
            private Boolean soup;
            private Boolean sideDish;
        }
    }

    // Medicine
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Medicine {
        @Pattern(regexp = "^([0-1]\\d|2[0-3]):([0-5]\\d)$", message = "時間はhh:mm形式で入力してください。")
        private String time;
    }

    // Measurement (BodyTemp, Pressure, Pulse, OxygenConcentration)
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Measurement {
        @Pattern(regexp = "\\d{2,3}(\\.\\d)?", message = "数値は正しい形式で指定してください (例: 36.5, 120)。")
        private String val;
    }
}
