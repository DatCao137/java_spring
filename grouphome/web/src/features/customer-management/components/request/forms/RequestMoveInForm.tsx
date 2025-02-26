'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form } from '@/components/ui/Form';
import { useSelectList } from '@/features/customer-management/contexts/SelectListContext';
import { RequestSave } from '@/features/blc-common/assets/ApiPath';
import ErrorManager from '@/features/blc-common/utils/ErrorManager';
import formSchema, {
  defaultValues,
} from '@/features/customer-management/validator/request/RequestMoveInFormSchema';
import { Post } from '@/features/blc-common/utils/ServerRequest';
import {
  formatJPDate,
  getAge,
  getJPDateWithTimezone,
  reiwaFormatDate,
} from '@/utils/DateUtils';
import { deepMerge } from '@/utils/Helper';
import { findKeyByValue, UPCASE_REQUEST_ITEM_KEY } from '../RequestTableDef';

import { Income } from '../../../../../components/elements/form/request/movein/Income';
import { ContentMoveIn } from '@/features/customer-management/types/Request';
import { PostalAddress } from '@/features/blc-common/components/PostalAddress';
import { PopupConfirm } from '@/components/elements/PopupConfirm';
import { PopupConfirmParams } from '@/components/elements/Common';
import { Header } from '@/components/elements/form/Header';
import { optionNoYes, optionYesNo } from '@/components/elements/form/RadioChoices';
import {
  Choices, DesiredDate, FailureSituation, FreeText, Gana, Has, InsuranceCare, InsuranceLimit, LifeStyle, Motive, Numbers, TextLine, Times
} from '@/components/elements/form/request/movein/Contents';
import { Office } from '@/components/elements/form/Office';
import { Book } from '@/components/elements/form/request/movein/Book';
import { Related } from '@/components/elements/form/request/movein/Related';
import { Family, History } from '@/components/elements/form/request/movein/VariableList';
import { ItemBuilder } from '@/components/elements/form/ItemBuilder';
import { ActiveDay } from '@/components/elements/form/request/movein/ActiveDay';
import { DisabilityClass, InsuranceExpenses, InsuranceType, Name, Requirements, Selects, Transfer } from '@/components/elements/form/request/movein/Lists';
import { Contact } from '@/components/elements/form/request/movein/Contact';
import { compareDataDifferent, closeX } from '@/components/elements/common/CommonUtils';
import { TEXT_CONFIRM_DATA_CHANGE } from '@/features/blc-common/assets/StringConst';
import { PopupButtons } from '@/components/elements/PopupButtons';

import DatePicker from '@/components/elements/CalendarPicker';
import dayjs from 'dayjs';

import { Input as InputUI } from '@/components/ui/Input';
import { Item } from '@/components/elements/form/Item';

const HOME_INFOS = 'home-infos';
const SEX = 'sex';
const SUPPORT_TYPE = 'support_type';
const ERA = [
  { name: '昭和', value: '1' },
  { name: '平成', value: '2' },
  { name: '西暦', value: '3' },
];
const PHONE_TYPE = 'phone_type';

const OptionAlcohol = [
  { name: '飲む', value: true },
  { name: '飲まない', value: false },
];
const OptionTabacco = [
  { name: '吸う', value: true },
  { name: '吸わない', value: false },
];
const OptionDaySupport = [
  { name: '不要(一人で過ごせる)', value: false },
  { name: '必要', value: true, },
];

const HEALTH_INSURANCE = 'health_insurance';

export const EXPENSES_TYPE = [
  { name: '自己負担', value: '1' },
  { name: '自立支援医療', value: '2' },
];

const WEEKS = 'weeks';
const TRANSFER_TYPE = 'transfer_type';
const TRANSPORTATION_TYPE = 'transportation_type';
const MONEY_MANAGEMENT = 'money_management';
const REQUEST_TYPE = 'request_type';
const PHYSICAL_GRADE = 'physical_grade';
const MENTAL_GRADE = 'mental_grade';
const transferTypeSelfEfficacy = '1'; //自力通所
const transferTypeOrther = '4'; //その他
const expensesTypeSelfSupportMedicalCare = '2'; //自己負担

const requestItems = [
  { name: '本入居', value: 'MOVEIN' },
  { name: '体験(無料)', value: 'EXP_FREE' },
  { name: '体験(有料)', value: 'EXP_PAY' },
];

type props = {
  onCancelClick: () => void;
  data?: any;
  contents: ContentMoveIn
};

const REQUEST_ITEM_OTHERS = '29'
const INSURANCE_EXPENSE_MEDICAL_CARE_TYPE = '2'
const SITUATION_TRANSFER_TYPE_OTHERS = '4'

export const RequestMoveInForm = forwardRef(
  ({ onCancelClick, data, contents }: props, ref: any) => {
    const [isMatchedTown4Current, setIsMatchedTown4Current] = useState(true);
    const [isMatchedTown4Emergency, setIsMatchedTown4Emergency] = useState(true);
    const [isMatchedTown4Doctor, setIsMatchedTown4Doctor] = useState(true);
    const [isMatchedTown4Addresses, setIsMatchedTown4Addresses] = useState<boolean[]>([]);
    const [confirmParam, setConfirmParam] = useState<PopupConfirmParams>({
      isOpen: false,
      textConfirm: '',
      message: '',
      isShowCancel: true,
      confirmAction: () => { },
      onClose: () => handleCloseConfirm()
    });
    const formRef = useRef(ref);
    const { selectListData } = useSelectList();
    const homeInfos =
      selectListData.get(HOME_INFOS)?.filter((e) => e.value) || [];
    const sexes = selectListData.get(SEX)?.filter((e) => e.value) || [];
    const supportTypes =
      selectListData.get(SUPPORT_TYPE)?.filter((e) => e.value) || [];
    const phoneTypes =
      selectListData.get(PHONE_TYPE)?.filter((e) => e.value) || [];
    const healthInsuranceList =
      selectListData.get(HEALTH_INSURANCE)?.filter((e) => e.value) || [];
    const weeks = selectListData.get(WEEKS)?.filter((e) => e.value) || [];
    const transferTypes =
      selectListData.get(TRANSFER_TYPE)?.filter((e) => e.value) || [];
    const transportationTypes =
      selectListData.get(TRANSPORTATION_TYPE)?.filter((e) => e.value) || [];
    const moneyManagement =
      selectListData.get(MONEY_MANAGEMENT)?.filter((e) => e.value) || [];
    const requestType =
      selectListData.get(REQUEST_TYPE)?.filter((e) => e.value) || [];
    const physicalGrade =
      selectListData.get(PHYSICAL_GRADE)?.filter((e) => e.value) || [];
    const mentalGrade =
      selectListData.get(MENTAL_GRADE)?.filter((e) => e.value) || [];

    const [age, setAge] = useState<string | null>(null);
    const [birthDay, setBirthDay] = useState<string | null>(null);

    const [desiredDateValue, setDesiredDateValue] =
      useState<string>('令和__年__月頃');

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues,
    });

    const historyFieldArray = useFieldArray({
      control: form.control,
      name: 'contents.history',
    });

    const familyFieldArray = useFieldArray({
      control: form.control,
      name: 'contents.family',
    });

    const cbAddress = (index: number, isMatched: boolean | undefined) => {
      var wk = isMatchedTown4Addresses;
      if (isMatched == undefined) {
        wk.splice(index, 1);
      } else {
        wk[index] = isMatched;
      }
      setIsMatchedTown4Addresses(wk);
    };

    useEffect(() => {
      if(Object.keys(form.formState.errors).length != 0)
      console.log("バリデーションエラー : ", form.formState.errors);
    }, [ form.formState.errors ]);

    useEffect(() => {
      if (data) {
        const { requestInfo } = data;

        form.setValue(
          'requestDate',
          requestInfo.requestDate
            ? formatJPDate(requestInfo.requestDate, "YYYY-MM-DD")
            : formatJPDate(String(new Date()), "YYYY-MM-DD"),
        );
        form.setValue('requestItem', requestInfo?.requestItemOriginal || '');
        form.setValue('homeId', requestInfo?.homeId?.toString() || '');
        form.setValue('remark', requestInfo?.remark || '');
        form.setValue(
          'desiredDate',
          requestInfo?.desiredDateOriginal?.desired
            ? formatJPDate(requestInfo?.desiredDateOriginal?.desired, "YYYY-MM")
            : null,
        );
        form.setValue(
          'contents',
          deepMerge(defaultValues.contents, contents as any),
        );
        form.setValue('contents.birth.date', contents.birth.date || undefined);
        form.setValue('contents.situation.transfer.transportationType',
          contents.situation.transfer.transferType == transferTypeSelfEfficacy ? contents.situation.transfer.transportationType : undefined);

        form.setValue(
          'contents.insurance.limit',
          contents?.insurance?.limit
            ? formatJPDate(contents.insurance.limit, "YYYY-MM-DD")
            : null,
        );
        historyFieldArray.remove(0);
        familyFieldArray.remove(0);

        form.getValues('contents.history').map((history, index) => {
          historyFieldArray.update(index, history);
        });

        form.getValues('contents.family').map((family, index) => {
          family.together.address = family.together.has ? {
            postNo1st: '',
            postNo2nd: '',
            prefId: null,
            city: '',
            town: '',
          } : family.together.address;
          familyFieldArray.update(index, family);
        });
        setAge(String(getAge(form.getValues('contents.birth.date') || '')));

        const rawDate = form.getValues('contents.birth.date') || null
        setBirthDay(rawDate); 
        setDesiredDateValue(
          reiwaFormatDate(
            requestInfo?.desiredDateOriginal?.desired || '',
            '年MM月頃',
          ),
        );
      }
    }, []);

    const [
      underwriterHas,
      successorHas,
      placeHas,
      transferType,
      needSupportHas,
      medicationHas,
      careHas,
      lifestyleHas,
      insuranceType,
      checkedWeekLength,
      expensesType,

    ] = form.watch([
      'contents.underwriter.has',
      'contents.successor.has',
      'contents.situation.place.has',
      'contents.situation.transfer.transferType',
      'contents.situation.needSupport.has',
      'contents.situation.medication.has',
      'contents.situation.care.has',
      'contents.physicalInfo.lifestyle.has',
      'contents.insurance.type.type',
      'contents.situation.activity.weeks',
      'contents.insurance.expenses.type',
    ]);

    useImperativeHandle(formRef, () => ({
      reset: () => {
        return form.reset();
      },
    }));
        
    const handleClosePopup = () => {
      let oldForm :any = JSON.parse(JSON.stringify(defaultValues))
      let newForm :any = form.getValues()
      if (newForm['contents']['currentAddress']['address'].hasOwnProperty('postNo')) {
        oldForm['contents']['currentAddress']['address']['postNo'] = null;
      }
      if (newForm['contents']['emergency']['address']['address'].hasOwnProperty('postNo')) {
        oldForm['contents']['emergency']['address']['address']['postNo'] = null;
      }
      if (newForm['contents']['related']['doctor']['address'].hasOwnProperty('postNo')) {
        oldForm['contents']['related']['doctor']['address']['postNo'] = null;
      }
      if (newForm['contents']['requirements']['items'].length == 0 || !newForm['contents']['requirements']['items'].includes(REQUEST_ITEM_OTHERS)) {
        newForm['contents']['requirements']['contents'] = null;
      }
      if (newForm['contents']['underwriter']['has'] != true) {
        newForm['contents']['underwriter']['name'] = null;
      }
      if (newForm['contents']['successor']['has'] != true) {
        newForm['contents']['successor']['name'] = null;
      }
      if (newForm['contents']['physicalInfo']['lifestyle']['has'] != true) {
        newForm['contents']['physicalInfo']['lifestyle']['contents'] = null;
      }
      if (newForm['contents']['insurance']['expenses']['type'] != INSURANCE_EXPENSE_MEDICAL_CARE_TYPE) {
        newForm['contents']['insurance']['expenses']['limit'] = null;
      }
      if (newForm['contents']['situation']['transfer']['transferType'] != SITUATION_TRANSFER_TYPE_OTHERS) {
        newForm['contents']['situation']['transfer']['contents'] = null;
      }
      if (newForm['contents']['situation']['needSupport']['has'] != true) {
        newForm['contents']['situation']['needSupport']['contents'] = null;
      }
      if (newForm['contents']['situation']['care']['has'] != true) {
        newForm['contents']['situation']['care']['contents'] = null;
      }
      if (newForm['contents']['situation']['medication']['has'] != true) {
        newForm['contents']['situation']['medication']['contents'] = null;
      }
      if (newForm.hasOwnProperty('desiredDate')) {
        oldForm['desiredDate'] = null;
      }
      if (newForm.hasOwnProperty('homeId')) {
        oldForm['homeId'] = null;
      }
      if (newForm.hasOwnProperty('requestDate')) {
        oldForm['requestDate'] = newForm['requestDate'];
      }
      if (newForm['contents']['birth'].hasOwnProperty('age')) {
        oldForm['contents']['birth']['age'] = null;
      }
      if (newForm['contents']['currentAddress']['tel'].hasOwnProperty('mail')) {
        oldForm['contents']['currentAddress']['tel']['mail'] = null;
      }
      if (newForm['contents']['emergency']['address']['tel'].hasOwnProperty('mail')) {
        oldForm['contents']['emergency']['address']['tel']['mail'] = null;
      }
      if (newForm['contents']['insurance'].hasOwnProperty('limit')) {
        oldForm['contents']['insurance']['limit'] = null;
      }
      
      if (data) {
        let { requestInfo } = data;
        oldForm['requestDate'] = requestInfo.requestDate ? new Date(requestInfo.requestDate) : new Date();
        oldForm['requestItem'] = requestInfo?.requestItemOriginal || '';
        oldForm['homeId'] = requestInfo?.homeId?.toString() || '';
        oldForm['remark'] = requestInfo?.remark || '';
        oldForm['desiredDate'] = requestInfo?.desiredDateOriginal?.desired ? new Date(requestInfo?.desiredDateOriginal?.desired) : null;
        oldForm['contents'] = deepMerge(defaultValues.contents, contents as any);
        oldForm['contents']['birth']['date'] = contents.birth.date || null;
        oldForm['contents']['situation']['transfer']['transportationType'] =
          contents.situation.transfer.transferType == transferTypeSelfEfficacy ? contents.situation.transfer.transportationType : null;

        oldForm['contents']['insurance']['limit'] = contents?.insurance?.limit ? new Date(contents.insurance.limit) : null;
        historyFieldArray.remove(0);
        familyFieldArray.remove(0);

        oldForm['contents']['history'].map((history: any, index: any) => {
          historyFieldArray.update(index, history);
        });

        oldForm['contents']['family'].map((family: any, index: any) => {
          family.together.address = family.together.has ? {
            postNo1st: '',
            postNo2nd: '',
            prefId: null,
            city: '',
            town: '',
          } : family.together.address;
          familyFieldArray.update(index, family);
        });
        setAge(String(getAge(oldForm['contents']['birth']['date']) || ''));

        if ('postNo' in newForm['contents']['currentAddress']['address']) {
          let postNo = oldForm['contents']['currentAddress']['address']['postNo1st'] + oldForm['contents']['currentAddress']['address']['postNo2nd'];
          oldForm['contents']['currentAddress']['address']['postNo'] = postNo == 0 ? null : postNo;
        }
        if ('postNo' in newForm['contents']['emergency']['address']['address']) {
          let postNo = oldForm['contents']['emergency']['address']['address']['postNo1st'] + oldForm['contents']['emergency']['address']['address']['postNo2nd']
          oldForm['contents']['emergency']['address']['address']['postNo'] = postNo == 0 ? null : postNo;
        }
        if (!oldForm['contents']['emergency']['address']['tel'].hasOwnProperty('mail') && newForm['contents']['emergency']['address']['tel'].hasOwnProperty('mail')) {
          oldForm['contents']['emergency']['address']['tel']['mail'] = null;
        }
        if (newForm['contents']['related']['doctor']['address'].hasOwnProperty('postNo')) {
          let postNo = oldForm['contents']['related']['doctor']['address']['postNo1st'] + oldForm['contents']['related']['doctor']['address']['postNo2nd'];
          oldForm['contents']['related']['doctor']['address']['postNo'] = postNo == 0 ? null : postNo;
        }
      }

      if (!compareDataDifferent(oldForm, newForm)) {
        setConfirmParam(prevState => ({
          ...prevState, 
          textConfirm: '閉じる',
          isShowCancel: true,
          message: TEXT_CONFIRM_DATA_CHANGE,
          confirmAction: () => onCancelClick(),
          isOpen: true
        }));
      } else {
        onCancelClick();
      }
    };

    const handleCloseConfirm = () => {
      setConfirmParam(prevState => ({
        ...prevState,
        isOpen: false
      }));
    };

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
        const content = values.contents;

        const representativeInfo = {
          name: "",
          tel: "",
        };
        if (content.situation.transfer.transferType != transferTypeSelfEfficacy) {
          content.situation.transfer.transportationType = '';
        }

        if (content.situation.transfer.transferType != transferTypeOrther) {
          content.situation.transfer.contents = '';
        }
        const dto = {
          requestInfoId: data?.requestInfo?.id || null,
          requestInfoDetailId: data?.requestInfo?.requestInfoDetailId || null,
          name: values.contents.name,
          requestDate: getJPDateWithTimezone(values?.requestDate || ''),
          requestType: 'MOVEIN',
          homeId: values.homeId,
          desiredDate: { desired: values.desiredDate || null },
          representativeInfo: representativeInfo,
          remark: values.remark,
          contents: content,
          requestItem:
            findKeyByValue(UPCASE_REQUEST_ITEM_KEY, values.requestItem) ||
            'movein',
          infoUpdatedAt: data?.requestInfoDetail?.infoUpdatedAt || null,
          detailUpdatedAt: data?.requestInfoDetail?.detailUpdatedAt || null,
        };

        var aryTgtName: string[] = [];
        var bNoMatched = false;
        if (isMatchedTown4Current === false) {
          bNoMatched = true;
          aryTgtName.push("現住所")
        }
        if (isMatchedTown4Emergency === false) {
          bNoMatched = true;
          aryTgtName.push("緊急連絡先");
        }
        if (isMatchedTown4Doctor === false) {
          bNoMatched = true;
          aryTgtName.push("主治医");
        }
        for (var i = 0; i < isMatchedTown4Addresses.length; i++) {
          if (isMatchedTown4Addresses[i] === false) {
            bNoMatched = true;
            aryTgtName.push("家族構成(" + (i + 1) + ")");
          }
        }
        if (bNoMatched) {
          setConfirmParam(prevState => ({
            ...prevState,
            textConfirm: 'OK',
            isShowCancel: true,
            message: aryTgtName.join('と') + 'の郵便番号と住所が一致しませんが保存してよろしいですか？',
            confirmAction: () => doSave(dto),
            isOpen: true
          }));
          return;
        } else {
          doSave(dto);
        }
      } catch (error: any) {
        console.log(error);
        ErrorManager.showErrors(error.response.data);
      }
    };

    const doSave = (data: any) => {
      Post({
        apiPath: RequestSave,
        params: data,
        message: '入居を' + (data?.requestInfo?.id ? '追加' : '更新') + 'しました。',
        onSuccess: (res) => {
          onCancelClick();
        },
      });
    };
    
    const handleCloseX = closeX()
    handleCloseX((e: any) => {
      e.preventDefault();
      handleClosePopup();
    })

    const itemAddress = (path: "contents.currentAddress.address" | "contents.emergency.address.address" | "contents.related.doctor.address") => {
      var props, postNo, errors, cb;
      switch (path) {
        case "contents.currentAddress.address":
          props = contents.currentAddress.address;
          postNo = (contents?.currentAddress?.address?.postNo1st || '') + (contents?.currentAddress?.address?.postNo2nd || '');
          errors = form.formState.errors?.contents?.currentAddress?.address;
          cb = setIsMatchedTown4Current;
          break;
        case "contents.emergency.address.address":
          props = contents.emergency.address.address;
          postNo = (contents?.emergency?.address?.address?.postNo1st || '') + (contents?.emergency?.address?.address?.postNo2nd || '');
          errors = form.formState.errors?.contents?.emergency?.address?.address;
          cb = setIsMatchedTown4Emergency;
          break;
        case "contents.related.doctor.address":
          props = contents.related.doctor.address;
          postNo = (contents?.related?.doctor?.address?.postNo1st || '') + (contents?.related?.doctor?.address?.postNo2nd || '');
          errors = form.formState.errors?.contents?.related?.doctor?.address;
          cb = setIsMatchedTown4Doctor;
      }
      return (<PostalAddress
        key={path}
        formData={{ ...props, postNo: postNo }}
        register={() => { }}
        errors={errors}
        onChange={(data) => form.setValue(path, data)}
        isMatchedTown={cb}
        opts={{
          showLabel: false,
          showPlaceHolder: false,
          className: 'relative border-none text-gray-700 space-y-1',
        }}
      />)
    }

    const handleDateChange = (e: any) => {
      let {  value } = e.target;
      setBirthDay(value || null);
      setAge(String(getAge(value || null)));
      
      form.setValue('contents.birth.date', dayjs(value).format('YYYY-MM-DD'));
      form.setValue('contents.birth.age', String(getAge(dayjs(value).format('YYYY-MM-DD') || '')));
    }


    const baseLayout = [
      {
        label: "root", child: [
          {
            sub: {
              span: 7, cols: 7, child: [
                { label: "入居希望ホーム名", sub: { span: 3, child: [{ ele: <Office form={form} list={homeInfos} /> }] } },
                {
                  label: "入居希望時期", sub: {
                    span: 2, isBorder: true, className: "flex items-center justify-start px-2", child: [
                      { ele: <DesiredDate form={form} val={desiredDateValue} setVal={setDesiredDateValue} /> }]
                  }
                }
              ]
            }
          },
          {
            sub: {
              span: 7, cols: 7, child: [
                {
                  sub: {
                    span: 4, cols: 4, child: [
                      { label: "ふりがな", sub: { span: 3, isItem: true, child: [{ ele: <Gana form={form} /> }] } },
                      { label: "本人氏名", sub: { span: 3, cols: 9, child: [{ ele: <Name form={form} list={sexes} /> }] } }
                    ]
                  }
                },
                {
                  sub: {
                    span: 3, className:"grid border-collapse grid-cols-9 border", cols: 9, child: [
                      { ele: 
                        <>
                          <div className="col-span-9 px-2 pt-1">生年月日</div>
                          <div className="col-span-4 pl-2">
                            <DatePicker
                              value={ birthDay ? dayjs(birthDay).format('YYYY-MM-DD') : '' }
                              onChange={ handleDateChange }
                              mode="single"
                              placeholder="YYYY年MM月DD日"
                              className="custom-datepicker content-center"
                              inputClassName="custom-input"
                              format="YYYY年MM月DD日"
                              name="date-picker"
                            />
                          </div>
                          <div className="col-span-2 ml-2">
                            <Item className="w-full"
                              contents={(
                                <div className="flex flex-row items-center space-y-0">
                                  <div>
                                    <span className="ml-1">(</span>
                                  </div>
                                    <InputUI
                                        type="text"
                                        readOnly
                                        value={age || null}
                                        className="rounded-none border-0 border-b text-end focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                    />
                                    <div>
                                      <span className="ml-2">歳)</span>
                                    </div>
                                </div>
                            )} />
                          </div>
                        </> 
                      },
                    ]
                  }
                }
              ]
            }
          },
          {
            sub: {
              span: 7, cols: 7, child: [
                { label: "現住所", ele: <Contact form={form} path="contents.currentAddress" phoneTypes={phoneTypes} reqName={false} address={itemAddress("contents.currentAddress.address")} /> },
                {
                  label: "緊急連絡先", sub: {
                    span: 6, child: [
                      { ele: <Contact form={form} path="contents.emergency" pathTel='.address' phoneTypes={phoneTypes} reqName={true} address={itemAddress('contents.emergency.address.address')} /> },
                    ]
                  }
                }
              ]
            }
          },
          {
            sub: {
              span: 7, cols: 7, child: [
                {
                  label: "身元引受人", sub: {
                    span: 2, className: "items-center space-x-2  p-2 flex flex-row border", child: [
                      { ele: <Has form={form} path="contents.underwriter" list={optionNoYes} has={underwriterHas} /> }]
                  }
                },
                {
                  label: "後継人等", sub: {
                    span: 3, className: "items-center space-x-2  p-2 flex flex-row border", child: [
                      { ele: <Has form={form} path="contents.successor" list={optionNoYes} has={successorHas} /> }]
                  }
                },
              ]
            }
          },
          {
            label: "入居の動機", sub: {
              span: 6, isItem: true, child: [
                { ele: <Motive form={form} /> }]
            }
          },
          {
            label: "障がい名", sub: {
              span: 6, isItem: true, child: [
                { ele: <TextLine form={form} path="contents.disabilityName" /> }]
            }
          },
          {
            label: "障がい支援区分", sub: {
              span: 6, cols: 6, isBorder: true, child: [
                { ele: <DisabilityClass form={form} list={supportTypes} /> }]
            }
          },
          {
            sub: {
              span: 7, cols: 7, child: [
                { label: "手帳", ele: <Book form={form} listPhysical={physicalGrade} listMental={mentalGrade} /> },
              ]
            }
          },
          {
            label: "障がいの状況", sub: {
              span: 6, isItem: true, child: [
                { ele: <FailureSituation form={form} /> }]
            }
          },
          {
            label: "既往歴", sub: {
              span: 6, isItem: true, child: [
                { ele: <History form={form} fields={historyFieldArray} /> }]
            }
          },
          {
            label: "アレルギー", sub: {
              span: 6, isItem: true, child: [
                { ele: <TextLine form={form} path="contents.allergy" /> }]
            }
          },
          {
            label: "身長", sub: {
              span: 6, cols: 11, child: [
                {
                  sub: {
                    span: 2, isItem: true, child: [
                      { ele: <Numbers form={form} path="contents.physicalInfo.height" /> }]
                  }
                },
                {
                  label: "体重", sub: {
                    span: 2, isItem: true, child: [
                      { ele: <Numbers form={form} path="contents.physicalInfo.weight" /> }]
                  }
                },
                {
                  label: "運動習慣", span: 2, sub: {
                    span: 4, className: "items-center space-x-2  p-2 flex flex-row border", child: [
                      { ele: <LifeStyle form={form} list={optionNoYes} has={lifestyleHas} /> }]
                  }
                },
              ]
            }
          },
          {
            label: "起床・入眠", sub: {
              span: 6, cols: 11, isBorder: true, child: [
                {
                  sub: {
                    span: 3, child: [
                      { ele: <Times form={form} path="contents.physicalInfo.wakeUpTime" type='起床' /> }]
                  }
                },
                {
                  sub: {
                    span: 3, child: [
                      { ele: <Times form={form} path="contents.physicalInfo.sleepingTime" type='入眠' /> }]
                  }
                },
                {
                  sub: {
                    span: 4, child: [
                      {
                        label: "お酒", isNoBorder: true, sub: {
                          span: 3, className: "items-center space-x-2  p-2 flex flex-row", child: [
                            { ele: <Choices form={form} path="contents.physicalInfo.alcohol.has" list={OptionAlcohol} /> }]
                        }
                      },
                      {
                        label: "たばこ", isNoBorder: true, sub: {
                          span: 3, className: "items-center space-x-2  p-2 flex flex-row", child: [
                            { ele: <Choices form={form} path="contents.physicalInfo.tobacco.has" list={OptionTabacco} /> }]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    ];
    const insuranceLayout = [
      {
        label: "root", child: [
          {
            label: "健康保険", sub: {
              span: 4, className: "border-collapse border p-4 px-2 items-center space-x-2 flex flex-row",
              child: [{ ele: <InsuranceType form={form} list={healthInsuranceList} val={insuranceType} /> }]
            }
          },
          {
            label: "介護保険", sub: {
              span: 3, className: "flex border-collapse items-center border px-2",
              child: [{ ele: <InsuranceCare form={form} list={optionYesNo} /> }]
            }
          },
          {
            label: "有効期限", sub: {
              span: 3, className: "flex border-collapse flex-row items-center space-x-2 border px-2",
              child: [{ ele: <InsuranceLimit form={form} /> }]
            }
          },
          {
            label: "医療費", sub: {
              span: 4, className: "flex border-collapse flex-row items-center border p-4",
              child: [
                { ele: <InsuranceExpenses form={form} list={EXPENSES_TYPE} val={expensesType} tgt={expensesTypeSelfSupportMedicalCare} /> }]
            }
          }
        ]
      },
    ];
    const relatedLayout = [
      {
        label: "root", child: [
          {
            label: "主治医", sub: {
              span: 8, className: "grid grid-cols-9 border px-2", child: [
                { ele: <Related form={form} target='doctor' addressEle={itemAddress("contents.related.doctor.address")} /> }]
            }
          },
          {
            label: "担当ケースワーカー", sub: {
              span: 8, className: "grid grid-cols-9 border px-2", child: [
                { ele: <Related form={form} target='caseWorker' /> }]
            }
          }
        ]
      }
    ]
    const activeLayout = [
      {
        label: "root", child: [
          {
            label: "現在の日中活動先", labelClass:"py-6", sub: {
              span: 4, className: "border-collapse border px-2 items-center space-x-2 py-1", child: [
                { ele: (<div>(※未定の場合は入居後の希望活動場所等)</div>) },
                { ele: <Has form={form} path="contents.situation.place" list={optionNoYes} has={placeHas} mesKey='contents' /> }
              ]
            }
          },
          {
            label: "その他利用中サービス", sub: {
              span: 2, isItem: true, child: [
                { ele: <TextLine form={form} path="contents.situation.etcService" /> }]
            }
          },
          {
            label: "活動日", sub: {
              span: 7, className: "grid grid-cols-7 border-collapse border px-2", child: [
                { ele: <ActiveDay form={form} weeks={weeks} checkLength={checkedWeekLength} /> }]
            }
          },
          {
            label: "送迎の有無", labelClass: "py-6", sub: {
              span: 7, className: "border-collapse space-y-1 border p-2 items-center pt-2", child: [
                { ele: <Transfer form={form} list={transferTypes} transport={transportationTypes} val={transferType} tgt2={transferTypeSelfEfficacy} /> }]
            }
          },
          {
            label: "日中活動に行かない日の支援の必要性", sub: {
              span: 7, className: "flex border-collapse flex-row items-center space-x-2 border p-2", child: [
                { ele: <Has form={form} path="contents.situation.needSupport" list={optionNoYes} has={needSupportHas} mesKey="contents" preString='(具体的にご記入ください)' /> }]
            }
          },
          {
            label: "土日祝の過ごし方", sub: {
              span: 7, isItem: true, child: [
                { ele: <TextLine form={form} path="contents.situation.howToSpend" /> }]
            }
          },
          {
            label: "服薬状況", labelClass: "py-3", sub: {
              span: 7, className: "flex border-collapse flex-row items-center space-x-2 border p-2", child: [
                { ele: <Has form={form} path="contents.situation.medication" list={optionNoYes} has={medicationHas} mesKey="contents" preString='(具体的にご記入ください)' /> }]
            }
          },
          {
            label: "医療的ケア", labelClass: "py-3", sub: {
              span: 7, className: "flex border-collapse flex-row items-center space-x-2 border p-2", child: [
                { ele: <Has form={form} path="contents.situation.care" list={optionNoYes} has={careHas} mesKey="contents" preString='(具体的にご記入ください)' /> }]
            }
          },
          {
            label: "金銭管理", labelClass: "py-2", sub: {
              span: 7, className: "flex border-collapse flex-row items-center space-x-2 border p-2", child: [
                { ele: <Selects form={form} path="contents.situation.money" list={moneyManagement} /> }]
            }
          },
        ]
      }
    ]
    return (
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="container rounded border border-black p-5">
              <Header control={form.control} requestItems={requestItems} pathItem='requestItem' pathDate='requestDate' />
              <ItemBuilder layout={baseLayout} className='mt-3 grid grid-cols-7' />

              <div className="mt-6">家族構成</div>
              <div className="ml-6 grid grid-cols-12">
                <Family form={form} fields={familyFieldArray} cbAddress={cbAddress} />
              </div>

              <div className="mt-6">保険</div>
              <ItemBuilder layout={insuranceLayout} className='ml-6 grid grid-cols-9' />

              {/* 入居後収入 */}
              <Income />

              <div className="mt-6">関係機関</div>
              <ItemBuilder layout={relatedLayout} className='ml-6 grid grid-cols-9' />

              <div className="mt-6">活動状況</div>
              <ItemBuilder layout={activeLayout} className='ml-6 grid grid-cols-8' />

              <div className="mt-5">AMANEKUで特にお手伝いや見守りが必要なこと</div>
              <div className="ml-5 grid grid-cols-7 gap-2 border">
                <Requirements form={form} list={requestType} />
              </div>

              <div className="mt-5">心身の状態</div>
              <div className="ml-5 grid grid-cols-1">
                <FreeText form={form} path="contents.mental" />
              </div>

              <div className="mt-5">将来の希望や目標</div>
              <div className="ml-5 grid grid-cols-1">
                <FreeText form={form} path="contents.goals" />
              </div>

              <div className="mt-5">AMANEKUへの要望や知っておいてほしいことなど</div>
              <div className="ml-5 grid grid-cols-1">
                <FreeText form={form} path="contents.requests" />
              </div>

              <div className="mt-5">補足</div>
              <div className="ml-5 grid grid-cols-1">
                <FreeText form={form} path="remark" />
              </div>
            </div>
            <PopupButtons title="保存" onClose={handleClosePopup} />
          </form>
        </Form>
        <PopupConfirm param={confirmParam} />
      </div>

    );
  },
);
RequestMoveInForm.displayName = 'requestMoveInForm';
