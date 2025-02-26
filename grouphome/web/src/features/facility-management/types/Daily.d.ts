export type DailyListResponseDto = {
  id?: number;
  branchId: number;
  homeId: number;
  branchName: string;
  homeName: string;
  prefName: string;
  city: string;
  town: string;
  location: string;
  updatedAt: string;
}

export type DailyDetailUnitResponseDto = {
  id?: number;
  unitId: number;
  unitName: string;
}


export type UserSpecificListResponseDto = {
  id: number;
  customerName: string;
  customerId: number;
  roomNo: string | null;
  yyyymmdd: string;
  placeToGo?: {
    plans: {
      goOut: boolean;
      absence: boolean;
      no: boolean;
    },
    name: string;
  },
  outer?: {
    hospital: {
      first: boolean;
      now: boolean;
      return: boolean;
    },
    myhome: {
      first: boolean;
      now: boolean;
      return: boolean;
    }
  },
  daySupport?: {
    daySupport: boolean;
  },
  stateMorning?: {
    message: string;
  },
  stateNoon?: {
    message: string;
  },
  stateNight?: {
    message: string;
  },
  timeWakeUp?: { time?: string };
  timeToWork?: { time: string };
  timeToReturn?: { time: string };
  timeBathing?: { time: string };
  timeToBed?: { time: string };
  breakfast?: {
    type: {
      rice: boolean;
      soup: boolean;
      sideDish: boolean;
    },
    amount: number;
    refill: number;
    cancel: boolean;
    hardness: 'mousse' | 'soft' | 'normal';
  },
  lunch?: {
    type: {
      rice: boolean;
      soup: boolean;
      sideDish: boolean;
    },
    amount: number;
    refill: number;
    cancel: boolean;
    hardness: 'mousse' | 'soft' | 'normal';
  },
  dinner?: {
    type: {
      rice: boolean;
      soup: boolean;
      sideDish: boolean;
    },
    amount: number;
    refill: number;
    cancel: boolean;
    hardness: 'mousse' | 'soft' | 'normal';
  },
  medicineMorning1?: { time: string };
  medicineMorning2?: { time: string };
  medicineNoon1?: { time: string };
  medicineNoon2?: { time: string };
  medicineNight1?: { time: string };
  medicineNight2?: { time: string };
  bodyTempMorning?: { val: string };
  bodyTempNoon?: { val: string };
  bodyTempNight?: { val: string };
  pressureHigh?: { val: string };
  pressureLow?: { val: string };
  pulse?: { val: string };
  oxygenConcentration?: { val: string };
  updatedAt: string;
  createdBy: number;
  createdByMorning: number;
  createdByNoon: number;
  createdByNight: number;
  createdNameMorning: string | null;
  createdNameNoon: string | null;
  createdNameNight: string | null;
};

export type SaveCustomerItemsResponseDto = {
  id: number;
  updatedAt: string;
}

export type MealType = {
  rice: boolean;
  soup: boolean;
  sideDish: boolean;
}

export type MealsTableType = {
  [key: string]: MealType;
};

export type UserSpecificTableFilterDef = {
  customerId: number | null;
  yyyymmdd: string;
  homeId: number;
  type: number;
  unitId: number | null;
};
