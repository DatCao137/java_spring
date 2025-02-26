package grouphome.webapp.dto.responses.office.staff.smart_hr;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MaternityChildcareLeaveResponse {
    private String id;
    private String crew_id;
    private Boolean is_multiple_birth;
    private String expected_birth_at;
    private String birth_at;
    private String maternity_leave_start_at;
    private String maternity_leave_end_at;
    private Boolean is_spouse_taking_childcare_leave;
    private String childcare_leave_start_at;
    private String childcare_leave_end_at;
    private String scheduled_reinstatement_at;
    private String childcare_leave_2_start_at;
    private String childcare_leave_2_end_at;
    private String scheduled_2_reinstatement_at;
    private String childcare_leave_3_start_at;
    private String childcare_leave_3_end_at;
    private String scheduled_3_reinstatement_at;
    private String childcare_leave_4_start_at;
    private String childcare_leave_4_end_at;
    private String scheduled_4_reinstatement_at;
    private String childcare_leave_5_start_at;
    private String childcare_leave_5_end_at;
    private String scheduled_5_reinstatement_at;
    private String childcare_leave_6_start_at;
    private String childcare_leave_6_end_at;
    private String scheduled_6_reinstatement_at;
}
