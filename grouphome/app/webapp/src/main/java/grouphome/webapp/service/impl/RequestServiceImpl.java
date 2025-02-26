package grouphome.webapp.service.impl;

import grouphome.webapp.dto.requests.customer.RequestListRequestDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import grouphome.webapp.dto.requests.customer.tenant.SaveCustomerRequestDto;
import grouphome.webapp.dto.requests.customer.SaveRequestRequestDto;
import grouphome.webapp.dto.requests.customer.GoMoveinRequestDto;
import grouphome.webapp.dto.responses.blc_common.PagerResponse;
import grouphome.webapp.dto.responses.customer.request.*;
import grouphome.webapp.entity.CustomerRequestItemEntity;
import grouphome.webapp.entity.CustomerRequestEntity;
import grouphome.webapp.exception.ApiException;
import grouphome.webapp.repository.define.customer.RequestRepositoryCustom;
import grouphome.webapp.repository.define.customer.RequestInfoRepository;
import grouphome.webapp.repository.define.office.HomeRepository;
import grouphome.webapp.repository.define.customer.RequestInfoDetailRepository;
import grouphome.webapp.service.define.RequestService;
import grouphome.webapp.utils.Exchanger;
import grouphome.webapp.utils.ResponseCodeAndMsg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Transactional
public class RequestServiceImpl implements RequestService {
    @Autowired
    private RequestRepositoryCustom requestRepositoryCustom;
    @Autowired
    private RequestInfoRepository requestInfoRepository;
    @Autowired
    private RequestInfoDetailRepository requestInfoDetailRepository;
    @Autowired
    private HomeRepository homeRepository;
    @Autowired
    private TenantManageServiceImpl tenantSerivce;

    @Autowired
    public RequestServiceImpl(
            RequestRepositoryCustom requestRepositoryCustom,
            RequestInfoDetailRepository requestInfoDetailRepository,
            RequestInfoRepository requestInfoRepository,
            TenantManageServiceImpl tenantService

    ) {
        this.requestRepositoryCustom = requestRepositoryCustom;
        this.requestInfoDetailRepository = requestInfoDetailRepository;
        this.requestInfoRepository = requestInfoRepository;
        this.tenantSerivce = tenantService;
    }

    @Override
    public PagerResponse<List<ListResponseDto>> getRequestList(RequestListRequestDto request) {
        Pageable pageable = PageRequest.of(request.getPageNumber() - 1, request.getPageSize());

        Page<ListResponseDto> pageResult = requestRepositoryCustom.findAll(request, pageable);

        PagerResponse<List<ListResponseDto>> response = new PagerResponse<>();
        response.setData(pageResult.getContent());
        response.setTotalRecord((int) pageResult.getTotalElements());
        response.setTotalPage(pageResult.getTotalPages());
        return response;
    }

    /**
     * getRequestDetail
     *
     * @param id Integer
     * @return DetailResponseDto
     */
    @Override
    public DetailResponseDto getRequestDetail(Integer id) {
        if (id == null) {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, "ID is required");
        }
        if (!this.requestInfoDetailRepository.existsById(Long.valueOf(id))) {
            throw new ApiException(ResponseCodeAndMsg.NOT_FOUND, "Customer request item ID: " + id + " does not exist or is deleted");
        }
        return (DetailResponseDto) this.requestInfoDetailRepository.getCustomerRequestItem(Long.valueOf(id));
    }

    /**
     * Save Request info
     *
     * @param request SaveRequestRequestDto
     * @return SaveResponseDto
     */
    @Override
    @Transactional
    public SaveResponseDto save(SaveRequestRequestDto request) {
        // Check if homeInfoId exists and is not deleted
        if (request.getHomeId() != null && !homeRepository.existsById(request.getHomeId())) {
            throw new ApiException(ResponseCodeAndMsg.NOT_FOUND,
                    "Home Info with ID: " + request.getHomeId() + " does not exist or is deleted");
        }
        Long requestInfoId = saveCustomerRequestEntity(request);
        request.setRequestInfoId(requestInfoId);
        Long requestInfoDetailId = saveCustomerRequestItemEntity(request);

        return new SaveResponseDto(requestInfoId, requestInfoDetailId);
    }

    /**
     * Delete request info
     *
     * @param id Long
     * @return Long
     */
    @Override
    @Transactional
    public Long delete(Long id) {
        CustomerRequestEntity requestInfo = requestInfoRepository.findById(id)
                .orElseThrow(() -> new ApiException(
                        ResponseCodeAndMsg.NOT_FOUND,
                        "Request info with ID: " + id + " not found or was deleted"));
        requestInfo.setDeletedAt(LocalDateTime.now());
        requestInfoRepository.save(requestInfo);

        Long detailId = requestInfo.getRequestInfoDetail().getId();
        CustomerRequestItemEntity requestInfoDetail = requestInfoDetailRepository.findById(detailId)
                .orElseThrow(() -> new ApiException(
                        ResponseCodeAndMsg.NOT_FOUND,
                        "Request info detail with ID: " + detailId + " not found or was deleted"));
        requestInfoDetail.setDeletedAt(LocalDateTime.now());
        requestInfoDetailRepository.save(requestInfoDetail);

        return requestInfo.getId();
    }

    private Long saveCustomerRequestEntity(SaveRequestRequestDto request) {
        Long id = request.getRequestInfoId();

        CustomerRequestEntity entity = (id == null)
                ? new CustomerRequestEntity()
                : requestInfoRepository.findById4Update(id).orElseGet(CustomerRequestEntity::new);

        if((entity.getUpdatedAt() != null)
        && (!entity.getUpdatedAt().isEqual(request.getInfoUpdatedAt()))) {
            throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
        }

        entity.setName(request.getName());
        entity.setRequestDate(request.getRequestDate());
        entity.setRequestType(request.getRequestType() == null ? null : request.getRequestType().toString());
        entity.setRequestItem(request.getRequestItem() == null ? null : request.getRequestItem().toString());
        entity.setHomeId(request.getHomeId());
        entity.setDesiredDate(request.getDesiredDate());
        entity.setRepresentativeInfo(request.getRepresentativeInfo());
        entity.setRemark(request.getRemark());

        CustomerRequestEntity res = requestInfoRepository.save(entity);
        return res.getId();
    }

    private Long saveCustomerRequestItemEntity(SaveRequestRequestDto request) {
        Long id = request.getRequestInfoDetailId();

        CustomerRequestItemEntity entity = (id == null)
                ? new CustomerRequestItemEntity()
                : requestInfoDetailRepository.findById4Update(id).orElseGet(CustomerRequestItemEntity::new);

        if((entity.getUpdatedAt() != null)
        && (!entity.getUpdatedAt().isEqual(request.getDetailUpdatedAt()))) {
            throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
        }

        entity.setRequestInfoId(request.getRequestInfoId());
        entity.setContents(request.getContents());

        CustomerRequestItemEntity res = requestInfoDetailRepository.save(entity);
        return res.getId();
    }

    @Override
    @Transactional
    public GoMoveinResponseDto goMovein(GoMoveinRequestDto request) {
        GoMoveinResponseDto ret = new GoMoveinResponseDto();
        Long id = request.getId();

        try {
            CustomerRequestEntity base = requestInfoRepository.findById4Update(id).orElseThrow();
            if(!base.getUpdatedAt().isEqual(request.getUpdatedAt())) {
                throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
            }
            CustomerRequestItemEntity detail = requestInfoDetailRepository.findById(base.getId()).orElseThrow();
            SaveRequestRequestDto.Contents contents = detail.getContents();

            SaveCustomerRequestDto.Personal personal = new SaveCustomerRequestDto.Personal();
            personal.setBirthDay(contents.getBirth().getDate());
            personal.setSex(contents.getSex());
            SaveCustomerRequestDto.Details details = new SaveCustomerRequestDto.Details();
            details.setDisabilityType(contents.getDisabilityName());

            SaveCustomerRequestDto dto = new SaveCustomerRequestDto();
            dto.setName(contents.getName());
            dto.setNameGana(contents.getGana());
            dto.setPersonal(personal);
            dto.setDetails(details);
//            dto.setCategory(contents.getDisabilityClass());

            Long tenantId = this.tenantSerivce.saveTenant(dto);
            base.setCustomerId(tenantId);
            this.requestInfoRepository.save(base);
            ret.setResult(0);
        } catch(NoSuchElementException ex) {
            ret.setResult(-1);
        }
        return ret;
    }

}
