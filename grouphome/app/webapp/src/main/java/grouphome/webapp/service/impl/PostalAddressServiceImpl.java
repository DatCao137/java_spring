package grouphome.webapp.service.impl;

import grouphome.webapp.dto.responses.blc_common.PostalAddressResponseDto;
import grouphome.webapp.entity.BlcPostalAddressEntity;
import grouphome.webapp.repository.define.blc_common.PostalAddressRepository;
import grouphome.webapp.service.define.PostalAddressService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class PostalAddressServiceImpl implements PostalAddressService {

    private final PostalAddressRepository postalAddressRepository;

    @Autowired
    public PostalAddressServiceImpl(PostalAddressRepository postalAddressRepository) {
        this.postalAddressRepository = postalAddressRepository;
    }

    @Override
    public Optional<PostalAddressResponseDto> getPostalAddressById(Long id) {
        return postalAddressRepository.findById(id)
            .map(this::mapToDto);
    }

    @Override
    public List<PostalAddressResponseDto> getPostalAddressesByPostNoStart(String postNoStart) {
        return postalAddressRepository.findByPostNoStartingWith(postNoStart)
            .stream()
            .map(this::mapToDto)
            .collect(Collectors.toList());
    }

    @Override
    public List<PostalAddressResponseDto> getPostalAddressesByPostNo(String postNo) {
        return postalAddressRepository.findByPostNo(postNo)
            .stream()
            .map(this::mapToDto)
            .collect(Collectors.toList());
    }

    @Override
    public List<PostalAddressResponseDto> getPostalAddressesByPostNoAndPref(String postNo, String pref) {
        return postalAddressRepository.findByPostNoStartingWithAndPref(postNo, pref)
            .stream()
            .map(this::mapToDto)
            .collect(Collectors.toList());
    }

    @Override
    public List<PostalAddressResponseDto> getPostalAddressesByPostNoPrefAndCity(String postNo, String pref, String city) {
        return postalAddressRepository.findByPostNoStartingWithAndPrefAndCity(postNo, pref, city)
            .stream()
            .map(this::mapToDto)
            .collect(Collectors.toList());
    }

    @Override
    public List<PostalAddressResponseDto> getPostalAddressesByPref(String pref) {
        return postalAddressRepository.findByPref(pref)
            .stream()
            .map(this::mapToDto)
            .collect(Collectors.toList());
    }

    @Override
    public List<PostalAddressResponseDto> getPostalAddressesByPostNoPrefCityAndTown(String postNo, String pref, String city, String town) {
        return postalAddressRepository.findByPostNoStartingWithAndPrefAndCityAndTown(postNo, pref, city, town)
            .stream()
            .map(this::mapToDto)
            .collect(Collectors.toList());
    }

    private PostalAddressResponseDto mapToDto(BlcPostalAddressEntity entity) {
        return new PostalAddressResponseDto(
            entity.getId(),
            entity.getPostNo(),
            entity.getPref(),
            entity.getCity(),
            entity.getTown()
        );
    }
}