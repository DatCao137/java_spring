import { Post } from "@/features/blc-common/utils/ServerRequest";
import { MealsTableType, UserSpecificListResponseDto } from "@/features/facility-management/types/Daily";
import { ColumnHelper, Table } from "@tanstack/react-table";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { FacilityDailyCustomerItemsSave as apiPath } from '@/features/blc-common/assets/ApiPath';
import { toast } from "react-toastify";
import ErrorManager from "@/features/blc-common/utils/ErrorManager";
import { useLocation, useNavigate } from "react-router-dom";
import { formatJPDate } from "@/utils/DateUtils";
import { filterNumber } from "@/utils/general";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Checkbox } from "@/components/ui/Checkbox";
import { Textarea } from "@/components/ui/Textarea";

export type TypeOption = 1 | 2; // 1: recorder, 2: user-specific

const mealsTable: MealsTableType = {
  '1': { rice: true, soup: false, sideDish: false },
  '2': { rice: false, soup: true, sideDish: false },
  '3': { rice: true, soup: false, sideDish: false },
  '4': { rice: false, soup: false, sideDish: true },
  '5': { rice: true, soup: false, sideDish: true },
  '6': { rice: false, soup: true, sideDish: true },
}

export const getMealDisplay = (rice: boolean, soup: boolean, sideDish: boolean): string => {
  for (const [key, meal] of Object.entries(mealsTable)) {
    if (meal.rice === rice && meal.soup === soup && meal.sideDish === sideDish) {
      return key;
    }
  }
  return '〇';
}

export const convertFirstCharToUpperCase = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const updateCellData = (table: Table<UserSpecificListResponseDto>, row: UserSpecificListResponseDto, rowIndex: number, name: string, value: unknown, setIsUpdate?: Dispatch<SetStateAction<boolean>>, setRowIndex?: Dispatch<SetStateAction<number>>, type: TypeOption = 1) => {
  table.options.meta?.updateData(rowIndex, name, value);
  const params = { customerId: row.customerId, yyyymmdd: row.yyyymmdd, name: convertFirstCharToUpperCase(name), value: { [name]: value }, updatedAt: row.updatedAt, type }
  setIsUpdate && setIsUpdate(true);
  setRowIndex && setRowIndex(rowIndex);
  Post({
    apiPath, params,
    onSuccess: (res) => {
      res.data?.data?.updatedAt && table.options.meta?.updateData(rowIndex, 'updatedAt', res.data.data.updatedAt);
      setIsUpdate && setIsUpdate(false);
      setRowIndex && setRowIndex(-1);
    },
    errMessage: "一覧の取得に失敗しました。",
    message: "更新に成功しました。",
  });
}

export const isDisabled = (data: any, type: number = 1): boolean => {
  return type === 2 && !data;
}

export type CommonColumnProps = {
  columnHelper: ColumnHelper<UserSpecificListResponseDto>,
  isUpdating: boolean,
  setIsUpdating: Dispatch<SetStateAction<boolean>>,
  rowIndex: number,
  setRowIndex: Dispatch<SetStateAction<number>>,
  typeOption: TypeOption, // 1: recorder, 2: user-specific
}

export const getStickyColumn = (
  { columnHelper, typeOption }: CommonColumnProps
) => {
  return typeOption === 1 ? [
    columnHelper.accessor('roomNo', {
      header: () => <></>,
      cell: ({ row }) => <div>{row.original.roomNo}</div>,
      footer: (info) => info.column.id,
      meta: {
        width: '60px',
        className: 'sticky left-0 bg-gray z-20',
        bodyClassName: 'sticky left-0 bg-white z-20',
      }
    }),
    columnHelper.accessor('customerName', {
      header: () => <span>利用者氏名</span>,
      cell: ({ row }) => {
        const [homeId, setHomeId] = useState<string>('0');
        const [date, setDate] = useState<string>('');
        const navigate = useNavigate();
        const location = useLocation();

        useEffect(() => {
          const query = new URLSearchParams(location.search);
          const homeId = query.get('homeId');
          const date = query.get('date');

          setHomeId(homeId || '');
          setDate(date || '');
        }, [location.search]);

        const onClick = () => {
          localStorage.setItem('customerName', row.original.customerName);
          navigate(`/app/facility/daily-user-specific?homeId=${homeId}&customerId=${row.original.customerId}&date=${date}`);
        }

        return <div className='cursor-pointer hover:cursor-pointer hover:text-blue-600' onClick={onClick}>{row.original.customerName}</div>;
      },
      footer: (info) => info.column.id,
      meta: {
        className: 'sticky left-[60px] shadow bg-gray z-20',
        bodyClassName: 'sticky left-[60px] bg-white shadow shadow-gray-300 z-20',
      }
    }),
  ] : [
    columnHelper.accessor('yyyymmdd', {
      header: () => <span>{localStorage.getItem('customerName')}</span>,
      cell: ({ row }) => <div>{formatJPDate(row.original.yyyymmdd, 'MM/DD(dd)')}</div>,
      footer: (info) => info.column.id,
      meta: {
        className: 'sticky left-0 shadow bg-gray z-20',
        bodyClassName: 'sticky left-0 bg-white shadow shadow-gray-300 z-20',
      }
    }),
  ];
}

export const getTimeColumn = (
  title: string,
  key: 'timeWakeUp' | 'timeToWork' | 'timeToReturn' | 'timeBathing' | 'timeToBed',
  { columnHelper, isUpdating, setIsUpdating, rowIndex, setRowIndex, typeOption }: CommonColumnProps
) => {
  return columnHelper.accessor(key, {
    header: () => <span>{title}</span>,
    cell: ({ row, table }) => {
      const originalValue = row.original[key]?.time || '';
      const [value, setValue] = useState(row.original[key]?.time || '');

      const disabled = isDisabled(row.original[key], typeOption) || isUpdating && row.index === rowIndex;

      const onBlur = () => {
        if (value === originalValue) return;
        updateCellData(table, row.original, row.index, key, { time: value }, setIsUpdating, setRowIndex, typeOption);
      }

      return <input type="time" value={value} onChange={e => setValue(e.target.value)} onBlur={onBlur} disabled={disabled} />
    },
    footer: (info) => info.column.id,
    meta: { width: '60px' },
  });
}

export const getMealColumn = (
  title: string,
  key: 'breakfast' | 'lunch' | 'dinner',
  { columnHelper, isUpdating, setIsUpdating, rowIndex, setRowIndex, typeOption }: CommonColumnProps
) => {
  return columnHelper.accessor(key, {
    header: () => <span>{title}</span>,
    cell: ({ row, table }) => {
      const { type, amount, cancel, hardness } = row.original[key] || {};
      const [amountValue, setAmountValue] = useState(amount || 0);
      const [cancelValue, setCancelValue] = useState(cancel || false);
      const [hardnessValue, setHardnessValue] = useState(hardness || 'normal');

      const mealType = getMealDisplay(type?.rice ?? false, type?.soup ?? false, type?.sideDish ?? false);

      const onAmountBlur = () => {
        if (amountValue == amount) return;
        updateCellData(table, row.original, row.index, key, { ...row.original[key], amount: amountValue }, setIsUpdating, setRowIndex, typeOption);
      }

      const onAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        const amount = parseInt(filterNumber(e.target.value) || '0');
        setAmountValue(amount > 100 ? 100 : amount);
      }

      const onCheckboxChange = (checked: CheckedState, typeOfCheck: string) => {
        if (typeOfCheck === 'cancel') {
          setCancelValue(checked === true);
          updateCellData(table, row.original, row.index, key, { ...row.original[key], cancel: checked === true }, setIsUpdating, setRowIndex, typeOption);
        } else {
          const hValue = checked !== true ? 'normal' : (typeOfCheck === 'mousse' ? 'mousse' : (typeOfCheck === 'soft' ? 'soft' : 'normal'));
          setHardnessValue(hValue);
          updateCellData(table, row.original, row.index, key, { ...row.original[key], hardness: hValue }, setIsUpdating, setRowIndex, typeOption);
        }
      }

      const disabled = isDisabled(row.original[key], typeOption) || isUpdating && row.index === rowIndex;

      return (
        <div className='text-start'>
          <div className='flex items-center border-b border-slate-300'>
            <span className='text-center px-5 py-3 border-r border-slate-300 border-dashed'>
              {mealType}
            </span>
            <span className='w-full text-center'>
              <input type='text' value={amountValue + '%'} onChange={onAmountChange} onBlur={onAmountBlur} disabled={disabled} className='w-full text-center outline-none' />
            </span>
          </div>
          <div className='p-2 flex flex-col'>
            <div className='flex items-start py-1 gap-x-2'>
              <Checkbox onCheckedChange={(checked) => onCheckboxChange(checked, 'cancel')} checked={cancelValue} disabled={disabled} className="h-4 w-4 border border-gray-400 mt-1" />前日・当日の <br />キャンセル
            </div>
            <div className='flex items-start py-1 gap-x-2'>
              <Checkbox onCheckedChange={(checked) => onCheckboxChange(checked, 'mousse')} checked={hardnessValue === 'mousse'} disabled={disabled} className="h-4 w-4 border border-gray-400 mt-1" />ムース
            </div>
            <div className='flex items-start py-1 gap-x-2'>
              <Checkbox onCheckedChange={(checked) => onCheckboxChange(checked, 'soft')} checked={hardnessValue === 'soft'} disabled={disabled} className="h-4 w-4 border border-gray-400 mt-1" />やわらか
            </div>
          </div>
        </div>
      );
    },
    footer: (info) => info.column.id,
  });
}

export const getStateColumn = (
  title: string,
  key: 'stateMorning' | 'stateNoon' | 'stateNight',
  { columnHelper, isUpdating, setIsUpdating, rowIndex, setRowIndex, typeOption }: CommonColumnProps,
  currentUser: number
) => {
  return columnHelper.accessor(key, {
    header: () => <span>{title}</span>,
    cell: ({ row, table }) => {
      const originalValue = row.original[key]?.message || '';
      const [value, setValue] = useState(row.original[key]?.message || '');

      const onBlur = () => {
        if (value === originalValue) return;
        updateCellData(table, row.original, row.index, key, { message: value }, setIsUpdating, setRowIndex, typeOption);
      }

      const disabled = isDisabled(row.original[key], typeOption) || currentUser != row.original.createdByMorning || isUpdating && row.index === rowIndex;

      return (
        <>
          <Textarea value={value} onChange={(e) => setValue(e.target.value)} onBlur={onBlur} disabled={disabled} rows={6} className='px-2 resize-none whitespace-pre-line rounded-none border-0 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0' />
        </>
      );
    },
    footer: (info) => info.column.id,
  });
}

export const getMedicineColumn = (
  title: string,
  key: 'medicineMorning' | 'medicineNoon' | 'medicineNight',
  { columnHelper, isUpdating, setIsUpdating, rowIndex, setRowIndex, typeOption }: CommonColumnProps,
) => {
  return columnHelper.accessor(`${key}1`, {
    header: () => <span>{title}</span>,
    cell: ({ row, table }) => {
      const originalValue1 = row.original[`${key}1`]?.time || '';
      const originalValue2 = row.original[`${key}2`]?.time || '';
      const [medicine1Value, setMedicine1Value] = useState(row.original[`${key}1`]?.time || '');
      const [medicine2Value, setMedicine2Value] = useState(row.original[`${key}2`]?.time || '');

      const onBlur = (type: 1 | 2) => {
        if (type === 1 && medicine1Value === originalValue1 || type === 2 && medicine2Value === originalValue2) return;
        type === 1
          ? updateCellData(table, row.original, row.index, `${key}1`, { time: medicine1Value }, setIsUpdating, setRowIndex, typeOption)
          : updateCellData(table, row.original, row.index, `${key}2`, { time: medicine2Value }, setIsUpdating, setRowIndex, typeOption);
      }

      return (
        <div className='flex flex-col justify-center gap-y-1'>
          <input className='text-center' type="time" value={medicine1Value} onChange={e => setMedicine1Value(e.target.value)} onBlur={() => onBlur(1)} disabled={isDisabled(row.original[`${key}1`], typeOption) || isUpdating && row.index === rowIndex} />
          <input className='text-center' type="time" value={medicine2Value} onChange={e => setMedicine2Value(e.target.value)} onBlur={() => onBlur(2)} disabled={isDisabled(row.original[`${key}2`], typeOption) || isUpdating && row.index === rowIndex} />
        </div>
      );
    },
    footer: (info) => info.column.id,
    meta: { width: '90px' },
  });
}
