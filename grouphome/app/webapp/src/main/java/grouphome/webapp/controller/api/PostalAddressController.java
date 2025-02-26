package grouphome.webapp.controller.api;

import grouphome.webapp.controller.BaseController;
import grouphome.webapp.dto.responses.blc_common.BaseResponse;
import grouphome.webapp.dto.responses.blc_common.PostalAddressResponseDto;
import grouphome.webapp.service.define.PostalAddressService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/postal-address")
public class PostalAddressController extends BaseController {

    private final PostalAddressService postalAddressService;

    @Autowired
    public PostalAddressController(PostalAddressService postalAddressService) {
        this.postalAddressService = postalAddressService;
    }

    @Operation(summary = "Search postal addresses", description = "Search postal addresses by various criteria such as ID, postal number, prefecture, city, and town.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Success", content = @Content(mediaType = "application/json")),
        @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content(mediaType = "application/json"))
    })
    @GetMapping("/search")
    public ResponseEntity<BaseResponse<List<PostalAddressResponseDto>>> searchPostalAddresses(
        @RequestParam(required = false) Long id,
        @RequestParam(required = false) String postNo,
        @RequestParam(required = false) String pref,
        @RequestParam(required = false) String city,
        @RequestParam(required = false) String town) {

        List<PostalAddressResponseDto> addresses;

        if (id != null) {
            Optional<PostalAddressResponseDto> address = postalAddressService.getPostalAddressById(id);
            if (address.isPresent()) {
                return returnSuccess(new BaseResponse<>(List.of(address.get())));
            } else {
                return ResponseEntity.notFound().build();
            }
        }

        if (postNo != null && pref != null && city != null && town != null) {
            addresses = postalAddressService.getPostalAddressesByPostNoPrefCityAndTown(postNo, pref, city, town);
        } else if (postNo != null && pref != null && city != null) {
            addresses = postalAddressService.getPostalAddressesByPostNoPrefAndCity(postNo, pref, city);
        } else if (postNo != null && pref != null) {
            addresses = postalAddressService.getPostalAddressesByPostNoAndPref(postNo, pref);
        } else if (postNo != null) {
            addresses = postalAddressService.getPostalAddressesByPostNoStart(postNo);
        } else if (pref != null) {
            addresses = postalAddressService.getPostalAddressesByPref(pref);
        } else {
            return ResponseEntity.badRequest().body(new BaseResponse<>(null));
        }

        return returnSuccess(new BaseResponse<>(addresses));
    }
}