export type NightPatrol = {
  name: string;
  time: string;
  report: string;
};

export type StaffMember = {
  id: number;
  nameSei: string;
  nameMei: string;
};

export type DailyRecorderBasicInfoResponseDto = {
  menuBreakfast: string;
  menuLunch: string;
  menuDinner: string;
  nightPatrols: NightPatrol[];
  shiftMorning: StaffMember;
  shiftAfternoon: StaffMember;
  shiftEvening: StaffMember;
  shiftNight: StaffMember;
  shiftPatrol: StaffMember;
  shiftStaff: StaffMember;
  confirmCalendar: StaffMember;
  confirmOrder: StaffMember;
  confirmTrial: StaffMember;
  confirmPreviousDiary: StaffMember;
  remark: string;
};
