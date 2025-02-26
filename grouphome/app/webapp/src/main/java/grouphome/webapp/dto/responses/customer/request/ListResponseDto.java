package grouphome.webapp.dto.responses.customer.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ListResponseDto {
    private Long id;
    private String name;
    private String requestDate;
    private String requestType;
    private String requestItem;
    private Long customerId;
    private Long homeId;
    private String homeName;
    private String desiredDate;
    private String representative;
    private String remark;
    private Long requestInfoDetailId;
    private String updatedAtRequest;
}
