package grouphome.webapp.controller.api;

import grouphome.webapp.controller.BaseController;
import grouphome.webapp.dto.responses.blc_common.BaseResponse;
import grouphome.webapp.dto.responses.customer.inquiry.*;
import grouphome.webapp.dto.requests.customer.inquiry.*;
import grouphome.webapp.service.define.InquiryService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import grouphome.webapp.dto.responses.blc_common.PagerResponse;
import org.springframework.beans.factory.annotation.Autowired;
import grouphome.webapp.dto.requests.customer.inquiry.hearing.*;
import grouphome.webapp.dto.responses.customer.inquiry.hearing.*;

import java.util.ArrayList;
import java.util.List;
import jakarta.validation.Valid;

@RestController
public class InquiryManageController extends BaseController {
    private final InquiryService inquiryService;

    @Autowired
    public InquiryManageController(InquiryService inquiryService) {
        this.inquiryService = inquiryService;
    }

    @PostMapping("/inquiry")
    public ResponseEntity<BaseResponse<List<ListResponseDto>>> getInquiryList(@RequestBody GeneralRequestDto request) {
        PagerResponse<List<ListResponseDto>> res = inquiryService.getInquiryList(request);
        return returnSuccess(res);
    }

    @PostMapping("/inquiry/save")
    @ResponseBody
    public ResponseEntity<BaseResponse<Long>> save(@Valid @RequestBody InquirySaveRequestDto request) {
        Long res = this.inquiryService.saveInquiry(request);
        return returnSuccess(new BaseResponse<>(res));
    }

    @DeleteMapping("/inquiry/{id}")
    public ResponseEntity<BaseResponse<String>> deleteInquiry(@PathVariable(value = "", name = "id", required = true) Long id) {
        return returnSuccess(new BaseResponse<>("Delete inquiry with ID: " + inquiryService.deleteInquiry(id) + " successfully!"));
    }

    @PostMapping("/inquiry/detail/save")
    @ResponseBody
    public ResponseEntity<BaseResponse<Long>> saveDetail(@Valid @RequestBody InquiryDetailSaveRequestDto request) {
        Long res = this.inquiryService.saveDetail(request);
        return returnSuccess(new BaseResponse<>(res));
    }

    @PostMapping("/inquiry/detail")
    public ResponseEntity<BaseResponse<List<InquiryDetailResponseDto>>> getDetails(@RequestBody InquiryDetailRequestDto request) {
        PagerResponse<List<InquiryDetailResponseDto>> res = inquiryService.getDetails(request);
        return returnSuccess(res);
    }

    @PostMapping("/inquiry/detailBasic")
    @ResponseBody
	public DetailResponseDto detailBasic(@RequestBody InquiryRequestDto para) {
        DetailResponseDto ret = new DetailResponseDto();
        ret.setInquiryTime("10:00");
        ret.setVisit("13:00");
        ret.setFreeTrial("2024/09/10");
        ret.setPaidTrial("");
        ret.setSsCompletion("");
        ret.setContractDate("2024/09/20");
        ret.setPlanStatus("本入居中");
        return ret;
    }

    @PostMapping("/inquiry/hearing/save")
    @ResponseBody
    public ResponseEntity<BaseResponse<Long>> saveCustomerHearing(@Valid @RequestBody SaveCustomerHearingRequestDto request) {
        Long res = this.inquiryService.saveCustomerHearing(request);
        return returnSuccess(new BaseResponse<>(res));
    }

    @PostMapping("/inquiry/hearing-detail/save")
    @ResponseBody
    public ResponseEntity<BaseResponse<Long>> saveCustomerHearingDetail(@Valid @RequestBody SaveCustomerHearingDetailRequestDto request) {
        Long res = this.inquiryService.saveCustomerHearingDetail(request);
        return returnSuccess(new BaseResponse<>(res));
    }

    @GetMapping("/inquiry/hearing/{id}")
    public ResponseEntity<BaseResponse<InquiryHearingResponseDto>> getHearingInfo(@PathVariable(name = "id", required = true) Long id) {
        InquiryHearingResponseDto responseDto = this.inquiryService.getHearingInfo(id);
        return returnSuccess(new BaseResponse<>(responseDto));
    }

    @DeleteMapping("/inquiry/hearing-detail/{id}")   
    public ResponseEntity<BaseResponse<String>> deleteHearingDetail(@PathVariable(name = "id", required = true) Long id) {
        return returnSuccess(new BaseResponse<>("Delete hearing detail with ID: " + inquiryService.deleteHearingDetail(id) + " successfully!"));
    }

    @PostMapping("/inquiry/hearing")
    @ResponseBody
	public HearingInfoResponseDto hearing(@RequestBody InquiryRequestDto para) {
        HearingInfoResponseDto dto = new HearingInfoResponseDto();
        dto.setId(Long.valueOf("1"));
        dto.setResult("テスト結果");
        dto.setProspect("見込み無し");
        dto.setRemark("テストメモ");
        return dto;
    }

    @PostMapping("/inquiry/hearing/list")
    @ResponseBody
	public List<HearingListInfoResponseDto> hearingList(@RequestBody InquiryRequestDto para) {
        ArrayList<HearingListInfoResponseDto> ret = new ArrayList<HearingListInfoResponseDto>();
        HearingListInfoResponseDto dto = new HearingListInfoResponseDto();
        dto = new HearingListInfoResponseDto();
        dto.setId(Long.valueOf("5"));
        dto.setStep("STEP5(本入居、契約に向けて)");
        dto.setMemo("身辺整理等を再確認。");
        dto.setLastUpdate("2024/09/20");
        ret.add(dto);
        dto = new HearingListInfoResponseDto();
        dto.setId(Long.valueOf("4"));
        dto.setStep("STEP4(体験入居感触、本入居に向けて)");
        dto.setMemo("比較的好印象。");
        dto.setLastUpdate("2024/09/15");
        ret.add(dto);
        dto = new HearingListInfoResponseDto();
        dto.setId(Long.valueOf("3"));
        dto.setStep("STEP3(見学感触、体験に向けて)");
        dto.setMemo("人間関係を心配されている様子");
        dto.setLastUpdate("2024/09/13");
        ret.add(dto);
        dto = new HearingListInfoResponseDto();
        dto.setId(Long.valueOf("2"));
        dto.setStep("STEP2(GH体制について確認したいポイント、要望、ニーズ)");
        dto.setMemo("身の回りの世話の提供具合と問題児のサポート体制について危惧");
        dto.setLastUpdate("2024/09/11");
        ret.add(dto);
        dto = new HearingListInfoResponseDto();
        dto.setId(Long.valueOf("1"));
        dto.setStep("STEP1 (相談概要、本人状況等)");
        dto.setMemo("高齢のため、一人での生活に難があるため、入居を検討。");
        dto.setLastUpdate("2024/09/01");
        ret.add(dto);

        return ret;
    }

    @PostMapping("/inquiry/profile")
    @ResponseBody
	public ProfileInfoResponseDto profile(@RequestBody InquiryRequestDto request) {

        ProfileInfoResponseDto dto = inquiryService.getInfoProfile(request);
        return dto;
        
    }

    @PostMapping("/inquiry/sales/follow")
    public ResponseEntity<BaseResponse<List<SalesFollowListResponseDto>>> follows(@RequestBody SalesFollowListRequestDto req) {
        List<SalesFollowListResponseDto> results = inquiryService.getSalesFollows(req);
        return returnSuccess(new BaseResponse<>(results));
    }

    @PostMapping("/inquiry/sales/follow/save")
    public ResponseEntity<BaseResponse<SalesFollowSaveResponseDto>> saveSalesFollow(@Valid @RequestBody SalesFollowSaveRequestDto req) {
        SalesFollowSaveResponseDto res = inquiryService.saveSalesFollow(req);
        return returnSuccess(new BaseResponse<>(res));
    }

    @DeleteMapping("/inquiry/sales/follow/delete/{id}")
    @ResponseBody
    public ResponseEntity<BaseResponse<String>> deleteSalesFollow(@PathVariable(name = "id") Long id) {
        return returnSuccess(new BaseResponse<>("Delete customer sales with ID: " + inquiryService.deleteSalesFollow(id) + " successfully!"));
    }

    @PostMapping("/inquiry/sales")
	public ResponseEntity<BaseResponse<CustomerSalesInfoResponseDto>> sales(@RequestBody CustomerSalesInfoRequestDto req) {
        CustomerSalesInfoResponseDto info = inquiryService.getCustomerSalesInfo(req);
        return returnSuccess(new BaseResponse<>(info));
    }

    @PostMapping("/inquiry/sales/save")
    public ResponseEntity<BaseResponse<CustomerSalesSaveResponseDto>> saveSales(@Valid @RequestBody CustomerSalesSaveRequestDto req) {
        CustomerSalesSaveResponseDto res = inquiryService.saveCustomerSales(req);
        return returnSuccess(new BaseResponse<>(res));
    }

    @DeleteMapping("/inquiry/sales/delete/{id}")
    @ResponseBody
    public ResponseEntity<BaseResponse<String>> deleteSales(@PathVariable(name = "id") Long id) {
        return returnSuccess(new BaseResponse<>("Delete customer sales with ID: " + inquiryService.deleteCustomerSales(id) + " successfully!"));
    }

    @PostMapping("/inquiry/profile/save")
    @ResponseBody
    public ResponseEntity<BaseResponse<SaveProfileInfoResponseDto>> save(@Valid @RequestBody InquiryProfileSaveRequestDto request) {
        SaveProfileInfoResponseDto profileInfo = inquiryService.saveProfileInfo(request);
        return returnSuccess(new BaseResponse<>(profileInfo));
    }
}
