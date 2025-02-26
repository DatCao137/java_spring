package grouphome.webapp.dto.responses.blc_common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostalAddressResponseDto {

    private Long id;
    private String postNo;
    private String pref;
    private String city;
    private String town;
}
