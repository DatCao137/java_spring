package grouphome.webapp.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestOperations;

import grouphome.webapp.dto.requests.blc_common.SelectListRequestDto;
import grouphome.webapp.dto.responses.blc_common.SelectListResponseDto;
import grouphome.webapp.dto.responses.office.staff.smart_hr.AddressResponse;
import grouphome.webapp.dto.responses.office.staff.smart_hr.CrewResponse;
import grouphome.webapp.dto.responses.office.staff.smart_hr.CrewCustomField;
import grouphome.webapp.dto.responses.office.staff.smart_hr.CrewCustomFieldTemplate;
import grouphome.webapp.dto.responses.office.staff.smart_hr.CrewCustomFieldElements;
import grouphome.webapp.dto.responses.office.staff.smart_hr.DepartmentsResponse;
import grouphome.webapp.dto.responses.office.staff.smart_hr.MaternityChildcareLeaveResponse;
import grouphome.webapp.dto.responses.office.staff.smart_hr.PaymentPeriodResponse;
import grouphome.webapp.dto.responses.office.staff.smart_hr.PositionsResponse;
import grouphome.webapp.entity.OfficeStaffEntity;
import grouphome.webapp.repository.define.office.StaffRepository;
import grouphome.webapp.service.define.SelectListService;
import grouphome.webapp.service.define.SmartHRService;

@Service
@RestController
public class SmartHRServiceImpl implements SmartHRService {
    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private SelectListService selectListService;

    private final String ConnectServer = "https://2d9a323eee395c3e0678dcf7.daruma.space/";
    private final String AccessToken = "shr_8f0e_5gKE39Gm1ehd1RhgUcjrbyVLpP4LWHXG";
    private final String PathCrews = "/api/v1/crews?per_page=50";
    private final String PathMaternity = "/api/v1/crews/%s/maternity_childcare_leaves";
    private final RestOperations restOperations;
    private Map<String, Integer> enrollmentStat;
    private Map<String, Integer> paymentForm;

    public SmartHRServiceImpl(RestTemplateBuilder restTemplateBuilder) {
        this.restOperations = restTemplateBuilder.defaultHeader("Authorization", "Bearer " + AccessToken).build();
    }

    @Override
    public void sync() {
        this.getItemList();
        int page = 1;
        while(true) {
            CrewResponse[] data = this.getCrewsInfo(page++);
            if(data.length == 0)
                return;
            List<OfficeStaffEntity> entities = new ArrayList<OfficeStaffEntity>();
            for (int i = 0; i < data.length; i++)
                entities.add(this.exchgEntity(data[i]));

            this.staffRepository.saveAllAndFlush(entities);
        }
    }

    private void getItemList() {
        this.enrollmentStat = new HashMap<String, Integer>();
        this.paymentForm = new HashMap<String, Integer>();
        SelectListRequestDto dto = new SelectListRequestDto();
        String[] param = { "hr_enrollment_status", "hr_payment_form" };
        dto.setType(param);
        Map<String, List<SelectListResponseDto>> vals = this.selectListService.find(dto);
        List<SelectListResponseDto> stat = vals.get("hr_enrollment_status");
        for (int i = 1; i < stat.size(); i++) {
            this.enrollmentStat.put(stat.get(i).getName(), Integer.parseInt(stat.get(i).getValue()));
        }
        List<SelectListResponseDto> form = vals.get("hr_payment_form");
        for (int i = 1; i < form.size(); i++) {
            this.paymentForm.put(form.get(i).getName(), Integer.parseInt(form.get(i).getValue()));
        }
    }

    private OfficeStaffEntity exchgEntity(CrewResponse vals) {
        OfficeStaffEntity entity = staffRepository.findBySmartHrCrewId(vals.getId());
        if (entity == null) {
            entity = new OfficeStaffEntity();
            entity.setSmartHrCrewId(vals.getId());
        }
        entity.setEmployeeNo(vals.getEmp_code() == null ? "" : vals.getEmp_code());
        entity.setNameSei(vals.getLast_name());
        entity.setNameMei(vals.getFirst_name());
        entity.setOccupationId(null);
        entity.setAffiliations(this.makeCustomFieldsData(vals));
        entity.setEmployeeType(null);
        entity.setEnrollment(this.makeEnrollment(vals));
        entity.setQualification(this.makeQualification(vals));
        entity.setSmartHrData(this.makeSmartHrData(vals));
        return entity;
    }

    private String makeEnrollment(CrewResponse vals) {
        JSONObject json = new JSONObject();
        try {
            json.put("status", this.exchgEmpStatus(vals.getEmp_status()));
            json.put("joinAt", vals.getEntered_at());
            json.put("leaveAt", vals.getResigned_at());
            json.put("leaveReason", vals.getResigned_reason());
            return json.toString();
        } catch (JSONException ex) {
            System.err.println(ex);
            return "{ ret: 'System error occured'}";
        }
    }

    private Integer exchgEmpStatus(String val) {
        if(val == null)
            return null;
        Integer status = null;
        switch (val) {
            case "employed":
                status = this.enrollmentStat.get("在職中");
                break;
            case "absent":
                status = this.enrollmentStat.get("休職中");
                break;
            case "retired":
                status = this.enrollmentStat.get("退職済");
                break;
        }
        return status;
    }

    private String makeQualification(CrewResponse vals) {
        return "{}";
    }

    private String makeSmartHrData(CrewResponse vals) {
        JSONObject json = new JSONObject();
        try {
            json.put("basic", this.makeBasicData(vals));
            json.put("business", this.makeBusinessData(vals));
            json.put("positioning", this.makePositioningData(vals));
            json.put("addr", this.makeAddrData(vals));
            json.put("residenctAddr", this.makeResidentAddrData(vals));
            json.put("emergency", this.makeEmergencyData(vals));
            json.put("contract", this.makeContractData(vals));
            json.put("remaining", this.makeRemainingData(vals));
            json.put("MaternityChildcare", this.makeMaternityChildcareData(vals));
            return json.toString();
        } catch (JSONException ex) {
            System.err.println(ex);
            return "{ ret: 'System error occured'}";
        }
    }

    private JSONObject makeBasicData(CrewResponse vals) {
        JSONObject json = new JSONObject();
        try {
            json.put("kanaSei", vals.getLast_name_yomi());
            json.put("kanaMei", vals.getFirst_name_yomi());
            json.put("businessNameSei", vals.getBusiness_last_name());
            json.put("businessNameMei", vals.getBusiness_first_name());
            json.put("businessNameKanaSei", vals.getBusiness_last_name_yomi());
            json.put("businessNameKanaMei", vals.getBusiness_first_name_yomi());
            json.put("birthDay", vals.getBirth_at());
            json.put("sex", vals.getGender());
            json.put("mail", vals.getEmail());
            json.put("mynumber", null);
        } catch (JSONException ex) {
            System.err.println(ex);
        }
        return json;
    }

    private JSONObject makeBusinessData(CrewResponse vals) {
        JSONObject json = new JSONObject();
        try {
            PaymentPeriodResponse form = vals.getPayment_period();
            json.put("content", vals.getOccupation());
            Integer type = form != null ? this.exchgPaymentPeriod(form.getPeriodType()) : 0;
            json.put("paymentForm", type);
            json.put("grade", vals.getGrade());
        } catch (JSONException ex) {
            System.err.println(ex);
        }
        return json;
    }

    private Integer exchgPaymentPeriod(String val) {
        if(val == null)
            return 0;
        Integer status = 0;
        switch(val) {
            case "monthly":
                status = this.paymentForm.get("月給");
                break;
            case "weekly":
                status = this.paymentForm.get("週給");
                break;
            case "daily":
                status = this.paymentForm.get("日給");
                break;
            case "hourly":
                status = this.paymentForm.get("時給");
                break;
            case "etc":
//                status = this.paymentForm.get("その他");
                break;
        }
        return status;
    }

    private String makeCustomFieldsData(CrewResponse vals) {
        CrewCustomField[] res = vals.getCustom_fields();
        JSONObject ret = new JSONObject();
        JSONArray branch = new JSONArray();
        JSONArray home = new JSONArray();
        JSONArray unit = new JSONArray();
        try {
            ret.put("branch", branch);
            ret.put("home", home);
            ret.put("unit", unit);
        } catch (JSONException ex) {
            System.err.println(ex);
            return "";
        }
        for(int i=0; i<res.length; i++) {
            CrewCustomField field = res[i];
            CrewCustomFieldTemplate template = field.getTemplate();
            if((template.getElements() == null)
            || (field.getValue() == null)) 
                continue;
            CrewCustomFieldElements ele = this.getCustomFieldElement(template.getElements(), field.getValue());
            List<Object> custType = this.getCustomType(template.getName());
            String type = (String)custType.get(0);
            Integer group = (Integer)custType.get(1);
            if(group == 0)
                continue;

            try {
                JSONObject json = new JSONObject();
                json.put("grp", group);
                json.put("id", null);
                json.put("hrId", field.getValue());
                json.put("name", ele.getName());
                switch(type) {
                case "branch":  branch.put(json);   break;
                case "home":    home.put(json);     break;
                case "unit":    unit.put(json);     break;
                }
            } catch (JSONException ex) {
                System.err.println(ex);
                return "";
            }
        }
        return ret.toString();
    }
    private List<Object> getCustomType(String val) {
        String name = "";
        Integer group = 0;
        if(val.startsWith("事業所")) {
            name = "branch";
            group = Integer.parseInt(val.replace("事業所", ""));
        } else
        if(val.startsWith("ホーム")) {
            name = "home";
            group = Integer.parseInt(val.replace("ホーム", ""));
        } else
        if(val.startsWith("住居")) {
            name = "unit";
            group = Integer.parseInt(val.replace("住居", ""));
        }
        ArrayList<Object> ret = new ArrayList<>();
        ret.add(name);
        ret.add(group);
        return ret;
    }
    private CrewCustomFieldElements getCustomFieldElement(CrewCustomFieldElements[] data, String id) {
        for(int i=0; i < data.length; i++) {
            if(id.equals(data[i].getId()))
                return data[i];
        }
        return null;
    }


    private JSONArray makePositioningData(CrewResponse vals) {
        PositionsResponse[] positions = vals.getPositions();
        Map<Integer, String> mapPos = new HashMap<Integer, String>();
        for (int i = 0; i < positions.length; i++) {
            if(positions[i] != null) {
                mapPos.put(i, positions[i].getName());
            }
        }
        JSONArray ret = new JSONArray();
        if(mapPos.size() == 0) {
            return ret;
        }
        DepartmentsResponse[] departments = vals.getDepartments();
        for (int i = 0; i < departments.length; i++) {
            if(departments[i] == null) {
                continue;
            }
            JSONObject obj = new JSONObject();
            try {
                obj.put("department", departments[i].getName());
                obj.put("position",
                        mapPos.get(departments[i].getPosition()));
            } catch (JSONException ex) {
                System.err.println(ex);
            }
            ret.put(obj);
        }
        return ret;
    }

    private JSONObject makeAddrData(CrewResponse vals) {
        JSONObject json = new JSONObject();
        try {
            AddressResponse addr = vals.getAddress();
            json.put("abroad", null);
            json.put("postNo", addr == null ? "" : addr.getZip_code());
            json.put("pref", addr == null ? "" : addr.getPref());
            json.put("city", addr == null ? "" : addr.getCity());
            json.put("town", addr == null ? "" : addr.getStreet());
            json.put("building", addr == null ? "" : addr.getBuilding());
            json.put("tel", vals.getTel_number());
            json.put("holder", vals.getAddress_head_of_family());
            json.put("relationship", vals.getAddress_relation_name());
        } catch (JSONException ex) {
            System.err.println(ex);
        }
        return json;
    }

    private JSONObject makeResidentAddrData(CrewResponse vals) {
        JSONObject json = new JSONObject();
        try {
            AddressResponse addr = vals.getResident_card_address();
            json.put("postNo", addr == null ? "" : addr.getZip_code());
            json.put("pref", addr == null ? "" : addr.getPref());
            json.put("city", addr == null ? "" : addr.getCity());
            json.put("town", addr == null ? "" : addr.getStreet());
            json.put("building", addr == null ? "" : addr.getBuilding());
            json.put("tel", null);
            json.put("holder", vals.getResident_card_address_head_of_family());
            json.put("relationship", vals.getResident_card_address_relation_name());
        } catch (JSONException ex) {
            System.err.println(ex);
        }
        return json;
    }

    private JSONObject makeEmergencyData(CrewResponse vals) {
        JSONObject json = new JSONObject();
        try {
            AddressResponse addr = vals.getEmergency_address();
            json.put("nameSei", vals.getEmergency_last_name());
            json.put("nameMei", vals.getEmergency_first_name());
            json.put("nameSeiKana", vals.getEmergency_last_name_yomi());
            json.put("nameMeiKana", vals.getEmergency_first_name_yomi());
            json.put("relationship", vals.getEmergency_relation_name());
            json.put("tel", vals.getEmergency_tel_number());
            json.put("abroad", null);
            json.put("postNo", addr == null ? "" : addr.getZip_code());
            json.put("pref", addr == null ? "" : addr.getPref());
            json.put("city", addr == null ? "" : addr.getCity());
            json.put("town", addr == null ? "" : addr.getStreet());
            json.put("building", addr == null ? "" : addr.getBuilding());
        } catch (JSONException ex) {
            System.err.println(ex);
        }
        return json;
    }

    private JSONObject makeContractData(CrewResponse vals) {
        JSONObject json = new JSONObject();
        try {
            json.put("type", vals.getContract_type());
            json.put("startAt", vals.getContract_start_on());
            json.put("endAt", vals.getContract_end_on());
            json.put("renewalType", vals.getContract_renewal_type());
        } catch (JSONException ex) {
            System.err.println(ex);
        }
        return json;
    }

    private JSONObject makeRemainingData(CrewResponse vals) {
        JSONObject json = new JSONObject();
        try {
            json.put("sei", vals.getForeign_resident_last_name());
            json.put("mei", vals.getForeign_resident_first_name());
            json.put("middle", vals.getForeign_resident_middle_name());
            json.put("no", vals.getForeign_resident_card_number());
            json.put("nationality", vals.getNationality_code());
            json.put("status", vals.getResident_status_type());
            json.put("limitAt", vals.getResident_end_at());
            json.put("permission", vals.getHaving_ex_activity_permission());
            json.put("class", vals.getOther_be_workable_type());
        } catch (JSONException ex) {
            System.err.println(ex);
        }
        return json;
    }

    private JSONArray makeMaternityChildcareData(CrewResponse vals) {
        MaternityChildcareLeaveResponse[] res = this.getMaternityInfo(vals.getId());
        JSONArray ret = new JSONArray();
        for (int i = 0; i < res.length; i++) {
            JSONObject json = new JSONObject();
            try {
                json.put("twinsMore", res[i].getIs_multiple_birth());
                json.put("scheduledAt", res[i].getExpected_birth_at());
                json.put("birthAt", res[i].getBirth_at());
                json.put("prenatalStartAt", res[i].getMaternity_leave_start_at());
                json.put("postpartumEndAt", res[i].getMaternity_leave_end_at());
                JSONArray leaves = new JSONArray();
                leaves.put(this.makeChildcare(
                        res[i].getChildcare_leave_start_at(),
                        res[i].getChildcare_leave_end_at(),
                        res[i].getScheduled_reinstatement_at()));
                leaves.put(this.makeChildcare(
                        res[i].getChildcare_leave_2_start_at(),
                        res[i].getChildcare_leave_2_end_at(),
                        res[i].getScheduled_2_reinstatement_at()));
                leaves.put(this.makeChildcare(
                        res[i].getChildcare_leave_3_start_at(),
                        res[i].getChildcare_leave_3_end_at(),
                        res[i].getScheduled_3_reinstatement_at()));
                leaves.put(this.makeChildcare(
                        res[i].getChildcare_leave_4_start_at(),
                        res[i].getChildcare_leave_4_end_at(),
                        res[i].getScheduled_4_reinstatement_at()));
                leaves.put(this.makeChildcare(
                        res[i].getChildcare_leave_5_start_at(),
                        res[i].getChildcare_leave_5_end_at(),
                        res[i].getScheduled_5_reinstatement_at()));
                leaves.put(this.makeChildcare(
                        res[i].getChildcare_leave_6_start_at(),
                        res[i].getChildcare_leave_6_end_at(),
                        res[i].getScheduled_6_reinstatement_at()));
                json.put("childcare", leaves);
                json.put("usePlus", res[i].getIs_spouse_taking_childcare_leave());
            } catch (JSONException ex) {
                System.err.println(ex);
            }
            ret.put(json);
        }
        return ret;
    }

    private JSONObject makeChildcare(String start, String end, String returnAt) throws JSONException {
        JSONObject ret = new JSONObject();
        ret.put("startAt", start);
        ret.put("endAt", end);
        ret.put("plannedReturnAt", returnAt);
        return ret;
    }

    private CrewResponse[] getCrewsInfo(int page) {
        final String url = ConnectServer + PathCrews + "&page=" + page;
        ResponseEntity<CrewResponse[]> res = restOperations.getForEntity(url, CrewResponse[].class);
        return res.getBody();
    }

    private MaternityChildcareLeaveResponse[] getMaternityInfo(String crewId) {
        final String url = String.format(ConnectServer + PathMaternity, crewId);

        ResponseEntity<MaternityChildcareLeaveResponse[]> res = restOperations.getForEntity(url,
                MaternityChildcareLeaveResponse[].class);
        return res.getBody();
    }
}
