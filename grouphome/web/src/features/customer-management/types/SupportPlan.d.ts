export type SupportPlanDto = {
  id: number | null;
  year: string;
  userName: string;
  createDate: string;
  name: string;
  userRequest: string;
  parentRequest: string;
  desiredLife: string;
  planFrom: string;
  planTo: string;

  dailyLife: string;
  job1: string;
  support1: string;
  frequency1: string;
  where1: string;
  forWhom1: string;
  comment1: string;
  priority1: string;

  provideMeals: string;
  job2: string;
  support2: string;
  frequency2: string;
  where2: string;
  forWhom2: string;
  comment2: string;
  priority2: string;

  nursingCare: string;
  job3: string;
  support3: string;
  frequency3: string;
  where3: string;
  forWhom3: string;
  comment3: string;
  priority3: string;

  supportDuringHospitalization: string;
  supportWhenReturningCountry: string;
  medicalSupport1: string;
  medicalSupport2: string;
  nightSupport: string;
  independentLivingSupport: string;
  useHomeCare: string;
  regionalMigration: string;
};