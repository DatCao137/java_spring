package grouphome.webapp.controller.api;

import grouphome.webapp.dto.requests.blc_common.SelectListRequestDto;
import grouphome.webapp.dto.responses.blc_common.SelectListResponseDto;
import grouphome.webapp.service.define.SelectListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class SelectListController {
    private SelectListService selectListService;
    @Autowired
    public SelectListController(SelectListService selectListService) {
        this.selectListService = selectListService;
    }

    @PostMapping("/select/list")
    @ResponseBody
	public Map<String, List<SelectListResponseDto>> list(@RequestBody SelectListRequestDto para) {
        return this.selectListService.find(para);
	}
}
