type PostalAddress = {
    postNo1st: string | null;
    postNo2nd: string | null;
    prefId: string | null;
    postNo: string;
    pref: string;
    city: string;
    town: string;
};

type Qualification = {
    qualificationId: number,
    qualificationName: string | null,
    qualificationType: string | null,
    hold: boolean | null,
    etcName: string | null,
}

type Positioning = {
    department: string;
    departmentId: number | null;
    position: string;
    positionId: number | null;
}

type StaffDetailFormData = {
    id: number | null;
    nameSei: string;
    nameMei: string;
    kanaSei: string;
    kanaMei: string;
    birthDay: string;
    age: number | null;
    sex: string;
    businessNameSei: string;
    businessNameMei: string;
    businessNameKanaSei: string;
    businessNameKanaMei: string;
    mail: string;

    employeeNo: string;
    branchNames: string;
    homeNames: string;
    unitNames: string;
    businessContent: string;
    occupationId: number | null;
    occupation: string | null;
    employeeType: string;
    paymentForm: string;
    grade: string;

    positioning: Positioning[];

    enrollmentStatus: string;
    joinAt: string;
    enrollmentPeriod: string;
    leaveAt: string;
    leaveReason: string;

    address: PostalAddress;
    building: string;
    tel: string;
    holder: string;
    relationship: string;

    residentAddress: PostalAddress;
    residentBuilding: string;
    residentTel: string;
    residentHolder: string;
    residentRelationship: string;

    emergencyNameSei: string;
    emergencyNameMei: string;
    emergencyNameKanaSei: string;
    emergencyNameKanaMei: string;
    emergencyRelationship: string;
    emergencyTel: string;

    emergencyBuilding: string;
    emergencyAddress: PostalAddress;

    contractType: string;
    contractStartAt: string;
    contractEndAt: string;
    contractRenewalType: string;

    remainingSei: string;
    remainingMei: string;
    remainingMiddleName: string;
    remainingNo: string;
    remainingNationality: string;
    remainingStatus: string;
    remainingLimitAt: string;
    remainingPermission: boolean | null;
    remainingClass: string;

    twinsMore: boolean | null;
    scheduledBirthAt: string;
    birthAt: string | null;
    prenatalStartAt: string | null;
    postpartumEndAt: string | null;
    childcareStartAt: string | null;
    childcareEndAt: string | null;
    plannedReturnAt: string | null;
    usePlus: boolean | null;

    paymentFormId: number | null;
    gradeId: number | null;
    contractTypeId: number | null;
    contractRenewalTypeId: number | null;
    remainingNationalityId: number | null;
    remainingStatusId: number | null;
    remainingClassId: number | null;
    employeeTypeId: number | null;
    enrollmentStatusId: number | null;
    updatedAt: string;

    qualification: Qualification[];
};

type StaffSaveFormData = {
    id: number | null;
    branchNames: string | null;
    homeNames: string | null;
    unitNames: string | null;
    updatedAt: string;
}

type StaffSaveQualificationFormData = {
    id: number;
    qualification: Qualification[];
    updatedAt: string;
}

export { StaffDetailFormData, StaffSaveQualificationFormData, StaffSaveFormData, Positioning, Qualification }