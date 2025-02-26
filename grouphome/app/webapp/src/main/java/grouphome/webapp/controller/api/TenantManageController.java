package grouphome.webapp.controller.api;

import grouphome.webapp.controller.BaseController;
import grouphome.webapp.dto.requests.customer.tenant.*;
import grouphome.webapp.dto.responses.customer.tenant.*;
import grouphome.webapp.dto.responses.blc_common.BaseResponse;
import grouphome.webapp.dto.responses.blc_common.PagerResponse;
import grouphome.webapp.dto.responses.customer.tenant.*;
import grouphome.webapp.dto.responses.customer.tenant.customer_care.CustomerCareDto;
import grouphome.webapp.dto.responses.customer.tenant.customer_medical.CustomerMedicalDto;
import grouphome.webapp.service.define.TenantManageService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import grouphome.webapp.dto.responses.customer.tenant.billing.*;

import java.util.List;

@RestController
public class TenantManageController extends BaseController {
    private final TenantManageService tenantManageService;

    @Autowired
    public TenantManageController(TenantManageService tenantManageService) {
        this.tenantManageService = tenantManageService;
    }

    @PostMapping("/tenant")
    public ResponseEntity<BaseResponse<List<TenantListResponseDto>>> list(@Valid @RequestBody CustomerRequestDto request) {
        PagerResponse<List<TenantListResponseDto>> res = tenantManageService.getList(request);
        return returnSuccess(res);
    }

    @GetMapping("/tenant/{id}")
    public ResponseEntity<BaseResponse<TenantDetailResponseDto>> getDetail(@PathVariable(name = "id", required = true) Long id) {
        TenantDetailResponseDto responseDto = tenantManageService.getDetail(id);
        return returnSuccess(new BaseResponse<>(responseDto));
    }

    @PostMapping("/tenant/save")
    public ResponseEntity<BaseResponse<Long>> saveTenant(@Valid @RequestBody SaveCustomerRequestDto request) {
        Long result = tenantManageService.saveTenant(request);
        return returnSuccess(new BaseResponse<>(result));
    }

    @DeleteMapping("/tenant/{id}")
    public ResponseEntity<BaseResponse<String>> deleteTenant(@PathVariable(name = "id", required = true) Long id) {
        return returnSuccess(new BaseResponse<>("ID: " + tenantManageService.deleteTenant(id) + " の顧客情報を正常に削除しました"));
    }

    @PostMapping("/tenant/medical/save")
    public ResponseEntity<BaseResponse<SaveCustomerMedicalResponseDto>> saveMedical(@Valid @RequestBody SaveCustomerMedicalRequestDto request) {
        SaveCustomerMedicalResponseDto result = tenantManageService.saveMedical(request);
        return returnSuccess(new BaseResponse<>(result));
    }

    @GetMapping("/tenant/medical/{customerId}")
    public ResponseEntity<BaseResponse<CustomerMedicalDto>> getMedical(@PathVariable(name = "customerId", required = true) Long customerId) {
        CustomerMedicalDto dto = tenantManageService.getMedical(customerId);
        return returnSuccess(new BaseResponse<>(dto));
    }

    @PostMapping("/tenant/medical-detail/save")
    public ResponseEntity<BaseResponse<SaveCustomerMedicalDetailResponseDto>> saveMedicalDetail(@Valid @RequestBody SaveCustomerMedicalDetailRequestDto request) {
        SaveCustomerMedicalDetailResponseDto result = tenantManageService.saveMedicalDetail(request);
        return returnSuccess(new BaseResponse<>(result));
    }

    @DeleteMapping("/tenant/medical-detail/delete/{id}")
    public ResponseEntity<BaseResponse<String>> deleteMedicalDetail(@PathVariable(name = "id", required = true) Long id, @RequestBody DeleteDetailRequestDto request) {
        return returnSuccess(new BaseResponse<>("ID: " + tenantManageService.deleteMedicalDetail(id, request) + " の顧客医療詳細を正常に削除しました"));
    }

    @PostMapping("/tenant/care/save")
    public ResponseEntity<BaseResponse<Long>> saveCare(@Valid @RequestBody SaveCustomerCareRequestDto request) {
        Long result = tenantManageService.saveCare(request);
        return returnSuccess(new BaseResponse<>(result));
    }

    @GetMapping("/tenant/care/{customerId}")
    public ResponseEntity<BaseResponse<CustomerCareDto>> getCare(@PathVariable(name = "customerId", required = true) Long customerId) {
        CustomerCareDto dto = tenantManageService.getCare(customerId);
        return returnSuccess(new BaseResponse<>(dto));
    }

    @PostMapping("/tenant/care-detail/save")
    public ResponseEntity<BaseResponse<Long>> saveCareDetail(@Valid @RequestBody SaveCustomerCareDetailRequestDto request) {
        Long result = tenantManageService.saveCareDetail(request);
        return returnSuccess(new BaseResponse<>(result));
    }

    @DeleteMapping("/tenant/care-detail/delete/{id}")
    public ResponseEntity<BaseResponse<String>> deleteCareDetail(@PathVariable(name = "id", required = true) Long id, @RequestBody DeleteDetailRequestDto request) {
        return returnSuccess(new BaseResponse<>("ID: " + tenantManageService.deleteCareDetail(id, request) + " の顧客ケア詳細を正常に削除しました"));
    }

    @PostMapping("/tenant/handbook-status/save")
    public ResponseEntity<BaseResponse<Long>> saveHandbook(@Valid @RequestBody SaveCustomerHandbookStatusRequestDto request) {
        Long result = tenantManageService.saveHandbookStatus(request);
        return returnSuccess(new BaseResponse<>(result));
    }

    @GetMapping("/tenant/handbook-status/{customerId}")
    public ResponseEntity<BaseResponse<CustomerHandbookStatusDto>> getHandbookStatus(@PathVariable(name = "customerId", required = true) Long customerId) {
        CustomerHandbookStatusDto dto = tenantManageService.getHandbookStatus(customerId);
        return returnSuccess(new BaseResponse<>(dto));
    }

    @PostMapping("/tenant/handbook-detail/save")
    public ResponseEntity<BaseResponse<SaveCustomerMedicalDetailResponseDto>> saveHandbookDetail(@Valid @RequestBody SaveCustomerMedicalDetailRequestDto request) {
        SaveCustomerMedicalDetailResponseDto result = tenantManageService.saveMedicalDetail(request);
        return returnSuccess(new BaseResponse<>(result));
    }

    @DeleteMapping("/tenant/handbook-detail/delete/{id}")
    public ResponseEntity<BaseResponse<String>> deleteHandbookDetail(@PathVariable(name = "id", required = true) Long id, DeleteDetailRequestDto request) {
        return returnSuccess(new BaseResponse<>("Delete customer medical detail with ID: " + tenantManageService.deleteMedicalDetail(id, request) + " successfully!"));
    }

    @PostMapping("/tenant/billing/save")
    public ResponseEntity<BaseResponse<Long>> saveCustomerBilling(@Valid @RequestBody SaveCustomerBillingRequestDto request) {
        Long result = tenantManageService.saveCustomerBilling(request);
        return returnSuccess(new BaseResponse<>(result));
    }

    @PostMapping("/tenant/billing-detail/save")
    public ResponseEntity<BaseResponse<Long>> saveCustomerBillingDetail(@Valid @RequestBody SaveCustomerBillingDetailRequestDto request) {
        Long result = tenantManageService.saveCustomerBillingDetail(request);
        return returnSuccess(new BaseResponse<>(result));
    }

    @GetMapping("/tenant/billing/{id}")
    public ResponseEntity<BaseResponse<TenantBillingResponseDto>> getBillingInfo(@PathVariable(name = "id", required = true) Long id) {
        TenantBillingResponseDto responseDto = tenantManageService.getBillingInfo(id);
        return returnSuccess(new BaseResponse<>(responseDto));
    }

    @PostMapping("/tenant/application-status/save")
    public ResponseEntity<BaseResponse<SaveCustomerApplicationStatusResponseDto>> saveApplicationStatus(@Valid @RequestBody SaveCustomerApplicationStatusRequestDto request) {
        SaveCustomerApplicationStatusResponseDto result = tenantManageService.saveApplicationStatus(request);
        return returnSuccess(new BaseResponse<>(result));
    }

    @GetMapping("/tenant/application-status/{id}")
    public ResponseEntity<BaseResponse<TenantApplicationStatusResponseDto>> getApplicationStatusInfo(@PathVariable(name = "id", required = true) Long id) {
        TenantApplicationStatusResponseDto responseDto = tenantManageService.getApplicationStatusInfo(id);
        return returnSuccess(new BaseResponse<>(responseDto));
    }

    @PostMapping("/tenant/document-status/save")
    public ResponseEntity<BaseResponse<Long>> saveDocumentStatus(@Valid @RequestBody SaveCustomerDocumentStatusRequestDto request) {
        Long result = tenantManageService.saveDocumentStatus(request);
        return returnSuccess(new BaseResponse<>(result));
    }

    @GetMapping("/tenant/document-status/{customerId}")
    public ResponseEntity<BaseResponse<CustomerDocumentStatusDto>> getDocumentStatus(@PathVariable(name = "customerId") Long customerId) {
        CustomerDocumentStatusDto dto = tenantManageService.getDocumentStatus(customerId);
        return returnSuccess(new BaseResponse<>(dto));
    }

    @DeleteMapping("/tenant/billing-detail/{id}")
    public ResponseEntity<BaseResponse<String>> deleteBillingDetail(@PathVariable(name = "id", required = true) Long id) {
        return returnSuccess(new BaseResponse<>("Delete billing detail with ID: " + tenantManageService.deleteBillingDetail(id) + " successfully!"));
    }

    @PostMapping("/tenant/movein-document-status/save")
    public ResponseEntity<BaseResponse<Long>> saveMoveinDocumentStatus(@Valid @RequestBody SaveCustomerMoveinDocumentStatusRequestDto request) {
        Long result = tenantManageService.saveMoveinDocumentStatus(request);
        return returnSuccess(new BaseResponse<>(result));
    }

    @GetMapping("/tenant/movein-document-status/{customerId}")
    public ResponseEntity<BaseResponse<CustomerMoveinDocumentStatusDto>> getMoveinDocumentStatus(@PathVariable(name = "customerId") Long customerId) {
        CustomerMoveinDocumentStatusDto dto = tenantManageService.getMoveinDocumentStatus(customerId);
        return returnSuccess(new BaseResponse<>(dto));
    }

    @GetMapping("/tenant/customer-monitoring/{customerId}")
    public ResponseEntity<BaseResponse<List<CustomerMonitoringDto>>> getMonitoringByCustomerId(@PathVariable(name = "customerId") Long customerId) {
        List<CustomerMonitoringDto> dto = tenantManageService.getMonitoringByCustomerId(customerId);
        return returnSuccess(new BaseResponse<>(dto));
    }

    @GetMapping("/tenant/customer-monitoring/detail/{id}")
    public ResponseEntity<BaseResponse<CustomerMonitoringDto>> getMonitoring(@PathVariable(name = "id") Long id) {
        CustomerMonitoringDto dto = tenantManageService.getMonitoring(id);
        return returnSuccess(new BaseResponse<>(dto));
    }

    @PostMapping("/tenant/customer-monitoring/save")
    public ResponseEntity<BaseResponse<Long>> saveMonitoring(@Valid @RequestBody SaveCustomerMonitoringRequestDto request) {
        Long result = tenantManageService.saveMonitoring(request);
        return returnSuccess(new BaseResponse<>(result));
    }

    @DeleteMapping("/tenant/customer-monitoring/{id}")
    public ResponseEntity<BaseResponse<String>> deleteMonitoring(@PathVariable(name = "id") Long id, @RequestBody DeleteDetailRequestDto request) {
        return returnSuccess(new BaseResponse<>("ID: " + tenantManageService.deleteMonitoring(id, request) + " の顧客モニタリングを正常に削除しました"));
    }
}
