package grouphome.webapp.service.impl;

import grouphome.webapp.dto.requests.blc_common.SelectListRequestDto;
import grouphome.webapp.dto.responses.blc_common.SelectListResponseDto;
import grouphome.webapp.repository.define.blc_common.ItemRepository;
import grouphome.webapp.repository.define.blc_common.CustomItemRepository;
import grouphome.webapp.service.define.SelectListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Service
public class SelectListServiceImpl implements SelectListService {
    private final ItemRepository itemRepository;
    private final CustomItemRepository customItemRepository;

    @Autowired
    public SelectListServiceImpl(ItemRepository itemRepository, CustomItemRepository customItemRepository) {
        this.itemRepository = itemRepository;
        this.customItemRepository = customItemRepository;
    }

    @Override
    public Map<String, List<SelectListResponseDto>> find(SelectListRequestDto request) {
        Map<String, List<SelectListResponseDto>> lst = new HashMap<String, List<SelectListResponseDto>>();

        List<String> types = Arrays.asList(request.getType());
        types.forEach(val -> {
            List<SelectListResponseDto> data = new ArrayList<SelectListResponseDto>();
            List<Object[]> ret;
            if(val.startsWith("cust__")) {
                SelectListRequestDto.Params[] params = request.getParam();
                SelectListRequestDto.Para[] para = null;
                if(params != null) {
                    for(int i = 0; i < params.length; i++) {
                        if(val.equals(params[i].getKey())) {
                            para = params[i].getParams();
                            break;
                        }
                    }
                }
                ret  = this.customItemRepository.find(val, para);
            } else {
                ret = this.itemRepository.find(val);
            }
            SelectListResponseDto dto = new SelectListResponseDto();
            dto.setValue(null);
            dto.setName("");
            data.add(dto);
            for (Object item : ret) {
                dto = new SelectListResponseDto();
                if (item.getClass().isArray()) {
                    Object[] wk = (Object[]) item;
                    dto.setValue(wk[0] != null ? wk[0].toString().trim() : "");
                    dto.setName(wk[1] != null ? wk[1].toString().trim() : "");
                } else {
                    dto.setName(item.toString());
                }
                data.add(dto);
            }
            ;
            lst.put(val, data);
        });
        return lst;
    }
}
