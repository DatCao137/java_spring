import { CommonRadio, RadioOption } from '@/components/elements/form/daily/CommonRadio';
import { FilterItem } from '@/components/elements/tableFilter/TableFilter';
import { Checkbox } from '@/components/ui/Checkbox';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { UserSpecificListResponseDto } from '@/features/facility-management/types/Daily';
import { filterNumber } from '@/utils/general';
import { CheckedState } from '@radix-ui/react-checkbox';
import { createColumnHelper } from '@tanstack/react-table';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { getMealColumn, getMedicineColumn, getStateColumn, getStickyColumn, getTimeColumn, isDisabled, TypeOption, updateCellData } from './function';

export const data: UserSpecificListResponseDto[] = [];
const currentUser = -1;

export function getFilterItems(): { [key: string]: FilterItem } {
  // Implement in feature
  return {};
}

export function getTableColumns(typeOption: TypeOption = 1, isUpdating: boolean = false, setIsUpdating: Dispatch<SetStateAction<boolean>>, rowIndex: number, setRowIndex: Dispatch<SetStateAction<number>>) {
  const columnHelper = createColumnHelper<UserSpecificListResponseDto>();

  const commonColumnProps = { columnHelper, isUpdating, setIsUpdating, rowIndex, setRowIndex, typeOption };

  return [
    ...getStickyColumn(commonColumnProps),
    getTimeColumn('起床', 'timeWakeUp', commonColumnProps),
    getTimeColumn('出勤', 'timeToWork', commonColumnProps),
    getTimeColumn('帰宅', 'timeToReturn', commonColumnProps),
    getTimeColumn('入浴', 'timeBathing', commonColumnProps),
    getTimeColumn('就寝', 'timeToBed', commonColumnProps),
    columnHelper.group({
      id: 'meals',
      header: '食事',
      columns: [
        getMealColumn('朝', 'breakfast', commonColumnProps),
        getMealColumn('昼', 'lunch', commonColumnProps),
        getMealColumn('夕', 'dinner', commonColumnProps),
      ],
    }),
    columnHelper.accessor('breakfast.refill', {
      header: () => <span>有料おかわり回数</span>,
      cell: ({ row, column: { id }, table }) => {
        const breakfastRefillOriginal = row.original.breakfast?.refill;
        const lunchRefillOriginal = row.original.lunch?.refill;
        const dinnerRefillOriginal = row.original.dinner?.refill;
        const [breakfastRefill, setBreakfastRefill] = useState(row.original.breakfast?.refill);
        const [lunchRefill, setLunchRefill] = useState(row.original.lunch?.refill);
        const [dinnerRefill, setDinnerRefill] = useState(row.original.dinner?.refill);

        const onBlur = (type: 'breakfast' | 'lunch' | 'dinner') => {
          const value = type === 'breakfast' ? breakfastRefill : (type === 'lunch' ? lunchRefill : dinnerRefill);
          if (type === 'breakfast' && breakfastRefillOriginal === value) return;
          if (type === 'lunch' && lunchRefillOriginal === value) return;
          if (type === 'dinner' && dinnerRefillOriginal === value) return;
          updateCellData(table, row.original, row.index, type, { ...row.original[type], refill: value }, setIsUpdating, setRowIndex, typeOption);
        }

        const onChange = (e: ChangeEvent<HTMLInputElement>, setValue: Dispatch<SetStateAction<number | undefined>>) => {
          setValue(+e.target.value);
        }
        return (
          <div className='px-3'>
            <div className='flex items-center'>
              <Label>朝：</Label>
              <Input value={breakfastRefill} min={0} onChange={(e) => onChange(e, setBreakfastRefill)} onBlur={() => onBlur('breakfast')} type='number' disabled={isDisabled(row.original.breakfast, typeOption) || isUpdating && row.index === rowIndex} className='w-full px-0 text-end rounded-none border-0 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0' />
            </div>
            <div className='flex items-center'>
              <Label>昼：</Label>
              <Input value={lunchRefill} min={0} onChange={(e) => onChange(e, setLunchRefill)} onBlur={() => onBlur('lunch')} type='number' disabled={isDisabled(row.original.lunch, typeOption) || isUpdating && row.index === rowIndex} className='w-full px-0 text-end rounded-none border-0 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0' />
            </div>
            <div className='flex items-center'>
              <Label>夕：</Label>
              <Input value={dinnerRefill} min={0} onChange={(e) => onChange(e, setDinnerRefill)} onBlur={() => onBlur('dinner')} type='number' disabled={isDisabled(row.original.dinner, typeOption) || isUpdating && row.index === rowIndex} className='w-full px-0 text-end rounded-none border-0 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0' />
            </div>
          </div>
        );
      },
      footer: (info) => info.column.id,
      meta: { width: '95px' },
    }),
    columnHelper.accessor('daySupport', {
      header: () => <span>日中支援</span>,
      cell: ({ row, column: { id }, table }) => {
        const [value, setValue] = useState(row.original.daySupport?.daySupport);

        const onChange = (checked: CheckedState) => {
          const v = typeof checked === 'boolean' ? checked.valueOf() : undefined;
          setValue(v);
          updateCellData(table, row.original, row.index, id, { daySupport: v }, setIsUpdating, setRowIndex, typeOption)
        }

        return (
          <Checkbox checked={value} onCheckedChange={onChange} disabled={isDisabled(row.original.daySupport, typeOption) || isUpdating && row.index === rowIndex} />
        )
      },
      footer: (info) => info.column.id,
      meta: { width: '95px' },
    }),
    columnHelper.group({
      header: '服薬',
      id: 'medicine',
      columns: [
        getMedicineColumn('朝', 'medicineMorning', commonColumnProps),
        getMedicineColumn('昼', 'medicineNoon', commonColumnProps),
        getMedicineColumn('夕', 'medicineNight', commonColumnProps),
      ],
    }),
    columnHelper.accessor('placeToGo', {
      header: () => <span>通所等予定</span>,
      cell: ({ row, column: { id }, table }) => {
        const { plans, name } = row.original.placeToGo || {};
        const { goOut, absence, no } = plans || {};
        const [goOutValue, setGoOutValue] = useState<boolean>(goOut || false);
        const [absenceValue, setAbsenceValue] = useState<boolean>(absence || false);
        const [noValue, setNoValue] = useState<boolean>(no || false);

        const placeToGo = { plans: { goOut: goOutValue, absence: absenceValue, no: noValue }, name }

        const onChange = (checked: CheckedState, setValue: Dispatch<SetStateAction<boolean>>, type: 'goOut' | 'absence' | 'no') => {
          const v = typeof checked === 'boolean' ? checked.valueOf() : false;
          setValue(v);
          placeToGo.plans[type] = v;
          updateCellData(table, row.original, row.index, id, placeToGo, setIsUpdating, setRowIndex, typeOption);
        }

        const disabled = isDisabled(row.original.placeToGo, typeOption) || isUpdating && row.index === rowIndex;

        return (
          <div className='text-start px-2 gap-y-2 flex flex-col'>
            <div className='flex items-center gap-x-2'>
              <Checkbox id="cancel-checkbox" className="h-4 w-4 border border-gray-400" onCheckedChange={(checked) => onChange(checked, setGoOutValue, 'goOut')} checked={goOutValue} disabled={disabled} />
              <Label>通所/通勤</Label>
            </div>
            <div className='flex items-center gap-x-2'>
              <Checkbox id="cancel-checkbox" className="h-4 w-4 border border-gray-400" onCheckedChange={(checked) => onChange(checked, setAbsenceValue, 'absence')} checked={absenceValue} disabled={disabled} />
              <Label>欠席/欠勤</Label>
            </div>
            <div className='flex items-center gap-x-2'>
              <Checkbox id="cancel-checkbox" className="h-4 w-4 border border-gray-400" onCheckedChange={(checked) => onChange(checked, setNoValue, 'no')} checked={noValue} disabled={disabled} />
              <Label>予定なし</Label>
            </div>
          </div>
        );
      },
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('placeToGo.name', {
      header: () => <span>外出先(日中活動先)入院 又は 外出状況</span>,
      cell: ({ row, table }) => {
        const original = row.original.placeToGo?.name || '';
        const [name, setName] = useState(row.original.placeToGo?.name || '');

        const onBlur = () => {
          if (original === name) return;
          const placeToGo = { plans: row.original.placeToGo?.plans, name };
          updateCellData(table, row.original, row.index, 'placeToGo', placeToGo, setIsUpdating, setRowIndex, typeOption);
        }
        return (
          <div className='text-start px-2'>
            <Input value={name} onChange={(e) => setName(e.target.value)} onBlur={onBlur} disabled={isDisabled(row.original.placeToGo, typeOption) || isUpdating && row.index === rowIndex} className='rounded-none border-0 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0' />
          </div>
        )
      },
      footer: (info) => info.column.id,
      meta: { width: '180px' },
    }),
    columnHelper.accessor('bodyTempMorning', {
      header: () => <span>体温</span>,
      cell: ({ row, column: { id }, table }) => {
        const originalMorning = row.original.bodyTempMorning?.val || '';
        const originalNoon = row.original.bodyTempNoon?.val || '';
        const originalNight = row.original.bodyTempNight?.val || '';
        const [bodyTempMorningValue, setBodyTempMorningValue] = useState(row.original.bodyTempMorning?.val || '');
        const [bodyTempNoonValue, setBodyTempNoonValue] = useState(row.original.bodyTempNoon?.val || '');
        const [bodyTempNightValue, setBodyTempNightValue] = useState(row.original.bodyTempNight?.val || '');

        const onBlur = (type: 'bodyTempMorning' | 'bodyTempNoon' | 'bodyTempNight') => {
          const val = type === 'bodyTempMorning' ? bodyTempMorningValue : (type === 'bodyTempNight' ? bodyTempNightValue : bodyTempNoonValue);
          if (type === 'bodyTempMorning' && originalMorning === val) return;
          if (type === 'bodyTempNoon' && originalNoon === val) return;
          if (type === 'bodyTempNight' && originalNight === val) return;
          updateCellData(table, row.original, row.index, type, { val: parseFloat(val ?? '0').toString() }, setIsUpdating, setRowIndex, typeOption);
        }

        const onChange = (e: ChangeEvent<HTMLInputElement>, setValue: Dispatch<SetStateAction<string>>) => {
          setValue(filterNumber(e.target.value, /[^\d.]/g));
        }
        return (
          <div className='px-2'>
            <div className='flex items-center'>
              <Label>朝：</Label>
              <Input value={bodyTempMorningValue + '℃'} onChange={(e) => onChange(e, setBodyTempMorningValue)} onBlur={() => onBlur('bodyTempMorning')} disabled={isDisabled(row.original.bodyTempMorning, typeOption) || isUpdating && row.index === rowIndex} className='rounded-none border-0 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0' />
            </div>
            <div className='flex items-center'>
              <Label>昼：</Label>
              <Input value={bodyTempNoonValue + '℃'} onChange={(e) => onChange(e, setBodyTempNoonValue)} onBlur={() => onBlur('bodyTempNoon')} disabled={isDisabled(row.original.bodyTempNoon, typeOption) || isUpdating && row.index === rowIndex} className='rounded-none border-0 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0' />
            </div>
            <div className='flex items-center'>
              <Label>夕：</Label>
              <Input value={bodyTempNightValue + '℃'} onChange={(e) => onChange(e, setBodyTempNightValue)} onBlur={() => onBlur('bodyTempNight')} disabled={isDisabled(row.original.bodyTempNight, typeOption) || isUpdating && row.index === rowIndex} className='rounded-none border-0 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0' />
            </div>
          </div>
        );
      },
      footer: (info) => info.column.id,
      meta: { width: '120px' },
    }),
    columnHelper.group({
      header: '1日の様子（日常生活支援・介護等支援、その他入居者に対する支援など）',
      columns: [
        getStateColumn('朝', 'stateMorning', commonColumnProps, currentUser),
        getStateColumn('昼', 'stateNoon', commonColumnProps, currentUser),
        getStateColumn('夕', 'stateNight', commonColumnProps, currentUser),
      ],
      meta: { width: '700px', className: 'max-w-[800px]' }
    }),
    columnHelper.accessor('outer', {
      header: () => <span>備考</span>,
      cell: ({ row, column: { id }, table }) => {
        const { hospital, myhome } = row.original.outer || {};

        const [hospitalChosen, setHospitalsChosen] = useState<string>(hospital?.first ? 'first' : (hospital?.now ? 'now' : (hospital?.return ? 'return' : '')));
        const [myhomeChosen, setMyhomeChosen] = useState<string>(myhome?.first ? 'first' : (myhome?.now ? 'now' : (myhome?.return ? 'return' : '')));
        const [pressureHighVal, setPressureHighVal] = useState(row.original.pressureHigh?.val || '');
        const [pressureLowVal, setPressureLowVal] = useState(row.original.pressureLow?.val || '');
        const [pulseVal, setPulseVal] = useState(row.original.pulse?.val || '');
        const [oxygenConcentrationVal, setOxygenConcentrationVal] = useState(row.original.oxygenConcentration?.val || '');

        const hospitalOptions: RadioOption[] = [
          { label: '入院初日', value: 'first' },
          { label: '入院中', value: 'now' },
          { label: '退院日', value: 'return' },
        ]

        const myhomeOptions: RadioOption[] = [
          { label: '帰省初日', value: 'first' },
          { label: '帰省中', value: 'now' },
          { label: '帰ホーム日', value: 'return' },
        ]

        const onChange = (value: string, type: 'hospital' | 'myhome') => {
          type === 'hospital' ? setHospitalsChosen(value) : setMyhomeChosen(value);
          const v = { first: value === 'first', now: value === 'now', return: value === 'return' };
          const hospitalValue = type === 'hospital' ? v : hospital;
          const myhomeValue = type === 'myhome' ? v : myhome;
          updateCellData(table, row.original, row.index, id, { hospital: hospitalValue, myhome: myhomeValue }, setIsUpdating, setRowIndex, typeOption);
        }

        const onInputChange = (e: ChangeEvent<HTMLInputElement>, setValue: Dispatch<SetStateAction<string>>) => {
          setValue(filterNumber(e.target.value, /[^\d.]/g));
        }

        const pressureHighOriginal = row.original.pressureHigh?.val || '';
        const pressureLowOriginal = row.original.pressureLow?.val || '';
        const pulseOriginal = row.original.pulse?.val || '';
        const oxygenConcentrationOriginal = row.original.oxygenConcentration?.val || '';

        const onInputBlur = (key: 'pressureHigh' | 'pressureLow' | 'pulse' | 'oxygenConcentration', val?: string,) => {
          if (key === 'pressureHigh' && pressureHighOriginal === val) return;
          if (key === 'pressureLow' && pressureLowOriginal === val) return;
          if (key === 'pulse' && pulseOriginal === val) return;
          if (key === 'oxygenConcentration' && oxygenConcentrationOriginal === val) return;
          updateCellData(table, row.original, row.index, key, { val }, setIsUpdating, setRowIndex, typeOption);
        }

        const disabled = isDisabled(row.original.outer, typeOption) || isUpdating && row.index === rowIndex;

        return (
          <div className='text-start px-2'>
            <div>入院/帰省について】</div>
            <div className='py-1'>
              <CommonRadio options={hospitalOptions} defaultValue={hospitalChosen} onChange={(value) => onChange(value, 'hospital')} disabled={disabled} className='flex flex-row gap-x-3' />
            </div>
            <div className='py-1'>
              <CommonRadio options={myhomeOptions} defaultValue={myhomeChosen} onChange={(value) => onChange(value, 'myhome')} disabled={disabled} className='flex flex-row gap-x-3' />
            </div>
            <div>【その他】</div>
            <div className='flex gap-x-1'>
              <div className='flex gap-x-0'>
                <Input value={pressureHighVal} onChange={(e) => onInputChange(e, setPressureHighVal)} onBlur={() => onInputBlur('pressureHigh', pressureHighVal)} disabled={disabled} className='p-0 w-8 text-end rounded-none border-0 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0' />
                <span className='flex items-center'>/</span>
                <Input value={pressureLowVal} onChange={(e) => onInputChange(e, setPressureLowVal)} onBlur={() => onInputBlur('pressureLow', pressureLowVal)} disabled={disabled} className='p-0 w-8 text-start rounded-none border-0 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0' />
              </div>
              <Input value={'P' + pulseVal} onChange={(e) => onInputChange(e, setPulseVal)} onBlur={() => onInputBlur('pulse', pulseVal)} disabled={disabled} className='p-0 w-8 rounded-none border-0 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0' />
              <Input value={oxygenConcentrationVal + '%'} onChange={(e) => onInputChange(e, setOxygenConcentrationVal)} onBlur={() => onInputBlur('oxygenConcentration', oxygenConcentrationVal)} disabled={disabled} className='p-0 w-8 rounded-none border-0 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0' />
            </div>
          </div>
        );
      },
      footer: (info) => info.column.id,
      meta: { width: '350px', className: 'max-w-[800px] min-w-[200px]' },
    }),
  ];
}
