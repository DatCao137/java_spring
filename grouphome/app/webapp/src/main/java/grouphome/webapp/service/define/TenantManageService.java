package grouphome.webapp.service.define;

import grouphome.webapp.dto.requests.customer.tenant.*;
import grouphome.webapp.dto.responses.blc_common.PagerResponse;
import grouphome.webapp.dto.responses.customer.tenant.*;
import grouphome.webapp.dto.responses.customer.tenant.customer_care.CustomerCareDto;
import grouphome.webapp.dto.responses.customer.tenant.customer_medical.CustomerMedicalDto;
import grouphome.webapp.dto.responses.customer.tenant.billing.*;

import java.util.List;

public interface TenantManageService {
    PagerResponse<List<TenantListResponseDto>> getList(CustomerRequestDto request);
    TenantDetailResponseDto getDetail(Long id);
    Long saveTenant(SaveCustomerRequestDto request);
    Long deleteTenant(Long id);
    SaveCustomerMedicalResponseDto saveMedical(SaveCustomerMedicalRequestDto request);
    CustomerMedicalDto getMedical(Long customerId);
    SaveCustomerMedicalDetailResponseDto saveMedicalDetail(SaveCustomerMedicalDetailRequestDto request);
    Long deleteMedicalDetail(Long id, DeleteDetailRequestDto request);
    Long saveCare(SaveCustomerCareRequestDto request);
    CustomerCareDto getCare(Long customerId);
    Long saveCareDetail(SaveCustomerCareDetailRequestDto request);
    Long deleteCareDetail(Long id, DeleteDetailRequestDto request);

    Long saveCustomerBilling(SaveCustomerBillingRequestDto request);
    Long saveCustomerBillingDetail(SaveCustomerBillingDetailRequestDto request);

    TenantBillingResponseDto getBillingInfo(Long id);
    SaveCustomerApplicationStatusResponseDto saveApplicationStatus(SaveCustomerApplicationStatusRequestDto request);
    TenantApplicationStatusResponseDto getApplicationStatusInfo(Long id);
    Long saveHandbookStatus(SaveCustomerHandbookStatusRequestDto request);
    CustomerHandbookStatusDto getHandbookStatus(Long customerId);
    Long saveDocumentStatus(SaveCustomerDocumentStatusRequestDto request);
    CustomerDocumentStatusDto getDocumentStatus(Long customerId);
    Long deleteBillingDetail(Long id);
    Long saveMoveinDocumentStatus(SaveCustomerMoveinDocumentStatusRequestDto request);
    CustomerMoveinDocumentStatusDto getMoveinDocumentStatus(Long customerId);
    List<CustomerMonitoringDto> getMonitoringByCustomerId(Long customerId);
    CustomerMonitoringDto getMonitoring(Long id);
    Long saveMonitoring(SaveCustomerMonitoringRequestDto request);
    Long deleteMonitoring(Long id, DeleteDetailRequestDto request);
}
