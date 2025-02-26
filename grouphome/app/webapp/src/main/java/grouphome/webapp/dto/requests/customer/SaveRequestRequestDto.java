package grouphome.webapp.dto.requests.customer;

import grouphome.webapp.dto.requests.blc_common.AddressDto;
import grouphome.webapp.entity.CustomerRequestEntity.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveRequestRequestDto extends AddressDto {
    @Min(value = 0, message = "requestInfoIdは0以上でなければなりません。")
    @Digits(message = "requestInfoIdは0から9までの数字のみ含めることができます。", integer = 9, fraction = 0)
    private Long requestInfoId;

    @Min(value = 0, message = "requestInfoDetailIdは0以上でなければなりません。")
    @Digits(message = "requestInfoDetailIdは0から9までの数字のみ含めることができます。", integer = 9, fraction = 0)
    private Long requestInfoDetailId;

    /**
     * 氏名
     */
    @Size(max = 255, message = "名前は255文字以下でなければなりません。")
    private String name;

    /**
     * 申込日
     */
    private LocalDateTime requestDate;

    /**
     * 種類・申込書 - Only "visit" or "movein" allowed
     */
    private RequestType requestType;

    /**
     * 種類・項目 - Allowed values: "visit", "exp", "exp-free", "exp-pay", or "movein"
     */
    private RequestItem requestItem;

    /**
     * 対象事業所(ホーム)
     */
    @Min(value = 0, message = "homeId must be greater than or equal to 0")
    @Digits(message = "homeId must contain only digits from 0 to 9", integer = 9, fraction = 0)
    private Long homeId;

    /**
     * 希望日 (optional, could be a JSON string)
     */
    @Valid
    private DesiredDate desiredDate;

    /**
     * 代表情報 (optional, could be a JSON string)
     */
    @Valid
    private RepresentativeInfo representativeInfo;

    /**
     * 補足 (optional, can contain large text data)
     */
    @Size(max = 65535, message = "備考は65535文字以内で入力してください。")
    private String remark;

    /**
     * 内容 (optional)
     */
    @Valid
    private Contents contents;

    private LocalDateTime infoUpdatedAt;

    private LocalDateTime detailUpdatedAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DesiredDate {
        @Valid
        public First first;
        @Valid
        public Second second;
        public String desired;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class First {
        public String date;
        public String time;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Second {
        public String date;
        public String time;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RepresentativeInfo {
        public String name;
        @Pattern(regexp = "^[0-9-]{0,13}$", message = "半角ハイフンを含めて13桁以内で入力してください")
        public String tel;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Contents {
        @Size(max = 255, message = "名前は255文字以下でなければなりません。")
        private String name;

        @Size(max = 255, message = "カナは255文字以下でなければなりません。")
        @Pattern(regexp = "^[ぁ-ん]*$", message = "ひらがなで入力してください")
        private String gana;
        @Size(max = 255, message = "代筆者名は255文字以下でなければなりません。")
        private String representative;
        @Size(max = 1, message = "性別は1桁の数字でなければなりません。")
        @Pattern(regexp = "^[0-9]*$", message = "性別は数字のみを含めることができます")
        private String sex;
        private Birth birth;
        private CurrentAddress currentAddress;
        private Emergency emergency;
        private Underwriter underwriter;
        private Successor successor;
        @Size(max = 500, message = "動機は500文字以下でなければなりません。")
        private String motive;
        @Size(max = 255, message = "障害名は255文字以下でなければなりません。")
        private String disabilityName;
        @Size(max = 255, message = "障害等級は255文字以下でなければなりません。")
        private String disabilityClass;
        private Book book;
        @Size(max = 255, message = "失敗状況は255文字以下でなければなりません。")
        private String failureSituation;
        private List<History> history;
        @Size(max = 255, message = "アレルギーは最大255文字です。")
        private String allergy;
        private PhysicalInfo physicalInfo;
        private List<Family> family;
        private Insurance insurance;
        private Related related;
        private Situation situation;
        private Requirements requirements;
        @Size(max = 500, message = "メンタルは最大500文字です。")
        private String mental;
        @Size(max = 500, message = "目標は最大500文字です。")
        private String goals;
        @Size(max = 500, message = "リクエストは最大500文字です。")
        private String requests;
        private Income income;

        @Valid
        private Base base;
        @Valid
        private Attendant attendant;
        @Valid
        private Desired desired;
        private String etc;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Birth {
        public String era;
        public String date;
        public String age;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CurrentAddress {
        private Address address;
        @Pattern(regexp = "^[0-9-]{0,13}$", message = "半角ハイフンを含めて13桁以内で入力してください")
        private Tel tel;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Emergency {
        @Size(max = 255, message = "緊急連絡先の名前は255文字以下でなければなりません。")
        private String name;
        @Size(max = 100, message = "関係は100文字以下でなければなりません。")
        private String relationship;
        private CurrentAddress address;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Underwriter {
        private Boolean has;
        @Size(max = 255, message = "引受人の名前は255文字以下でなければなりません。")
        private String name;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Successor {
        private Boolean has;
        @Size(max = 255, message = "後継者の名前は255文字以下でなければなりません。")
        private String name;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Book {
        private Boolean has;
        private Physical physical;
        private Treatment treatment;
        private Mental mental;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class History {
        @Size(max = 255, message = "名前は255文字以下でなければなりません。")
        private String name;
        @Size(max = 255, message = "医療情報は255文字以下でなければなりません。")
        private String medical;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PhysicalInfo {
        private Number height;
        private Number weight;
        private Lifestyle lifestyle;
        private String wakeUpTime;
        private String sleepingTime;
        private Alcohol alcohol;
        private Tobacco tobacco;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Family {
        private String name;
        private String gana;
        private String relationship;
        private Together together;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Insurance {
        private Type type;
        private Care care;
        private Expenses expenses;
        private String limit;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Related {
        private Doctor doctor;
        private CaseWorker caseWorker;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Situation {
        private Place place;
        private String etcService;
        private Activity activity;
        private Transfer transfer;
        private NeedSupport needSupport;
        private String howToSpend;
        private Medication medication;
        private Care care;
        private String money;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Requirements {
        private List<String> items;
        @Size(max = 500, message = "内容は最大500文字です。")
        private String contents;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Income {
        private Pension pension;
        private Welfare welfare;
        private PensionOther pensionOther;
        private Working working;
        private FamilyAssist familyAssist;
        private Others others;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Tel {
        private String type;
        @Size(max = 15, message = "電話番号は15文字以下でなければなりません。")
        private String no;
        @Size(max = 15, message = "内線番号は15文字以下でなければなりません。")
        private String inner;
        @Email(message = "有効なメールアドレスを入力してください")
        @Size(max = 55, message = "メールアドレスは55文字以下でなければなりません。")
        private String mail;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Physical {
        private Boolean has;
        @Size(max = 255, message = "度合いは255文字以下でなければなりません。")
        private String degree;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Treatment {
        private Boolean has;
        @Size(max = 255, message = "度合いは255文字以下でなければなりません。")
        private String degree;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Mental {
        private Boolean has;
        private String degree;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Lifestyle {
        private Boolean has;
        @Size(max = 500, message = "内容は500文字以下でなければなりません。")
        private String contents;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Alcohol {
        private Boolean has;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Tobacco {
        private Boolean has;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Together {
        private Boolean has;
        private Address address;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Type {
        private String type;
        private String contents;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Care {
        private Boolean has;
        @Size(max = 500, message = "ケアの内容は500文字以内でなければなりません。")
        private String contents;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Expenses {
        private String type;
        private Number limit;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Doctor {
        @Size(max = 100, message = "病院名は最大100文字です。")
        private String hospital;
        @Size(max = 255, message = "薬名は最大255文字です。")
        private String medicine;
        @Size(max = 100, message = "名前は最大100文字です。")
        private String name;
        private Address address;
        private Contact contact;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CaseWorker {
        @Size(max = 100, message = "機関名は最大100文字です。")
        private String institutionName;
        @Size(max = 100, message = "名前は最大100文字です。")
        private String name;
        private Contact contact;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Place {
        private Boolean has;
        @Size(max = 500, message = "内容は500文字以下でなければなりません。")
        private String contents;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Activity {
        private List<String> weeks;
        @Size(max = 8, message = "開始時間は8文字以下でなければなりません。")
        private String startHour;
        @Size(max = 8, message = "終了時間は8文字以下でなければなりません。")
        private String endHour;
        @Size(max = 255, message = "ノートは255文字以下でなければなりません。")
        private String notes;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Transfer {
        @Size(max = 4, message = "転送タイプは4文字以内でなければなりません。")
        private String transferType;
        @Size(max = 4, message = "輸送タイプは4文字以内でなければなりません。")
        private String transportationType;
        @Size(max = 500, message = "内容は500文字以内でなければなりません。")
        private String contents;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class NeedSupport {
        private Boolean has;
        @Size(max = 500, message = "内容は500文字以内でなければなりません。")
        private String contents;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Medication {
        private Boolean has;
        @Size(max = 500, message = "薬の内容は500文字以内でなければなりません。")
        private String contents;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Contact {
        @Pattern(regexp = "^[0-9-]{0,13}$", message = "半角ハイフンを含めて13桁以内で入力してください")
        private String tel;
        @Pattern(regexp = "^[0-9-]{0,13}$", message = "半角ハイフンを含めて13桁以内で入力してください")
        private String mobile;
        @Pattern(regexp = "^[0-9-]{0,13}$", message = "半角ハイフンを含めて13桁以内で入力してください")
        private String fax;
        @Email(message = "正しいメールアドレス形式で入力してください")
        private String mail;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Pension {
        private Boolean available;
        @Pattern(regexp = "^(|[1-9]\\d*)$", message = "正の数のみ入力してください")
        private String amount;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Welfare {
        private Boolean available;
        @Pattern(regexp = "^(|[1-9]\\d*)$", message = "正の数のみ入力してください")
        private String amount;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PensionOther {
        private Boolean available;
        @Pattern(regexp = "^(|[1-9]\\d*)$", message = "正の数のみ入力してください")
        private String amount;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Working {
        private Boolean available;
        @Pattern(regexp = "^(|[1-9]\\d*)$", message = "正の数のみ入力してください")
        private String amount;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FamilyAssist {
        private Boolean available;
        @Pattern(regexp = "^(|[1-9]\\d*)$", message = "正の数のみ入力してください")
        private String amount;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Others {
        private Boolean available;
        private String name;
        @Pattern(regexp = "^(|[1-9]\\d*)$", message = "正の数のみ入力してください")
        private String amount;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Base {
        private List<String> hopeItems;
        @Size(max = 255, message = "その他の希望は255文字以下でなければなりません。")
        private String hopeOther;
        @Size(max = 255, message = "名前は255文字以下でなければなりません。")
        private String name;

        @Pattern(regexp = "^[ぁ-ん]*$", message = "ひらがなで入力してください")
        @Size(max = 255, message = "カナは255文字以下でなければなりません。")
        private String gana;
        private String sex;

        @Min(value = 0, message = "年齢は0以上でなければなりません")
        @Max(value = 120, message = "年齢は120未満でなければなりません")
        private Number age;
        private Address address;

        @Valid
        private Contact contact;
        private Disability disability;
        private Recipient recipient;
        private Visiting visiting;
        private Attached attached;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Attendant {
        private String name;
        @Valid
        private Contact contact;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Address {
        private String postNo1st;
        private String postNo2nd;
        private Long prefId;
        private String city;
        private String town;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Disability {
        @Size(max = 255, message = "障害名は255文字以下でなければなりません。")
        private String name;
        @Size(max = 255, message = "障害の種類は255文字以下でなければなりません。")
        @Pattern(regexp = "^\\d*$", message = "disabilityTypeは数字のみを含むことができます")
        private String type;
        private Pocketbook pocketbook;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Pocketbook {
        private Boolean has;
        @Size(max = 255, message = "ポケットブックの内容は255文字以下でなければなりません。")
        private String contents;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Recipient {
        private Boolean has;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Visiting {
        private Boolean has;
        @Size(max = 255, message = "訪問内容は255文字以下でなければなりません。")
        private String contents;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Attached {
        private Boolean has;
        @Size(max = 255, message = "添付内容は255文字以下でなければなりません。")
        private String contents;
        private Boolean isBring;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Desired {
        @Min(value = 0, message = "希望人数は0以上でなければなりません")
        private Number count;
        private List<String> attribute;
        @Size(max = 255, message = "連絡先は255文字以下でなければなりません。")
        private String contactInfo;
    }
}
