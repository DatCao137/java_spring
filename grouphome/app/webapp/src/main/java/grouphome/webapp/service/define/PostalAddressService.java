package grouphome.webapp.service.define;

import grouphome.webapp.dto.responses.blc_common.PostalAddressResponseDto;

import java.util.List;
import java.util.Optional;

public interface PostalAddressService {

    Optional<PostalAddressResponseDto> getPostalAddressById(Long id);

    List<PostalAddressResponseDto> getPostalAddressesByPostNoStart(String postNoStart);

    List<PostalAddressResponseDto> getPostalAddressesByPostNo(String postNo);

    List<PostalAddressResponseDto> getPostalAddressesByPostNoAndPref(String postNo, String pref);

    List<PostalAddressResponseDto> getPostalAddressesByPostNoPrefAndCity(String postNo, String pref, String city);

    List<PostalAddressResponseDto> getPostalAddressesByPref(String pref);

    List<PostalAddressResponseDto> getPostalAddressesByPostNoPrefCityAndTown(String postNo, String pref, String city, String town);
}

