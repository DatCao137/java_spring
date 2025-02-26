package grouphome.webapp.controller.api;

import grouphome.webapp.controller.BaseController;
import grouphome.webapp.dto.requests.customer.supportPlan.*;
import grouphome.webapp.dto.responses.customer.supportPlan.*;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.ArrayList;
import org.springframework.http.ResponseEntity;
import grouphome.webapp.dto.responses.blc_common.BaseResponse;

@RestController
public class SupportPlanController extends BaseController {

    @Autowired
    public SupportPlanController() {
    }

    @PostMapping("/support-plan/list")
    public ResponseEntity<BaseResponse<List<ListResponseDto>>> list(@RequestBody SupportPlanRequestDto para) {
        ArrayList<ListResponseDto> ret = new ArrayList<ListResponseDto>();
        ListResponseDto dto = new ListResponseDto();

        dto = new ListResponseDto();
        dto.setId(Long.valueOf("1"));
        dto.setName("阿部達也");
        dto.setCreateDate("2024/08/02");
        dto.setPlanStartDate("2024/9/01");
        dto.setPlanStartEnd("2024/12/31");
        dto.setHomeName("AMANEKU平塚");
        dto.setHeldDate("2024/8/16");
        dto.setCreator("田中");
        dto.setApplyDate("2024/8/23");
        dto.setStatus("同意取得済");
        dto.setAdditionalInfo("あれこれ");
        ret.add(dto);

        dto = new ListResponseDto();
        dto.setId(Long.valueOf("2"));
        dto.setName("金森明美");
        dto.setCreateDate("2024/09/06");
        dto.setPlanStartDate("2024/10/01");
        dto.setPlanStartEnd("2025/03/31");
        dto.setHomeName("AMANEKU平塚中原");
        dto.setHeldDate("2024/9/20");
        dto.setCreator("管");
        dto.setApplyDate("2024/9/27");
        dto.setStatus("作成済");
        dto.setAdditionalInfo("");
        ret.add(dto);

        dto = new ListResponseDto();
        dto.setId(Long.valueOf("3"));
        dto.setName("武田浩一");
        dto.setCreateDate("");
        dto.setPlanStartDate("");
        dto.setPlanStartEnd("");
        dto.setHomeName("AMANEKU平塚徳延");
        dto.setHeldDate("");
        dto.setCreator("");
        dto.setApplyDate("");
        dto.setStatus("未作成");
        dto.setAdditionalInfo("");
        ret.add(dto);

        dto = new ListResponseDto();
        dto.setId(Long.valueOf("4"));
        dto.setName("岸谷和子");
        dto.setCreateDate("");
        dto.setPlanStartDate("");
        dto.setPlanStartEnd("");
        dto.setHomeName("AMANEKU平塚徳延");
        dto.setHeldDate("");
        dto.setCreator("");
        dto.setApplyDate("");
        dto.setStatus("未作成");
        dto.setAdditionalInfo("");
        ret.add(dto);

        return returnSuccess(new BaseResponse<>(ret));
    }
}
