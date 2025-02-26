package grouphome.webapp.dto.responses.customer.inquiry;

import lombok.Data;

@Data
public class ProfileInfoResponseDto {
    private Long id;
	private Long inquiryInfoId;
    private String introducerName;          // 紹介者名
    private String introducerType;          // 紹介者種別
    private String introducerAddr;          // 紹介者所在地

    private String disabledType;            // 障害特性 種別
	private String disabledClass;           // 障害特性 区分

    private Long pocketBookType;          // 手帳状況 有無
	private String pocketBookTypeName;
	private String pocketBookGrade;         // 手帳状況 等級
	private Long pocketBookWheelChair;    // 車椅子
	private String pocketBookWheelChairName;

    private String serviceDays;             // 利用中サービス 日中活動 有無
	private String serviceName;     		// 活動先名
	private String serviceAddr;  			// 所在地
	private String serviceVisit;            // 訪問サービス 有無
	private String serviceEtc;              // その他サービス
	private String serviceRecipient;        // 受給者証

    private String residenceType;           // 現在の住居 住居種別
	private String residenceRemark;         // 備考

	private String updatedAt;
}
