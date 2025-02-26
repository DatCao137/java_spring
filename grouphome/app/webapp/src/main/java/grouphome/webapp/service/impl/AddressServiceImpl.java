package grouphome.webapp.service.impl;

import grouphome.webapp.dto.requests.blc_common.AddressDto;
import grouphome.webapp.entity.BlcAddrEntity;
import grouphome.webapp.exception.ApiException;
import grouphome.webapp.repository.define.blc_common.AddressRepository;
import grouphome.webapp.service.define.AddressService;
import grouphome.webapp.utils.ResponseCodeAndMsg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AddressServiceImpl implements AddressService {
    @Autowired
    protected AddressRepository addressRepository;

    /**
     * Soft delete an address
     * 
     * @param id Long
     * @return Long
     */
    @Override
    @Transactional
    public Long deleteAddress(Long id) {
        Optional<BlcAddrEntity> optionalAddress = addressRepository.findById(id);
        if (optionalAddress.isPresent()) {
            BlcAddrEntity address = optionalAddress.get();

            address.setDeletedAt(LocalDateTime.now());
            try {
                addressRepository.save(address);
                return id;
            } catch (OptimisticLockingFailureException e) {
                throw new OptimisticLockingFailureException(e.getMessage());
            }
        } else {
            throw new ApiException(ResponseCodeAndMsg.BAD_REQUEST, "Address with id " + id + " not found");
        }
    }

    @Transactional
    public Long saveBlcAddrEntity(AddressDto dto) {
        Long id = dto.getAddrId();
        /* TODO : idが指定されて無いのは論理削除のため、新規インスタンス作成は暫定 */
        BlcAddrEntity entity = (id == null)
                ? new BlcAddrEntity()
                : this.addressRepository.findById4Update(id).orElseGet(BlcAddrEntity::new);

        if((entity.getUpdatedAt() != null)
        && (!entity.getUpdatedAt().isEqual(dto.getUpdatedAtAddr()))) {
            throw new ApiException(ResponseCodeAndMsg.CONFLICT, "他のユーザに更新されています。");
        }
        entity.setPostNo(dto.getPostNo());
        entity.setPrefId(dto.getPrefId());
        entity.setCity(dto.getCity());
        entity.setTown(dto.getTown());
        entity.setTel(dto.getTel());
        entity.setFax(dto.getFax());
        entity.setUpdatedAt(dto.getUpdatedAtAddr());
        BlcAddrEntity ret = this.addressRepository.save(entity);
        return ret.getId();
    }
}
