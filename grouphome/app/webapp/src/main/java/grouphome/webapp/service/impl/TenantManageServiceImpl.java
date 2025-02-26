package grouphome.webapp.service.impl;

import grouphome.webapp.dto.requests.customer.tenant.*;
import grouphome.webapp.dto.responses.blc_common.PagerResponse;
import grouphome.webapp.dto.responses.customer.tenant.*;
import grouphome.webapp.dto.responses.customer.tenant.customer_care.CustomerCareDetailDto;
import grouphome.webapp.dto.responses.customer.tenant.customer_care.CustomerCareDto;
import grouphome.webapp.dto.responses.customer.tenant.customer_medical.CustomerMedicalDetailDto;
import grouphome.webapp.dto.responses.customer.tenant.customer_medical.CustomerMedicalDto;
import grouphome.webapp.dto.responses.customer.tenant.billing.*;
import grouphome.webapp.entity.*;
import grouphome.webapp.exception.ApiException;
import grouphome.webapp.repository.define.customer.*;
import grouphome.webapp.service.define.TenantManageService;
import grouphome.webapp.service.specification.TenantSpecification;
import grouphome.webapp.utils.ResponseCodeAndMsg;
import jakarta.persistence.PessimisticLockException;
import org.hibernate.exception.LockAcquisitionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionSystemException;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.Collections; 

@Service
@Transactional
public class TenantManageServiceImpl implements TenantManageService {
    private final TenantManageRepository tenantManageRepository;
    private final CustomerMedicalRepository customerMedicalRepository;
    private final CustomerMedicalDetailRepository customerMedicalDetailRepository;
    private final CustomerBillingRepository customerBillingRepository;
    private final CustomerBillingDetailRepository customerBillingDetailRepository;
    private final CustomerApplicationStatusRepository customerApplicationStatusRepository;

    protected final Logger log = LoggerFactory.getLogger(this.getClass());
    private final CustomerCareRepository customerCareRepository;
    private final CustomerCareDetailRepository customerCareDetailRepository;
    private final CustomerHandbookStatusRepository customerHandbookStatusRepository;
    private final CustomerDocumentStatusRepository customerDocumentStatusRepository;
    private final CustomerMoveinDocumentStatusRepository customerMoveinDocumentStatusRepository;
    private final CustomerMonitoringRepository customerMonitoringRepository;

    @Autowired
    public TenantManageServiceImpl(
            TenantManageRepository tenantManageRepository,
            CustomerMedicalRepository customerMedicalRepository,
            CustomerMedicalDetailRepository customerMedicalDetailRepository,
            CustomerCareRepository customerCareRepository,
            CustomerBillingRepository customerBillingRepository,
            CustomerBillingDetailRepository customerBillingDetailRepository,
            CustomerApplicationStatusRepository customerApplicationStatusRepository,
            CustomerCareDetailRepository customerCareDetailRepository,
            CustomerHandbookStatusRepository customerHandbookStatusRepository,
            CustomerDocumentStatusRepository customerDocumentStatusRepository, CustomerMoveinDocumentStatusRepository customerMoveinDocumentStatusRepository, CustomerMonitoringRepository customerMonitoringRepository) {
        this.tenantManageRepository = tenantManageRepository;
        this.customerMedicalRepository = customerMedicalRepository;
        this.customerMedicalDetailRepository = customerMedicalDetailRepository;
        this.customerCareRepository = customerCareRepository;
        this.customerCareDetailRepository = customerCareDetailRepository;
        this.customerBillingRepository = customerBillingRepository;
        this.customerBillingDetailRepository = customerBillingDetailRepository;
        this.customerApplicationStatusRepository = customerApplicationStatusRepository;
        this.customerHandbookStatusRepository = customerHandbookStatusRepository;
        this.customerDocumentStatusRepository = customerDocumentStatusRepository;
        this.customerMoveinDocumentStatusRepository = customerMoveinDocumentStatusRepository;
        this.customerMonitoringRepository = customerMonitoringRepository;
    }

    /**
     * getList
     *
     * @param request TenantRequestDto
     * @return PagerResponse<List < TenantListResponseDto>>
     */
    @Override
    public PagerResponse<List<TenantListResponseDto>> getList(CustomerRequestDto request) {
//        String sortBy = request.getSortBy();
//        String sortDirection = request.getSortDirection();
//        Sort sort = sortDirection.equalsIgnoreCase("asc")
//                ? Sort.by(Sort.Order.asc(sortBy))
//                : Sort.by(Sort.Order.desc(sortBy));
        Pageable pageable = PageRequest.of(
                request.getPageNumber() - 1,
                request.getPageSize(),
                Sort.by(Sort.Order.desc("createdAt"))
        );

        String ageString = request.getFilter().getAge();
        Integer minAge = null;
        Integer maxAge = null;

        if (ageString != null && !ageString.isEmpty() && !ageString.equals(",")) {
            String[] ageParts = ageString.split(",");

            if (ageParts.length == 1) {
                ageParts = new String[] { ageParts[0], "100" }; 
            }
                
            if(ageParts.length > 1 && !(( ageParts[0] == null || ageParts[0].trim().isEmpty()) && ( ageParts[1] == null || ageParts[1].trim().isEmpty()))) {
                minAge = (ageParts[0] == null || ageParts[0].trim().isEmpty()) ? 0 : Integer.parseInt(ageParts[0].trim());
                maxAge = (ageParts[1] == null || ageParts[1].trim().isEmpty()) ? 100 : Integer.parseInt(ageParts[1].trim());
            }
        }

        List<String> YMs = ageString == null ? null : (ageString.isEmpty() || ageString.equals(",")) ?  Collections.emptyList() : getAgeMonths(minAge, maxAge);

        String status = request.getFilter().getStatus();
        List<Integer> statusList = status == null ? null : status.isEmpty() ? Collections.emptyList() : Arrays.stream(status.split(","))
                .filter(s -> !s.isEmpty())
                .map(Integer::parseInt)
                .toList();

        String categoryString = request.getFilter().getCategory();
        List<Integer> categoryList = categoryString == null ? null : categoryString.isEmpty() ? Collections.emptyList() : Arrays.stream(categoryString.split(","))
                .filter(s -> !s.isEmpty())
                .map(Integer::parseInt)
                .toList();

        String sexString = request.getFilter().getSex();
        List<String> sexList = sexString == null ? null : sexString.isEmpty() ? Collections.emptyList() : Arrays.asList(sexString.split(","));

        Specification<CustomerInfoEntity> spec = TenantSpecification.getSpecification(
                request.getFilter().getName(),
                request.getFilter().getNameGana(),
                request.getFilter().getNickname(),
                sexList,
                YMs,
                statusList, 
                request.getFilter().getMoveInAt(),
                request.getFilter().getLeavingAt(),
                categoryList,
                request.getFilter().getRoomNo(),
                request.getFilter().getBrunchName(),
                request.getFilter().getUnitName()
        );
        Page<CustomerInfoEntity> entityPage = tenantManageRepository.findAll(spec, pageable);

        List<TenantListResponseDto> tenantList = entityPage.stream()
                .map(this::convert2ListDto)
                .collect(Collectors.toList());

        PagerResponse<List<TenantListResponseDto>> response = new PagerResponse<>(tenantList);
        response.setTotalRecord((int) entityPage.getTotalElements());
        response.setTotalPage(entityPage.getTotalPages());

        return response;
    }

    /**
     * getDetail
     *
     * @param id Long
     * @return TenantDetailResponseDto
     */
    @Override
    public TenantDetailResponseDto getDetail(Long id) {
        CustomerInfoEntity entity = tenantManageRepository.findById(id)
                .orElseThrow(
                        () -> new ApiException(ResponseCodeAndMsg.NOT_FOUND, "顧客情報のID: " + id + " が見つかりません")
                );
        TenantDetailResponseDto detail = new TenantDetailResponseDto();
        detail.setId(entity.getId());
        detail.setName(entity.getName());
        detail.setNameGana(entity.getNameGana());
        detail.setPersonal(entity.getPersonal());
        detail.setDetails(entity.getDetails());
        detail.setCategory(entity.getCategory());
        detail.setBranchId(entity.getCustomerUnit() != null ? entity.getCustomerUnit().getBrunchId() : null);
        detail.setInfoUpdatedAt(entity.getUpdatedAt());
        detail.setCustomerUnitId(entity.getCustomerUnit() != null ? entity.getCustomerUnit().getId() : null);
        detail.setUnitUpdatedAt(entity.getCustomerUnit() != null ? entity.getCustomerUnit().getUpdatedAt() : null);
        return detail;
    }

    /**
     * saveTenant
     *
     * @param request SaveTenantRequestDto
     * @return Long
     */
    @Override
    @Transactional
    public Long saveTenant(SaveCustomerRequestDto request) {
        Long id = request.getId();
        CustomerInfoEntity customerInfo = (id == null) ? new CustomerInfoEntity()
                : tenantManageRepository.findById4Update(id)
                .orElse(new CustomerInfoEntity());

        if ((customerInfo.getUpdatedAt() != null)
            && (request.getUpdatedAt() == null || !customerInfo.getUpdatedAt().isEqual(request.getUpdatedAt()))) {
            throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
        }

        try {
            // save customer info
            customerInfo.setName(request.getName());
            customerInfo.setNameGana(request.getNameGana());
            customerInfo.setPersonal(request.getPersonal());
            customerInfo.setDetails(request.getDetails());
            customerInfo.setCategory(request.getCategory());
            customerInfo.setBaseCustomerId(request.getBaseCustomerId());
            customerInfo = tenantManageRepository.save(customerInfo);

            return customerInfo.getId();
        } catch (PessimisticLockException | LockAcquisitionException | TransactionSystemException e) {
            throw e;
        } catch (Exception e) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, e.getMessage());
        }
    }

    /**
     * @param id Long
     * @return Long
     */
    @Override
    @Transactional
    public Long deleteTenant(Long id) {
        CustomerInfoEntity customerInfo = tenantManageRepository
                .findById4Update(id)
                .orElseThrow(
                        () -> new ApiException(ResponseCodeAndMsg.NOT_FOUND, "Customer info with id: " + id + " not found"));

//        CustomerUnitEntity customerUnit = customerUnitRepository
//                .findById4Update(customerInfo.getCustomerUnit().getId())
//                .orElseThrow(
//                        () -> new ApiException(ResponseCodeAndMsg.NOT_FOUND, "Customer unit with customer id: " + id + " not found")
//                );

        CustomerMedicalEntity medical = customerMedicalRepository
                .findByCustomerId(id)
                .orElse(null);
        customerInfo.setDeletedAt(LocalDateTime.now());
//        customerUnit.setDeletedAt(LocalDateTime.now());
        if (medical != null) {
            medical.setDeletedAt(LocalDateTime.now());
        }
        try {
            tenantManageRepository.save(customerInfo);
//            customerUnitRepository.save(customerUnit);
            if (medical != null) {
                customerMedicalRepository.save(medical);
            }
            return id;
        } catch (PessimisticLockException | LockAcquisitionException | TransactionSystemException e) {
            throw e;
        } catch (Exception e) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, e.getMessage());
        }
    }

    /**
     * saveMedical
     *
     * @param request SaveCustomerMedicalRequestDto
     * @return SaveCustomerMedicalResponseDto
     */
    @Override
    @Transactional
    public SaveCustomerMedicalResponseDto saveMedical(SaveCustomerMedicalRequestDto request) {
        Long customerId = request.getCustomerId();

        if (customerId == null) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, "customerIdが必要です。");
        }

        // check whether customer info exist or not
        tenantManageRepository.findById(customerId)
                .orElseThrow(
                        () -> new ApiException(
                                ResponseCodeAndMsg.NOT_FOUND,
                                "Customer info with id: " + customerId + " not found"
                        )
                );

        CustomerMedicalEntity entity = customerMedicalRepository.findByCustomerId(customerId)
                .orElse(new CustomerMedicalEntity());

        if ((entity.getUpdatedAt() != null)
            && (!entity.getUpdatedAt().isEqual(request.getUpdatedAt()))) {
            throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
        }

        entity.setCustomerId(customerId);
        entity.setInsuranceTypeId(request.getInsuranceTypeId());
        entity.setNumber(request.getNumber());

        try {
            CustomerMedicalEntity savedEntity = customerMedicalRepository.save(entity);
            return new SaveCustomerMedicalResponseDto(savedEntity.getId(), savedEntity.getCustomerId());
        } catch (PessimisticLockException | LockAcquisitionException | TransactionSystemException e) {
            throw e;
        } catch (Exception e) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, e.getMessage());
        }
    }

    /**
     * getMedical
     *
     * @param customerId Long
     * @return CustomerMedicalDto
     */
    @Override
    public CustomerMedicalDto getMedical(Long customerId) {
        CustomerMedicalEntity entity = customerMedicalRepository.findByCustomerId(customerId)
                .orElseThrow(
                        () -> new ApiException(ResponseCodeAndMsg.NOT_FOUND, "Customer medical with customerId: " + customerId + " not found")
                );
        return convert2MedicalDto(entity);
    }

    /**
     * saveMedicalDetail
     *
     * @param request SaveCustomerMedicalDetailRequestDto
     * @return SaveCustomerMedicalDetailResponseDto
     */
    @Override
    @Transactional
    public SaveCustomerMedicalDetailResponseDto saveMedicalDetail(SaveCustomerMedicalDetailRequestDto request) {
        Long medicalId = request.getMedicalId();
        Long customerId = request.getCustomerId();
        Long id = request.getId();

        // check whether customer info exist or not
        tenantManageRepository.findById(customerId)
                .orElseThrow(
                        () -> new ApiException(
                                ResponseCodeAndMsg.NOT_FOUND,
                                "Customer info with id: " + customerId + " not found"
                        )
                );

        CustomerMedicalDetailEntity entity = (id == null)
                ? new CustomerMedicalDetailEntity()
                : (
                customerMedicalDetailRepository.findById4Update(id)
                        .orElse(new CustomerMedicalDetailEntity())
        );

        if (entity.getUpdatedAt() != null
            && !entity.getUpdatedAt().equals(request.getUpdatedAt())) {
            throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
        }
        int sub;
        if (request.getSub() == null) {
            sub = customerMedicalDetailRepository.countByMedicalId(request.getMedicalId()) + 1;
        } else {
            sub = request.getSub();
        }

        entity.setMedicalId(medicalId);
        entity.setSub(sub);
        entity.setServiceName(request.getServiceName());
        entity.setInstitution(request.getInstitution());
        entity.setStatus(request.getStatus());
        entity.setPace(request.getPace());

        try {
            CustomerMedicalDetailEntity savedEntity = customerMedicalDetailRepository.save(entity);
            return new SaveCustomerMedicalDetailResponseDto(savedEntity.getId(), savedEntity.getMedicalId(), savedEntity.getUpdatedAt());
        } catch (PessimisticLockException | LockAcquisitionException | TransactionSystemException e) {
            throw e;
        } catch (Exception e) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, e.getMessage());
        }
    }

    /**
     * deleteMedicalDetail
     *
     * @param id Long
     * @return Long
     */
    @Override
    @Transactional
    public Long deleteMedicalDetail(Long id, DeleteDetailRequestDto request) {
        Long customerId = request.getCustomerId();

        if (customerId != null) {
            tenantManageRepository.findById(customerId)
                    .orElseThrow(
                            () -> new ApiException(
                                    ResponseCodeAndMsg.NOT_FOUND,
                                    "ID: " + customerId + " の顧客情報が見つかりません"
                            )
                    );
        }

        CustomerMedicalDetailEntity entity = customerMedicalDetailRepository.findById4Update(id)
                .orElseThrow(
                        () -> new ApiException(
                                ResponseCodeAndMsg.NOT_FOUND,
                                "Customer medical detail with id: " + id + " not found"
                        )
                );

        if (entity.getUpdatedAt() != null
            && (request.getUpdatedAt() == null || !entity.getUpdatedAt().equals(request.getUpdatedAt()))) {
            throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
        }
        entity.setDeletedAt(LocalDateTime.now());

        try {
            customerMedicalDetailRepository.save(entity);
            return id;
        } catch (PessimisticLockException | LockAcquisitionException | TransactionSystemException e) {
            throw e;
        } catch (Exception e) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, e.getMessage());
        }
    }

    /**
     * saveCare
     *
     * @param request SaveCustomerCareRequestDto
     * @return Long
     */
    @Override
    @Transactional
    public Long saveCare(SaveCustomerCareRequestDto request) {
        Long customerId = request.getCustomerId();
        Long id = request.getId();

        if (customerId == null) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, "customerIDが必要です。");
        }

        // check whether customer info exist or not
        tenantManageRepository.findById(customerId)
                .orElseThrow(
                        () -> new ApiException(
                                ResponseCodeAndMsg.NOT_FOUND,
                                "Customer info with id: " + customerId + " not found"
                        )
                );

        CustomerCareEntity entity = (id == null)
                ? new CustomerCareEntity()
                : customerCareRepository.findById4Update(id)
                .orElse(new CustomerCareEntity());

        if ((entity.getUpdatedAt() != null)
            && (!entity.getUpdatedAt().isEqual(request.getUpdatedAt()))) {
            throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
        }

        entity.setCustomerId(customerId);
        entity.setCareNo(request.getCareNo());
        entity.setCareTypeId(request.getCareTypeId());
        entity.setLimit(request.getLimit());

        try {
            CustomerCareEntity savedEntity = customerCareRepository.save(entity);
            return savedEntity.getId();
        } catch (PessimisticLockException | LockAcquisitionException | TransactionSystemException e) {
            throw e;
        } catch (Exception e) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, e.getMessage());
        }
    }

    /**
     * getCare
     *
     * @param customerId Long
     * @return CustomerCareDto
     */
    @Override
    public CustomerCareDto getCare(Long customerId) {
        CustomerCareEntity entity = customerCareRepository.findByCustomerId(customerId)
                .orElseThrow(
                        () -> new ApiException(ResponseCodeAndMsg.NOT_FOUND, "Customer care with customerId: " + customerId + " not found")
                );
        return convert2CareDto(entity);
    }

    /**
     * saveCareDetail
     *
     * @param request SaveCustomerCareDetailRequestDto
     * @return Long
     */
    @Override
    @Transactional
    public Long saveCareDetail(SaveCustomerCareDetailRequestDto request) {
        Long id = request.getId();
        CustomerCareDetailEntity entity = (id == null)
                ? new CustomerCareDetailEntity()
                : customerCareDetailRepository.findById4Update(id)
                .orElse(new CustomerCareDetailEntity());

        if ((entity.getUpdatedAt() != null)
            && (!entity.getUpdatedAt().isEqual(request.getUpdatedAt()))) {
            throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
        }

        int sub;
        if (request.getSub() == null) {
            sub = customerCareDetailRepository.countByCareId(request.getCareId()) + 1;
        } else {
            sub = request.getSub();
        }

        entity.setCareId(request.getCareId());
        entity.setSub(sub);
        entity.setServiceName(request.getServiceName());
        entity.setUseCompany(request.getUseCompany());
        entity.setPace(request.getPace());
        entity.setStatus(request.getStatus());

        try {
            CustomerCareDetailEntity savedEntity = customerCareDetailRepository.save(entity);
            return savedEntity.getId();
        } catch (PessimisticLockException | LockAcquisitionException | TransactionSystemException e) {
            throw e;
        } catch (Exception e) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, e.getMessage());
        }
    }

    /**
     * deleteCareDetail
     *
     * @param id Long
     * @return Long
     */
    @Override
    @Transactional
    public Long deleteCareDetail(Long id, DeleteDetailRequestDto request) {
        Long customerId = request.getCustomerId();

        if (customerId != null) {
            tenantManageRepository.findById(customerId)
                    .orElseThrow(
                            () -> new ApiException(
                                    ResponseCodeAndMsg.NOT_FOUND,
                                    "ID: " + customerId + " の顧客情報が見つかりません"
                            )
                    );
        }

        CustomerCareDetailEntity entity = customerCareDetailRepository.findById4Update(id)
                .orElseThrow(
                        () -> new ApiException(
                                ResponseCodeAndMsg.NOT_FOUND,
                                "Customer care detail with id: " + id + " not found"
                        )
                );

        if (entity.getUpdatedAt() != null
            && (request.getUpdatedAt() == null || !entity.getUpdatedAt().equals(request.getUpdatedAt()))) {
            throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
        }

        entity.setDeletedAt(LocalDateTime.now());

        try {
            customerCareDetailRepository.save(entity);
            return id;
        } catch (PessimisticLockException | LockAcquisitionException | TransactionSystemException e) {
            throw e;
        } catch (Exception e) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, e.getMessage());
        }
    }

    /**
     * saveHandbookStatus
     *
     * @param request SaveCustomerHandbookStatusRequestDto
     * @return Long
     */
    @Override
    @Transactional
    public Long saveHandbookStatus(SaveCustomerHandbookStatusRequestDto request) {
        Long id = request.getId();
        Long customerId = request.getCustomerId();

        if (customerId == null) {
            throw new ApiException(ResponseCodeAndMsg.NOT_FOUND, "customerIdは必須項目です。");
        }

        tenantManageRepository.findById(customerId)
                .orElseThrow(
                        () -> new ApiException(
                                ResponseCodeAndMsg.NOT_FOUND,
                                "ID: " + customerId + " の顧客情報が見つかりません"
                        )
                );

        CustomerHandbookStatusEntity entity = (id == null)
                ? new CustomerHandbookStatusEntity()
                : customerHandbookStatusRepository.findById4Update(id)
                .orElse(
                        customerHandbookStatusRepository.findByCustomerId(customerId)
                                .orElse(new CustomerHandbookStatusEntity())
                );

        if (entity.getUpdatedAt() != null
            && (request.getUpdatedAt() == null || !entity.getUpdatedAt().equals(request.getUpdatedAt()))) {
            throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
        }

        entity.setCustomerId(customerId);
        entity.setRecipient(request.getRecipient());
        entity.setDisabled(request.getDisabled());
        entity.setLimit(request.getLimit());
        entity.setVisitingPlace(request.getVisitingPlace());
        entity.setService(request.getService());
        entity.setHandbookType(request.getHandbookType());

        try {
            CustomerHandbookStatusEntity savedEntity = customerHandbookStatusRepository.save(entity);
            return savedEntity.getId();
        } catch (PessimisticLockException | LockAcquisitionException | TransactionSystemException e) {
            throw e;
        } catch (Exception e) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, e.getMessage());
        }
    }

    /**
     * getHandbookStatus
     *
     * @param customerId Long
     * @return CustomerHandbookStatusDto
     */
    @Override
    public CustomerHandbookStatusDto getHandbookStatus(Long customerId) {
        CustomerHandbookStatusEntity entity = customerHandbookStatusRepository.findByCustomerId(customerId)
                .orElseThrow(
                        () -> new ApiException(
                                ResponseCodeAndMsg.NOT_FOUND,
                                "ID: " + customerId + " の顧客情報が見つかりません")
                );
        return convert2HandbookStatusDto(entity);
    }

    /**
     * saveDocumentStatus
     *
     * @param request SaveCustomerDocumentStatusRequestDto
     * @return Long
     */
    @Override
    @Transactional
    public Long saveDocumentStatus(SaveCustomerDocumentStatusRequestDto request) {
        Long id = request.getId();
        Long customerId = request.getCustomerId();

        if (customerId == null) {
            throw new ApiException(ResponseCodeAndMsg.NOT_FOUND, "customerIdは必須項目です。");
        }

        tenantManageRepository.findById(customerId)
                .orElseThrow(
                        () -> new ApiException(
                                ResponseCodeAndMsg.NOT_FOUND,
                                "ID: " + customerId + " の顧客情報が見つかりません"
                        )
                );

        CustomerDocumentStatusEntity entity = (id == null)
                ? new CustomerDocumentStatusEntity()
                : customerDocumentStatusRepository.findById4Update(id)
                .orElse(
                        customerDocumentStatusRepository.findByCustomerId(customerId)
                                .orElse(new CustomerDocumentStatusEntity())
                );

        if (entity.getUpdatedAt() != null
            && (request.getUpdatedAt() == null || !entity.getUpdatedAt().equals(request.getUpdatedAt()))) {
            throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
        }

        entity.setCustomerId(customerId);
        entity.setTour(request.getTour());
        entity.setAssessment(request.getAssessment());
        entity.setTrial(request.getTrial());
        entity.setTrialImportantExperience(request.getTrialImportantExperience());
        entity.setUsageContract(request.getUsageContract());
        entity.setImportantExperience(request.getImportantExperience());
        entity.setPlan(request.getPlan());
        entity.setMonitoring(request.getMonitoring());
        try {
            CustomerDocumentStatusEntity savedEntity = customerDocumentStatusRepository.save(entity);
            return savedEntity.getId();
        } catch (PessimisticLockException | LockAcquisitionException | TransactionSystemException e) {
            throw e;
        } catch (Exception e) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, e.getMessage());
        }
    }

    /**
     * getDocumentStatus
     *
     * @param customerId Long
     * @return CustomerDocumentStatusDto
     */
    @Override
    public CustomerDocumentStatusDto getDocumentStatus(Long customerId) {
        CustomerDocumentStatusEntity entity = customerDocumentStatusRepository.findByCustomerId(customerId)
                .orElseThrow(
                        () -> new ApiException(
                                ResponseCodeAndMsg.NOT_FOUND,
                                "ID: " + customerId + " の顧客情報が見つかりません")
                );
        return convert2DocumentStatusDto(entity);
    }

    /**
     * saveMoveinDocumentStatus
     *
     * @param request SaveCustomerMoveinDocumentStatusRequestDto
     * @return Long
     */
    @Override
    @Transactional
    public Long saveMoveinDocumentStatus(SaveCustomerMoveinDocumentStatusRequestDto request) {
        Long id = request.getId();
        Long customerId = request.getCustomerId();

        if (customerId == null) {
            throw new ApiException(ResponseCodeAndMsg.NOT_FOUND, "customerIdは必須項目です。");
        }

        tenantManageRepository.findById(customerId)
                .orElseThrow(
                        () -> new ApiException(
                                ResponseCodeAndMsg.NOT_FOUND,
                                "ID: " + customerId + " の顧客情報が見つかりません"
                        )
                );

        if (id != null && customerMoveinDocumentStatusRepository.existsById(id) && !customerMoveinDocumentStatusRepository.existsByIdAndUpdatedAtAndDeletedAtIsNull(id, request.getUpdatedAt())) {
            throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
        }

        CustomerMoveinDocumentStatusEntity entity = (id == null)
                ? new CustomerMoveinDocumentStatusEntity()
                : customerMoveinDocumentStatusRepository.findById4Update(id)
                .orElse(
                        customerMoveinDocumentStatusRepository.findByCustomerId(customerId)
                                .orElse(new CustomerMoveinDocumentStatusEntity())
                );

        entity.setCustomerId(customerId);
        entity.setBasic(request.getBasic());
        entity.setPlan1st(request.getPlan1st());
        entity.setMemo(request.getMemo());
        try {
            CustomerMoveinDocumentStatusEntity savedEntity = customerMoveinDocumentStatusRepository.save(entity);
            return savedEntity.getId();
        } catch (PessimisticLockException | LockAcquisitionException | TransactionSystemException e) {
            throw e;
        } catch (Exception e) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, e.getMessage());
        }
    }

    /**
     * getMoveinDocumentStatus
     *
     * @param customerId Long
     * @return CustomerMoveinDocumentStatusDto
     */
    @Override
    @Transactional(readOnly = true)
    public CustomerMoveinDocumentStatusDto getMoveinDocumentStatus(Long customerId) {
        CustomerMoveinDocumentStatusEntity entity = customerMoveinDocumentStatusRepository.findByCustomerIdAndDeletedAtIsNull(customerId)
                .orElseThrow(
                        () -> new ApiException(
                                ResponseCodeAndMsg.NOT_FOUND,
                                "ID: " + customerId + " の顧客情報が見つかりません")
                );
        return convert2MoveinDocumentStatusDto(entity);
    }

    /**
     * getMonitoringByCustomerId
     *
     * @param customerId Long
     * @return List<CustomerMonitoringDto>
     */
    @Override
    @Transactional(readOnly = true)
    public List<CustomerMonitoringDto> getMonitoringByCustomerId(Long customerId) {
        if (customerId == null || customerId < 1) return null;
        tenantManageRepository.findById(customerId)
                .orElseThrow(
                        () -> new ApiException(
                                ResponseCodeAndMsg.NOT_FOUND,
                                "ID: " + customerId + " の顧客情報が見つかりません"
                        )
                );
        return customerMonitoringRepository.findAllByCustomerIdAndDeletedAtIsNullOrderByCreatedAtDesc(customerId)
                .stream()
                .map((entity) -> {
                    CustomerMonitoringDto dto = new CustomerMonitoringDto();
                    dto.setId(entity.getId());
                    dto.setCustomerId(customerId);
                    dto.setYyyymm(entity.getYyyymm());
                    dto.setInfo(entity.getInfo());
                    dto.setUpdatedAt(entity.getUpdatedAt());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    /**
     * getMonitoring
     *
     * @param id Long
     * @return CustomerMonitoringDto
     */
    @Override
    @Transactional(readOnly = true)
    public CustomerMonitoringDto getMonitoring(Long id) {
        if (id == null || id < 1) {
            throw new ApiException(ResponseCodeAndMsg.NOT_FOUND, "ID: " + id + " の顧客モニタリングは存在しません");
        }
        CustomerMonitoringEntity entity = customerMonitoringRepository.findById(id)
                .orElseThrow(
                        () -> new ApiException(
                                ResponseCodeAndMsg.NOT_FOUND,
                                "ID: " + id + " の顧客モニタリングは存在しません"
                        )
                );
        CustomerMonitoringDto dto = new CustomerMonitoringDto();
        dto.setId(entity.getId());
        dto.setCustomerId(entity.getCustomerId());
        dto.setYyyymm(entity.getYyyymm());
        dto.setInfo(entity.getInfo());
        dto.setUpdatedAt(entity.getUpdatedAt());
        return dto;
    }

    /**
     * saveMonitoring
     *
     * @param request SaveCustomerMonitoringRequestDto
     * @return Long
     */
    @Override
    @Transactional
    public Long saveMonitoring(SaveCustomerMonitoringRequestDto request) {
        Long customerId = request.getCustomerId();
        Long id = request.getId();

        if (customerId == null || customerId < 1) {
            throw new ApiException(ResponseCodeAndMsg.NOT_FOUND, "customerIdは必須項目です。");
        }

        tenantManageRepository.findById(customerId)
                .orElseThrow(
                        () -> new ApiException(
                                ResponseCodeAndMsg.NOT_FOUND,
                                "ID: " + customerId + " の顧客情報が見つかりません"
                        )
                );

        CustomerMonitoringEntity entity = (id == null)
                ? new CustomerMonitoringEntity()
                : customerMonitoringRepository.findById4Update(id)
                .orElse(
                        customerMonitoringRepository.findByCustomerIdAndYyyymmAndDeletedAtIsNull(customerId, request.getYyyymm())
                                .orElse(new CustomerMonitoringEntity())
                );

        if (entity.getUpdatedAt() != null
            && (request.getUpdatedAt() == null || !entity.getUpdatedAt().equals(request.getUpdatedAt()))) {
            throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
        }

        entity.setCustomerId(customerId);
        entity.setYyyymm(request.getYyyymm());
        entity.setInfo(request.getInfo());
        try {
            CustomerMonitoringEntity savedEntity = customerMonitoringRepository.save(entity);
            return savedEntity.getId();
        } catch (PessimisticLockException | LockAcquisitionException | TransactionSystemException e) {
            throw e;
        } catch (Exception e) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, e.getMessage());
        }
    }

    /**
     * deleteMonitoring
     *
     * @param id      Long
     * @param request DeleteDetailRequestDto
     * @return String
     */
    @Override
    @Transactional
    public Long deleteMonitoring(Long id, DeleteDetailRequestDto request) {
        Long customerId = request.getCustomerId();

        if (customerId == null || customerId < 1) {
            throw new ApiException(ResponseCodeAndMsg.NOT_FOUND, "customerIdは必須項目です。");
        }

        tenantManageRepository.findById(customerId)
                .orElseThrow(
                        () -> new ApiException(
                                ResponseCodeAndMsg.NOT_FOUND,
                                "ID: " + customerId + " の顧客情報が見つかりません"
                        )
                );

        if (id == null || id < 1 || !customerMonitoringRepository.existsById(id)) {
            throw new ApiException(ResponseCodeAndMsg.NOT_FOUND, "ID: " + id + " の顧客モニタリングが見つかりませんでした");
        }

        CustomerMonitoringEntity entity = customerMonitoringRepository.findById4Update(id)
                .orElseThrow(
                        () -> new ApiException(
                                ResponseCodeAndMsg.NOT_FOUND,
                                "ID: " + id + " の顧客モニタリングが見つかりませんでした"
                        )
                );
        if (entity.getUpdatedAt() != null
            && (request.getUpdatedAt() == null || !entity.getUpdatedAt().equals(request.getUpdatedAt()))) {
            throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
        }
        entity.setDeletedAt(LocalDateTime.now());
        try {
            customerMonitoringRepository.save(entity);
            return id;
        } catch (PessimisticLockException | LockAcquisitionException | TransactionSystemException e) {
            throw e;
        } catch (Exception e) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, e.getMessage());
        }
    }

    private TenantListResponseDto convert2ListDto(CustomerInfoEntity entity) {
        TenantListResponseDto dto = new TenantListResponseDto();
       CustomerUnitEntity customerUnit = entity.getCustomerUnit();
       if (customerUnit != null && customerUnit.getDeletedAt() == null) {
           dto.setCustomerUnitId(customerUnit.getId());
           dto.setBrunchId(customerUnit.getBrunchId());
           dto.setBrunchName(customerUnit.getOfficeBranch() != null ? customerUnit.getOfficeBranch().getName() : null);
           dto.setUnitId(customerUnit.getUnitId());
           dto.setUnitName(customerUnit.getUnit() != null ? customerUnit.getUnit().getName() : null);
           dto.setRoomNo(customerUnit.getRoomNo());
           dto.setStatus(customerUnit.getStatus());
           dto.setMoveInAt(customerUnit.getMoveInAt());
           dto.setLeavingAt(customerUnit.getLeavingAt());
       } else {
           dto.setBrunchId(null);
           dto.setBrunchName(null);
           dto.setUnitId(null);
           dto.setUnitName(null);
           dto.setRoomNo(null);
           dto.setStatus(null);
           dto.setMoveInAt(null);
           dto.setLeavingAt(null);
       }
        // dto.setBrunchId(null);
        // dto.setBrunchName(null);
        // dto.setUnitId(null);
        // dto.setUnitName(null);
        // dto.setRoomNo(null);
        // dto.setStatus(null);
        // dto.setMoveInAt(null);
        // dto.setLeavingAt(null);

        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setNameGana(entity.getNameGana());
        dto.setCategory(entity.getCategory());
        dto.setPersonal(entity.getPersonal());
        return dto;
    }

    private CustomerMedicalDto convert2MedicalDto(CustomerMedicalEntity entity) {
        if (entity.getDeletedAt() != null) return null;
        CustomerMedicalDto dto = new CustomerMedicalDto();
        dto.setId(entity.getId());
        dto.setCustomerId(entity.getCustomerId());
        dto.setInsuranceTypeId(entity.getInsuranceTypeId());
        dto.setNumber(entity.getNumber());
        dto.setUpdatedAt(entity.getUpdatedAt());
        dto.setDetails(
                entity.getDetails() != null
                        ? entity.getDetails().stream()
                        .map(this::convert2MedicalDetailDto)
                        .filter(Objects::nonNull)
                        .collect(Collectors.toList())
                        : null);

        return dto;
    }

    private CustomerMedicalDetailDto convert2MedicalDetailDto(CustomerMedicalDetailEntity entity) {
        if (entity.getDeletedAt() != null) return null;
        CustomerMedicalDetailDto dto = new CustomerMedicalDetailDto();
        dto.setId(entity.getId());
        dto.setMedicalId(entity.getMedicalId());
        dto.setSub(entity.getSub());
        dto.setServiceName(entity.getServiceName());
        dto.setInstitution(entity.getInstitution());
        dto.setStatus(entity.getStatus());
        dto.setPace(entity.getPace());
        dto.setUpdatedAt(entity.getUpdatedAt());
        return dto;
    }

    private CustomerCareDto convert2CareDto(CustomerCareEntity entity) {
        if (entity.getDeletedAt() != null) return null;
        CustomerCareDto dto = new CustomerCareDto();
        dto.setId(entity.getId());
        dto.setCustomerId(entity.getCustomerId());
        dto.setCareNo(entity.getCareNo());
        dto.setCareTypeId(entity.getCareTypeId());
        dto.setLimit(entity.getLimit());
        dto.setDetails(
                entity.getDetails() != null
                        ? entity.getDetails().stream()
                        .map(this::convert2CareDetailDto)
                        .filter(Objects::nonNull)
                        .collect(Collectors.toList())
                        : null);
        dto.setUpdatedAt(entity.getUpdatedAt());
        return dto;
    }

    private CustomerCareDetailDto convert2CareDetailDto(CustomerCareDetailEntity entity) {
        if (entity.getDeletedAt() != null) return null;
        CustomerCareDetailDto dto = new CustomerCareDetailDto();
        dto.setId(entity.getId());
        dto.setCareId(entity.getCareId());
        dto.setSub(entity.getSub());
        dto.setServiceName(entity.getServiceName());
        dto.setUseCompany(entity.getUseCompany());
        dto.setStatus(entity.getStatus());
        dto.setPace(entity.getPace());
        dto.setUpdatedAt(entity.getUpdatedAt());
        return dto;
    }


    /**
     * saveCustomerBilling
     *
     * @param request SaveCustomerBillingRequestDto
     * @return Long
     */
    @Override
    @Transactional
    public Long saveCustomerBilling(SaveCustomerBillingRequestDto request) {
        Long customerId = request.getCustomerId();

        if (customerId == null) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, "customerIdが必要です。");
        }

        // check whether customer info exist or not
        tenantManageRepository.findById(customerId)
                .orElseThrow(
                        () -> new ApiException(
                                ResponseCodeAndMsg.NOT_FOUND,
                                "Customer info with id: " + customerId + " not found"
                        )
                );

        CustomerBillingEntity entity = customerBillingRepository.findByCustomerId(customerId)
                .orElse(new CustomerBillingEntity());

        if ((entity.getUpdatedAt() != null)
            && (!entity.getUpdatedAt().isEqual(request.getUpdatedAt()))) {
            throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
        }

        entity.setCustomerId(customerId);
        entity.setMovein1stAt(request.getMovein1stAt());
        entity.setOriginalRequestAt(request.getOriginalRequestAt());
        entity.setRpInputAt(request.getRpInputAt());
        entity.setTransfer1stAt(request.getTransfer1stAt());
        entity.setRemark(request.getRemark());

        try {
            CustomerBillingEntity savedEntity = customerBillingRepository.save(entity);
            return savedEntity.getId();
        } catch (PessimisticLockException | LockAcquisitionException | TransactionSystemException e) {
            throw e;
        } catch (Exception e) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, e.getMessage());
        }
    }

    /**
     * saveCustomerBillingDetail
     *
     * @param request SaveCustomerBillingDetailRequestDto
     * @return Long
     */
    @Override
    public Long saveCustomerBillingDetail(SaveCustomerBillingDetailRequestDto request) {
        if (customerBillingDetailRepository.existsByBillingIdAndYymm(request.getBillingId(), request.getYyyymm(), request.getId())) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, "重複するBillingIdまたはyyyymmは登録できません。");
        }

        Long id = request.getId();
        CustomerBillingDetailEntity entity = (id == null)
                ? new CustomerBillingDetailEntity()
                : customerBillingDetailRepository.findById4Update(id)
                .orElse(new CustomerBillingDetailEntity());

        if ((entity.getUpdatedAt() != null)
            && (!entity.getUpdatedAt().isEqual(request.getUpdatedAt()))) {
            throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
        }

        entity.setBillingId(request.getBillingId());
        entity.setYyyymm(request.getYyyymm());
        entity.setNationalAt(request.getNationalAt());
        entity.setSelfGoverningAt(request.getSelfGoverningAt());
        entity.setOtherAt(request.getOtherAt());
        entity.setIssueAt(request.getIssueAt());
        entity.setMemo(request.getMemo());

        try {
            CustomerBillingDetailEntity savedEntity = customerBillingDetailRepository.save(entity);
            return savedEntity.getId();

        } catch (PessimisticLockException | LockAcquisitionException | TransactionSystemException e) {
            throw e;
        } catch (Exception e) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, e.getMessage());
        }
    }

    /**
     * getBillingInfo
     *
     * @param id Long
     * @return TenantBillingResponseDto
     */
    @Override
    public TenantBillingResponseDto getBillingInfo(Long id) {
        tenantManageRepository.findById(id)
                .orElseThrow(
                        () -> new ApiException(ResponseCodeAndMsg.NOT_FOUND, "顧客情報のID: " + id + " が見つかりません")
                );

        CustomerBillingEntity customerBilling = customerBillingRepository.findByCustomerId(id)
                .orElseThrow(
                        () -> new ApiException(
                                ResponseCodeAndMsg.NOT_FOUND,
                                "Customer info with id: " + id + " not found"
                        )
                );

        List<CustomerBillingDetailEntity> billingDetails = customerBillingDetailRepository.findByBillingId(customerBilling.getId());

        TenantBillingResponseDto responseDto = new TenantBillingResponseDto();
        responseDto.setId(customerBilling.getId());
        responseDto.setCustomerId(customerBilling.getCustomerId());
        responseDto.setMovein1stAt(customerBilling.getMovein1stAt());
        responseDto.setOriginalRequestAt(customerBilling.getOriginalRequestAt());
        responseDto.setRpInputAt(customerBilling.getRpInputAt());
        responseDto.setTransfer1stAt(customerBilling.getTransfer1stAt());
        responseDto.setRemark(customerBilling.getRemark());
        responseDto.setUpdatedAt(customerBilling.getUpdatedAt());

        List<TenantBillingDetailResponseDto> detailsDto = billingDetails.stream()
                .map(detail -> {
                    TenantBillingDetailResponseDto detailDto = new TenantBillingDetailResponseDto();
                    detailDto.setId(detail.getId());
                    detailDto.setBillingId(detail.getBillingId());
                    detailDto.setYyyymm(detail.getYyyymm());
                    detailDto.setNationalAt(detail.getNationalAt());
                    detailDto.setSelfGoverningAt(detail.getSelfGoverningAt());
                    detailDto.setOtherAt(detail.getOtherAt());
                    detailDto.setIssueAt(detail.getIssueAt());
                    detailDto.setMemo(detail.getMemo());
                    detailDto.setUpdatedAt(detail.getUpdatedAt());
                    return detailDto;
                })
                .collect(Collectors.toList());

        responseDto.setTenantBillingDetails(detailsDto);

        return responseDto;
    }

    /**
     * @param id Long
     * @return Long
     */
    @Override
    @Transactional
    public Long deleteBillingDetail(Long id) {
        CustomerBillingDetailEntity entity = customerBillingDetailRepository
                .findById4Update(id)
                .orElseThrow(
                        () -> new ApiException(ResponseCodeAndMsg.NOT_FOUND, "Billing detail info with id: " + id + " not found"));
        entity.setDeletedAt(LocalDateTime.now());
        try {
            customerBillingDetailRepository.save(entity);
            return id;
        } catch (PessimisticLockException | LockAcquisitionException | TransactionSystemException e) {
            throw e;
        } catch (Exception e) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, e.getMessage());
        }
    }

    /**
     * saveApplicationStatus
     *
     * @param request SaveCustomerApplicationStatusRequestDto
     * @return SaveCustomerApplicationStatusResponseDto
     */
    @Override
    @Transactional
    public SaveCustomerApplicationStatusResponseDto saveApplicationStatus(SaveCustomerApplicationStatusRequestDto request) {
        Long customerId = request.getCustomerId();

        if (customerId == null) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, "customerIdが必要です。");
        }

        // check whether customer info exist or not
        tenantManageRepository.findById(customerId)
                .orElseThrow(
                        () -> new ApiException(
                                ResponseCodeAndMsg.NOT_FOUND,
                                "Customer info with id: " + customerId + " not found"
                        )
                );

        CustomerApplicationStatusEntity entity = customerApplicationStatusRepository.findByCustomerId(customerId)
                .orElse(new CustomerApplicationStatusEntity());

        if ((entity.getUpdatedAt() != null)
            && (!entity.getUpdatedAt().isEqual(request.getUpdatedAt()))) {
            throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
        }

        entity.setCustomerId(customerId);
        entity.setGovernment(request.getGovernment());

        entity.setNationalRentSubsidy(request.getNationalRentSubsidy());
        entity.setMunicipalRentSubsidy(request.getMunicipalRentSubsidy());
        entity.setIndividualMunicipality(request.getIndividualMunicipality());
        entity.setLifeInsurancePension(request.getLifeInsurancePension());
        entity.setPersonalLiability(request.getPersonalLiability());

        try {
            CustomerApplicationStatusEntity savedEntity = customerApplicationStatusRepository.save(entity);
            return new SaveCustomerApplicationStatusResponseDto(savedEntity.getId(), savedEntity.getCustomerId());
        } catch (PessimisticLockException | LockAcquisitionException | TransactionSystemException e) {
            throw e;
        } catch (Exception e) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, e.getMessage());
        }
    }

    /**
     * getApplicationStatusInfo
     *
     * @param id Long
     * @return TenantApplicationStatusResponseDto
     */
    @Override
    public TenantApplicationStatusResponseDto getApplicationStatusInfo(Long id) {
        tenantManageRepository.findById(id)
                .orElseThrow(
                        () -> new ApiException(ResponseCodeAndMsg.NOT_FOUND, "顧客情報のID: " + id + " が見つかりません")
                );

        CustomerApplicationStatusEntity entity = customerApplicationStatusRepository.findByCustomerId(id)
                .orElseThrow(
                        () -> new ApiException(
                                ResponseCodeAndMsg.NOT_FOUND,
                                "Customer info with id: " + id + " not found"
                        )
                );

        TenantApplicationStatusResponseDto tenantApplicationStatus = new TenantApplicationStatusResponseDto();

        tenantApplicationStatus.setId(entity.getId());
        tenantApplicationStatus.setCustomerId(entity.getCustomerId());
        tenantApplicationStatus.setGovernment(entity.getGovernment());

        tenantApplicationStatus.setNationalRentSubsidy(entity.getNationalRentSubsidy());
        tenantApplicationStatus.setMunicipalRentSubsidy(entity.getMunicipalRentSubsidy());
        tenantApplicationStatus.setIndividualMunicipality(entity.getIndividualMunicipality());
        tenantApplicationStatus.setLifeInsurancePension(entity.getLifeInsurancePension());
        tenantApplicationStatus.setPersonalLiability(entity.getPersonalLiability());
        tenantApplicationStatus.setUpdatedAt(entity.getUpdatedAt());
        return tenantApplicationStatus;
    }

    private CustomerHandbookStatusDto convert2HandbookStatusDto(CustomerHandbookStatusEntity entity) {
        if (entity.getDeletedAt() != null) return null;
        CustomerHandbookStatusDto dto = new CustomerHandbookStatusDto();
        dto.setId(entity.getId());
        dto.setCustomerId(entity.getCustomerId());
        dto.setRecipient(entity.getRecipient());
        dto.setDisabled(entity.getDisabled());
        dto.setLimit(entity.getLimit());
        dto.setVisitingPlace(entity.getVisitingPlace());
        dto.setService(entity.getService());
        dto.setHandbookType(entity.getHandbookType());
        dto.setUpdatedAt(entity.getUpdatedAt());
        return dto;
    }

    private List<String> getAgeMonths(Integer minAge, Integer maxAge) {
        if (minAge == null || maxAge == null || minAge < 0 || maxAge < 0 || minAge > maxAge) {
            return null; 
        }

        List<String> months = new ArrayList<>();
        LocalDate currentDate = LocalDate.now();

        LocalDate startDate = currentDate.minusYears(maxAge + 1).plusMonths(1);
        LocalDate endDate = currentDate.minusYears(minAge);

        while (startDate.isBefore(endDate)) {
            months.add(YearMonth.from(startDate).toString());
            startDate = startDate.plusMonths(1);
        }

        return months;
    }

    private CustomerDocumentStatusDto convert2DocumentStatusDto(CustomerDocumentStatusEntity entity) {
        if (entity.getDeletedAt() != null) return null;
        CustomerDocumentStatusDto dto = new CustomerDocumentStatusDto();
        dto.setId(entity.getId());
        dto.setCustomerId(entity.getCustomerId());
        dto.setTour(entity.getTour());
        dto.setAssessment(entity.getAssessment());
        dto.setTrial(entity.getTrial());
        dto.setTrialImportantExperience(entity.getTrialImportantExperience());
        dto.setUsageContract(entity.getUsageContract());
        dto.setImportantExperience(entity.getImportantExperience());
        dto.setPlan(entity.getPlan());
        dto.setMonitoring(entity.getMonitoring());
        dto.setUpdatedAt(entity.getUpdatedAt());
        return dto;
    }

    private CustomerMoveinDocumentStatusDto convert2MoveinDocumentStatusDto(CustomerMoveinDocumentStatusEntity entity) {
        if (entity.getDeletedAt() != null) return null;
        CustomerMoveinDocumentStatusDto dto = new CustomerMoveinDocumentStatusDto();
        dto.setId(entity.getId());
        dto.setCustomerId(entity.getCustomerId());
        dto.setBasic(entity.getBasic());
        dto.setPlan1st(entity.getPlan1st());
        dto.setMemo(entity.getMemo());
        dto.setUpdatedAt(entity.getUpdatedAt());
        return dto;
    }
}


