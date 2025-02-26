package grouphome.webapp.dto.responses.office.staff.smart_hr;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CrewResponse {
    private String id;
    private String last_name;
    private String first_name;
    private String last_name_yomi;
    private String first_name_yomi;
    private String business_last_name;
    private String business_first_name;
    private String business_last_name_yomi;
    private String business_first_name_yomi;
    private String birth_at;
    private String gender;
    private String email;
    private String emp_status;
    private String entered_at;
    private String resigned_at;
    private String resigned_reason;
    private String emp_code;
    private String biz_establishment_id;
    private String occupation;
    private String job_category;
    private String emp_type;
    private PaymentPeriodResponse payment_period;
    private String grade;
    private DepartmentsResponse[] departments;
    private PositionsResponse[] positions;
    private AddressResponse address;
    private String tel_number;
    private String address_head_of_family;
    private String address_relation_name;
    private AddressResponse resident_card_address;
    private String resident_card_address_head_of_family;
    private String resident_card_address_relation_name;
    private String emergency_last_name;
    private String emergency_first_name;
    private String emergency_last_name_yomi;
    private String emergency_first_name_yomi;
    private String emergency_relation_name;
    private String emergency_tel_number;
    private AddressResponse emergency_address;
    private String contract_type;
    private String contract_start_on;
    private String contract_end_on;
    private String contract_renewal_type;
    private String foreign_resident_last_name;
    private String foreign_resident_first_name;
    private String foreign_resident_middle_name;
    private String foreign_resident_card_number;
    private String nationality_code;
    private String resident_status_type;
    private String resident_end_at;
    private String having_ex_activity_permission;
    private String other_be_workable_type;
    private CrewCustomField[] custom_fields;
}
