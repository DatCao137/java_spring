package grouphome.webapp.service.impl;

import grouphome.webapp.repository.define.customer.*;
import grouphome.webapp.dto.requests.customer.inquiry.*;
import grouphome.webapp.dto.responses.customer.inquiry.*;
import grouphome.webapp.dto.requests.customer.inquiry.hearing.*;
import grouphome.webapp.dto.responses.customer.inquiry.hearing.*;
import grouphome.webapp.service.define.InquiryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import grouphome.webapp.dto.responses.blc_common.PagerResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import grouphome.webapp.entity.*;
import org.springframework.transaction.annotation.Transactional;
import grouphome.webapp.exception.ApiException;
import grouphome.webapp.utils.ResponseCodeAndMsg;
import org.springframework.transaction.TransactionSystemException;
import jakarta.persistence.PessimisticLockException;
import org.hibernate.exception.LockAcquisitionException;
import java.time.LocalDateTime;
import java.util.stream.Collectors;

@Service
public class InquiryServiceImpl implements InquiryService {
    private final InquiryRepository inquiryRepository;
    private final InquiryItemRepository inquiryItemRepository;
    private final CustomerSalesFollowRepositoryCustom customerSalesFollowRepositoryCustom;
    private final CustomerSalesRepositoryCustom customerSalesRepositoryCustom;
    private final InquiryProfileRepository inquiryProfileRepository;
    private final CustomerHearingRepository customerHearingRepository;
    private final CustomerHearingDetailRepository customerHearingDetailRepository;

    @Autowired
    public InquiryServiceImpl(  
        InquiryRepository inquiryRepository, 
        InquiryItemRepository inquiryItemRepository,
        CustomerSalesFollowRepositoryCustom customerSalesFollowRepositoryCustom,
        CustomerSalesRepositoryCustom customerSalesRepositoryCustom,
        CustomerHearingRepository customerHearingRepository,
        CustomerHearingDetailRepository customerHearingDetailRepository,
        InquiryProfileRepository inquiryProfileRepository
        ) {
        this.inquiryRepository = inquiryRepository;
        this.inquiryItemRepository = inquiryItemRepository;
        this.inquiryProfileRepository = inquiryProfileRepository;
        this.customerHearingRepository = customerHearingRepository;
        this.customerHearingDetailRepository = customerHearingDetailRepository;
        this.customerSalesFollowRepositoryCustom = customerSalesFollowRepositoryCustom;
        this.customerSalesRepositoryCustom = customerSalesRepositoryCustom;
    }

    public List<Object[]> findAll() {
        List<Object[]> lst = new ArrayList<Object[]>();
        return lst;
    }

    /**
     * Get inquiry info list
     * 
     * @param request GeneralRequestDto
     * @return PagerResponse<List<ListResponseDto>>
     */
    @Override
    public PagerResponse<List<ListResponseDto>> getInquiryList(GeneralRequestDto request) {
        Pageable pageable = PageRequest.of(request.getPageNumber() - 1, request.getPageSize());

        Page<ListResponseDto> pageResult = inquiryRepository.getInquiryList(request, pageable);

        PagerResponse<List<ListResponseDto>> response = new PagerResponse<>();
        response.setData(pageResult.getContent());
        response.setTotalRecord((int) pageResult.getTotalElements());
        response.setTotalPage(pageResult.getTotalPages());
        return response;
    }

    @Override
    public List<SalesFollowListResponseDto> getSalesFollows(SalesFollowListRequestDto req) {
        List<SalesFollowListResponseDto> results = customerSalesFollowRepositoryCustom.getSalesFollowList(req);
        return results;
    }

    @Override
    public SalesFollowSaveResponseDto saveSalesFollow(SalesFollowSaveRequestDto req) {
        return customerSalesFollowRepositoryCustom.save(req);
    }

    @Override
    public Long deleteSalesFollow(Long id) {
        return customerSalesFollowRepositoryCustom.delete(id);
    }

    @Override
    public CustomerSalesInfoResponseDto getCustomerSalesInfo(CustomerSalesInfoRequestDto req) {
        CustomerSalesInfoResponseDto info = customerSalesRepositoryCustom.getCustomerSalesInfo(req);
        return info;
    }

    @Override
    public CustomerSalesSaveResponseDto saveCustomerSales(CustomerSalesSaveRequestDto req) {
        return customerSalesRepositoryCustom.save(req);
    }

    @Override
    public Long deleteCustomerSales(Long id) {
        return customerSalesRepositoryCustom.delete(id);
    }

    /**
     * saveInquiry
     *
     * @param request InquirySaveRequestDto
     * @return Long
     */
    @Override
    @Transactional
    public Long saveInquiry(InquirySaveRequestDto request) {
        Long id = request.getId();
        CustomerInquiryEntity  customerInquiry = (id == null) ? new CustomerInquiryEntity()
                : inquiryRepository.findById4Update(id)
                .orElse(new CustomerInquiryEntity());

        if (( customerInquiry.getUpdatedAt() != null)
            && (request.getUpdatedAt() == null || ! customerInquiry.getUpdatedAt().isEqual(request.getUpdatedAt()))) {
            throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
        }

        try {
            // save inquiry info
             customerInquiry.setName(request.getName());
             customerInquiry.setGana(request.getGana());
             customerInquiry.setSex(request.getSex());
             customerInquiry.setAge(request.getAge());
             customerInquiry.setStatus(request.getStatus());
             customerInquiry.setNextAction(request.getNextAction());
             customerInquiry.setInquirySrc(request.getInquirySrc());
             customerInquiry = inquiryRepository.save( customerInquiry);

            return  customerInquiry.getId();
        } catch (PessimisticLockException | LockAcquisitionException | TransactionSystemException e) {
            throw e;
        } catch (Exception e) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, e.getMessage());
        }
    }

    /**
     * Delete inquiry
     *
     * @param id Long
     * @return Long
     */
    @Override
    @Transactional
    public Long deleteInquiry(Long id) {
        CustomerInquiryEntity customerInquiry = inquiryRepository.findById(id)
                .orElseThrow(() -> new ApiException(
                        ResponseCodeAndMsg.NOT_FOUND,
                        "Inquiry with ID: " + id + " not found or was deleted"));
        customerInquiry.setDeletedAt(LocalDateTime.now());
        inquiryRepository.save(customerInquiry);

        return customerInquiry.getId();
    }

    /**
     * saveDetail
     *
     * @param request InquiryDetailSaveRequestDto
     * @return Long
     */
    @Override
    @Transactional
    public Long saveDetail(InquiryDetailSaveRequestDto request) {
        Long inquiryInfoId = request.getInquiryInfoId();
        Long id = request.getId();
        if (inquiryInfoId == null) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, "inquiryInfoIdが必要です。");
        }

        inquiryRepository.findById(inquiryInfoId)
                .orElseThrow(
                        () -> new ApiException(
                                ResponseCodeAndMsg.NOT_FOUND,
                                "Inquiry info with id: " + inquiryInfoId + " not found"
                        )
                );
        CustomerInquiryItemEntity  entity = (id == null) ? new CustomerInquiryItemEntity()
                : inquiryItemRepository.findById4Update(id)
                .orElse(new CustomerInquiryItemEntity());
        if ((entity.getUpdatedAt() != null)
            && (!entity.getUpdatedAt().isEqual(request.getUpdatedAt()))) {
            throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
        }
        entity.setInquiryInfoId(inquiryInfoId);
        entity.setStatus(request.getStatus());
        entity.setHomeId(request.getHomeId());
        entity.setGhData(request.getGhData());
        entity.setDate(request.getDate());
        entity.setBreakdown(request.getBreakdown());
        entity.setRecord(request.getRecord());
        try {
            CustomerInquiryItemEntity savedEntity = inquiryItemRepository.save(entity);
            return savedEntity.getId();
        } catch (PessimisticLockException | LockAcquisitionException | TransactionSystemException e) {
            throw e;
        } catch (Exception e) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, e.getMessage());
        }
    }

    /**
     * Get inquiry details
     * 
     * @param request InquiryDetailRequestDto
     * @return PagerResponse<List<InquiryDetailResponseDto>>
     */
    @Override
    @Transactional
    public PagerResponse<List<InquiryDetailResponseDto>> getDetails(InquiryDetailRequestDto request) {

        // inquiryRepository.findById(request.getFilter().getId())
        // .orElseThrow(
        //         () -> new ApiException(
        //                 ResponseCodeAndMsg.NOT_FOUND,
        //                 "Inquiry info with id: " + request.getFilter().getId() + " not found"
        //         )
        // );

        Pageable pageable = PageRequest.of(request.getPageNumber() - 1, request.getPageSize());

        Page<InquiryDetailResponseDto> pageResult = inquiryRepository.getDetails(request, pageable);

        PagerResponse<List<InquiryDetailResponseDto>> response = new PagerResponse<>();
        response.setData(pageResult.getContent());
        response.setTotalRecord((int) pageResult.getTotalElements());
        response.setTotalPage(pageResult.getTotalPages());
        return response;
    }

    /**
     * Get Profile Info
     * 
     * @param request InquiryRequestDto
     * @return Object
    */
    @Override
    public ProfileInfoResponseDto getInfoProfile(InquiryRequestDto request) {

        ProfileInfoResponseDto dto = inquiryRepository.getInfoProfile(request);

        return dto;
    }

    /**
     * save
     * 
     * @param request InquiryProfileSaveRequestDto
     * @return SaveProfileInfoResponseDto
    */
    @Override
    @Transactional
    public SaveProfileInfoResponseDto saveProfileInfo(InquiryProfileSaveRequestDto request) {
        
        Long profileId = request.getId();
        Long inquiryInfoId = request.getInquiryInfoId();

        if (inquiryInfoId == null) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, "inquiryInfoIdが必要です。");
        }

        // update age on table t_customer_inquiry
        LocalDateTime updateddAt = LocalDateTime.now();
        inquiryRepository.updateInquiryAge(inquiryInfoId, request.getAge(), updateddAt);

        //insert/update table t_customer_inquiry_profile
        inquiryRepository.findById(inquiryInfoId)
            .orElseThrow(
                () -> new ApiException(
                        ResponseCodeAndMsg.NOT_FOUND,
                        "Inquiry info with id: " + inquiryInfoId + " not found"
                )
            );
        
        CustomerInquiryProfileEntity entity = inquiryProfileRepository.findByInquiryInfoId(inquiryInfoId)
                .orElse(new CustomerInquiryProfileEntity());

        // if ((entity.getUpdatedAt() != null)
        //     && (!entity.getUpdatedAt().isEqual(request.getUpdatedAt()))) {
        //     throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
        // }

        entity.setInquiryInfoId(inquiryInfoId);
        entity.setIntroducer(request.getIntroducer());
        entity.setDisabled(request.getDisabled());
        entity.setPocketBook(request.getPocketBook());
        entity.setService(request.getService());
        entity.setResidence(request.getResidence());
        try {
            CustomerInquiryProfileEntity savedEntity = inquiryProfileRepository.save(entity);
            profileId = savedEntity.getId();

            return new SaveProfileInfoResponseDto(profileId, inquiryInfoId);
        } catch (PessimisticLockException | LockAcquisitionException | TransactionSystemException e) {
            throw e;
        } catch (Exception e) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, e.getMessage());
        }

    }

    /**
     * saveCustomerHearing
     *
     * @param request SaveCustomerHearingRequestDto
     * @return Long
     */
    @Override
    @Transactional
    public Long saveCustomerHearing(SaveCustomerHearingRequestDto request) {
        Long inquiryInfoId = request.getInquiryInfoId();

        if (inquiryInfoId == null) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, "inquiryInfoIdが必要です。");
        }
        inquiryRepository.findById(inquiryInfoId)
                .orElseThrow(
                        () -> new ApiException(
                                ResponseCodeAndMsg.NOT_FOUND,
                                "Customer info with id: " + inquiryInfoId + " not found"
                        )
                );

        CustomerHearingEntity entity = customerHearingRepository.findByInquiryInfoId(inquiryInfoId)
                .orElse(new CustomerHearingEntity());

        if ((entity.getUpdatedAt() != null)
            && (!entity.getUpdatedAt().isEqual(request.getUpdatedAt()))) {
            throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
        }

        entity.setInquiryInfoId(inquiryInfoId);
        entity.setResult(request.getResult());
        entity.setProspect(request.getProspect());
        entity.setRemark(request.getRemark());

        try {
            CustomerHearingEntity savedEntity = customerHearingRepository.save(entity);
            return savedEntity.getId();
        } catch (PessimisticLockException | LockAcquisitionException | TransactionSystemException e) {
            throw e;
        } catch (Exception e) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, e.getMessage());
        }
    }

    /**
     * saveCustomerHearingDetail
     *
     * @param request SaveCustomerHearingDetailRequestDto
     * @return Long
     */
    @Override
    @Transactional
    public Long saveCustomerHearingDetail(SaveCustomerHearingDetailRequestDto request) {
        Long id = request.getId();

        customerHearingRepository.findById(request.getHearingInfoId())
                .orElseThrow(
                        () -> new ApiException(
                                ResponseCodeAndMsg.NOT_FOUND,
                                "Customer hearing with id: " + request.getHearingInfoId() + " not found"
                        )
                );

        if (customerHearingDetailRepository.existsByHearingIdAndStep(request.getHearingInfoId(), request.getStep(), id)) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, "重複するHearingIdまたはStepは登録できません。");
        }

        CustomerHearingDetailEntity entity = (id == null)
                ? new CustomerHearingDetailEntity()
                : customerHearingDetailRepository.findById4Update(id)
                .orElse(new CustomerHearingDetailEntity());

        if ((entity.getUpdatedAt() != null)
            && (!entity.getUpdatedAt().isEqual(request.getUpdatedAt()))) {
            throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
        }

        entity.setHearingInfoId(request.getHearingInfoId());
        entity.setStep(request.getStep());
        entity.setContents(request.getContents());

        try {
            CustomerHearingDetailEntity savedEntity = customerHearingDetailRepository.save(entity);
            return savedEntity.getId();
        } catch (PessimisticLockException | LockAcquisitionException | TransactionSystemException e) {
            throw e;
        } catch (Exception e) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, e.getMessage());
        }
       
    }

    /**
     * getHearingInfo
     *
     * @param id Long
     * @return InquiryHearingResponseDto
     */
    @Override
    @Transactional
    public InquiryHearingResponseDto getHearingInfo(Long id) {
        // CustomerHearingEntity customerHearing = customerHearingRepository.findByInquiryInfoId(id)
        //         .orElseThrow(
        //                 () -> new CustomerHearingEntity
        //         );

        CustomerHearingEntity customerHearing = (id == null) ? new CustomerHearingEntity()
            : customerHearingRepository.findByInquiryInfoId(id)
            .orElse(new CustomerHearingEntity());

        List<CustomerHearingDetailEntity> hearingDetails = customerHearingDetailRepository.findByHearingInfoId(customerHearing.getId());

        InquiryHearingResponseDto responseDto = new InquiryHearingResponseDto();
        responseDto.setId(customerHearing.getId());
        responseDto.setInquiryInfoId(customerHearing.getInquiryInfoId());
        responseDto.setResult(customerHearing.getResult());
        responseDto.setProspect(customerHearing.getProspect());
        responseDto.setRemark(customerHearing.getRemark());
        responseDto.setUpdatedAt(customerHearing.getUpdatedAt());

        List<InquiryHearingDetailResponseDto> detailsDto = hearingDetails.stream()
                .map(detail -> {
                    InquiryHearingDetailResponseDto detailDto = new InquiryHearingDetailResponseDto();
                    detailDto.setId(detail.getId());
                    detailDto.setHearingInfoId(detail.getHearingInfoId());
                    detailDto.setStep(detail.getStep());
                    detailDto.setContents(detail.getContents());
                    detailDto.setUpdatedAt(detail.getUpdatedAt());
                    return detailDto;
                })
                .collect(Collectors.toList());

        responseDto.setInquiryHearingDetails(detailsDto);

        return responseDto;
    }

    /**
     * deleteHearingDetail
     * 
     * @param id Long
     * @return Long
     */
    @Override
    @Transactional
    public Long deleteHearingDetail(Long id) {
        CustomerHearingDetailEntity entity = customerHearingDetailRepository
                .findById4Update(id)
                .orElseThrow(
                        () -> new ApiException(ResponseCodeAndMsg.NOT_FOUND, "Hearing detail info with id: " + id + " not found"));
        entity.setDeletedAt(LocalDateTime.now());
        try {
            customerHearingDetailRepository.save(entity);
            return id;
        } catch (PessimisticLockException | LockAcquisitionException | TransactionSystemException e) {
            throw e;
        } catch (Exception e) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, e.getMessage());
        }
    }

}
