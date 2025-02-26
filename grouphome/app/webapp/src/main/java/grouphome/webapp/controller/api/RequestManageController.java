package grouphome.webapp.controller.api;

import grouphome.webapp.controller.BaseController;
import grouphome.webapp.dto.requests.customer.RequestListRequestDto;
import grouphome.webapp.dto.requests.customer.SaveRequestRequestDto;
import grouphome.webapp.dto.requests.customer.GoMoveinRequestDto;
import grouphome.webapp.dto.responses.blc_common.BaseResponse;
import grouphome.webapp.dto.responses.blc_common.PagerResponse;
import grouphome.webapp.dto.responses.customer.request.*;
import grouphome.webapp.service.define.RequestService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RequestManageController extends BaseController {
    @Autowired
    private RequestService requestService;

    @PostMapping("/request")
	public ResponseEntity<BaseResponse<List<ListResponseDto>>> list(@RequestBody RequestListRequestDto req) {
        PagerResponse<List<ListResponseDto>> requestList = requestService.getRequestList(req);
        return returnSuccess(requestList);
    }

    @GetMapping("/request/detail/{id}")
    public ResponseEntity<BaseResponse<DetailResponseDto>> detail(@PathVariable(name = "id", required = true) Integer id) {
        DetailResponseDto detailResponseDto = requestService.getRequestDetail(id);
        return returnSuccess(new BaseResponse<>(detailResponseDto));
    }

    @PostMapping("/request/save")
    public ResponseEntity<BaseResponse<SaveResponseDto>> save(@Valid  @RequestBody SaveRequestRequestDto request) {
        SaveResponseDto responseDto = requestService.save(request);
        return returnSuccess(new BaseResponse<>(responseDto));
    }

    @DeleteMapping("/request/delete/{id}")
    public ResponseEntity<BaseResponse<String>> delete(@PathVariable(name = "id", required = true) Long id) {
        return returnSuccess(new BaseResponse<>("Delete request info with ID: " + requestService.delete(id) + " successfully!"));
    }

    @PostMapping("/request/gomovein")
    public ResponseEntity<BaseResponse<GoMoveinResponseDto>> goMovein(@RequestBody GoMoveinRequestDto request) {
        GoMoveinResponseDto res = requestService.goMovein(request);
        return returnSuccess(new BaseResponse<>(res));
    }
}
