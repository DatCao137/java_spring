import { Button } from "@/components/ui/ButtonCus";
import { Form as FormReact} from "@/components/ui/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormItemBox } from "../../../../../../../components/elements/form/FormItemBox";
import { SelectListResponseDto } from "@/features/customer-management/contexts/SelectListContext";
import { Post } from '@/features/blc-common/utils/ServerRequest';
import { showErrors } from "../common/CustomerForm";
import { TenantMoveinDocumentSave as saveApi } from "@/features/blc-common/assets/ApiPath";
import { useContext, useEffect, useState } from "react";
import { TenantTabContext } from "../../Tabs";
import { RadioItemBox } from "../../../../../../../components/elements/form/RadioItemBox";
import { formSchema, SaveCustomerMoveinDocumentStatusRequestDto } from "@/features/customer-management/validator/tenant/CustomerMoveinDocumentStatusSchema";
import { TenantMainContext } from "@/features/customer-management/pages/TenantMain";
import { Select } from "@/components/elements/form/Controls";
import { getStaffByBranchId } from "./Tab";
import { formatJPDate } from "@/utils/DateUtils";
import dayjs from "dayjs";
import DatePicker from "@/components/elements/CalendarPicker";
import { PopupButtons } from "@/components/elements/PopupButtons";

type props = {
  formData: SaveCustomerMoveinDocumentStatusRequestDto;
  onCancelClick: () => void;
}

enum JUDGE_TYPE {
  DAY_INCORRECT = "日付不備",
  OK = "OK",
  LACK = "不足",
}

export const Form = ({ formData, onCancelClick }: props) => {
  const { setMoveinDocument } = useContext(TenantTabContext);
  const { detailBasic } = useContext(TenantMainContext);
  const [staffs, setStaffs] = useState<SelectListResponseDto[]>([]);

  const form = useForm<SaveCustomerMoveinDocumentStatusRequestDto>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  })

  async function onSubmit(values: SaveCustomerMoveinDocumentStatusRequestDto) {
    Post({
      apiPath: saveApi,
      params: values,
      message: '顧客情報の基本情報を正常に保存しました',
      onSuccess: (res) => {
        setMoveinDocument && setMoveinDocument((prev: any) => ({
          ...prev, id: prev?.id === undefined ? res.data.data : undefined,
        }));
        form.reset();
        onCancelClick();
      },
      onValidation: (err) => {
        showErrors(err, form);
      },
    });
  }

  const handleCancelClick = () => {
    form.reset();
    onCancelClick();
  }

  const [
    basicUsageStore,
    basicFaceSheetStore,
    basicImportantStore,
    basicImportantSign,
    basicUsageContractStore,
    basicUsageContractSign,
    basicUsageCreatedAt,
    basicFaceSheetCreatedAt,
    basicImportantCreatedAt,
    basicUsageContractCreatedAt,
    plan1stDraftStore,
    plan1stDraftSign,
    plan1stMeetingStore,
    plan1stMeetingWriteCheck,
    plan1stMainStore,
    plan1stMainSign,
    plan1stDraftCreatedAt,
    plan1stMeetingCreatedAt,
    plan1stMainCreatedAt,
    plan1stLastUpdatedAt,
  ] = form.watch([
    'basic.usage.store',
    'basic.faceSheet.store',
    'basic.important.store',
    'basic.important.sign',
    'basic.usageContract.store',
    'basic.usageContract.sign',
    'basic.usage.createdAt',
    'basic.faceSheet.createdAt',
    'basic.important.createdAt',
    'basic.usageContract.createdAt',
    'plan1st.draft.store',
    'plan1st.draft.sign',
    'plan1st.meeting.store',
    'plan1st.meeting.writeCheck',
    'plan1st.main.store',
    'plan1st.main.sign',
    'plan1st.draft.createdAt',
    'plan1st.meeting.createdAt',
    'plan1st.main.createdAt',
    'plan1st.lastUpdatedAt'
  ]);

  const getJudgeValue = (type: number = 1): string | undefined => {
    let result: string | undefined = undefined;

    if (type === 1) {
      const moveinAt = formatJPDate(detailBasic?.moveInAt) || dayjs(new Date()).add(1, 'day').format('YYYY/MM/DD');
      if (
        formatJPDate(String(basicUsageCreatedAt)) > moveinAt ||
        formatJPDate(String(basicFaceSheetCreatedAt)) > moveinAt ||
        formatJPDate(String(basicImportantCreatedAt)) > moveinAt ||
        formatJPDate(String(basicUsageContractCreatedAt)) > moveinAt
      ) {
        result = JUDGE_TYPE.DAY_INCORRECT;
      } else if (
        basicUsageStore && basicFaceSheetStore && basicImportantStore &&
        basicImportantSign && basicUsageContractStore && basicUsageContractSign
      ) {
        result = JUDGE_TYPE.OK;
      } else {
        result = JUDGE_TYPE.LACK;
      }
    } else if (type === 2) {
      const lastUpdatedAt = formatJPDate(String(plan1stLastUpdatedAt));
      if (
        formatJPDate(String(plan1stDraftCreatedAt)) > lastUpdatedAt ||
        formatJPDate(String(plan1stMeetingCreatedAt)) > lastUpdatedAt ||
        formatJPDate(String(plan1stMainCreatedAt)) > lastUpdatedAt
      ) {
        result = JUDGE_TYPE.DAY_INCORRECT;
      } else if (
        plan1stDraftStore && plan1stDraftSign && plan1stMeetingStore &&
        plan1stMeetingWriteCheck && plan1stMainStore && plan1stMainSign
      ) {
        result = JUDGE_TYPE.OK;
      } else {
        result = JUDGE_TYPE.LACK;
      }
    }
    return result;
  }

  useEffect(() => {
    const getStaffs = async () => {
      const staffs: SelectListResponseDto[] = await getStaffByBranchId(detailBasic?.branchId || -1, true);
      setStaffs(staffs);
    }

    getStaffs();
  }, [])

  const { formState: { isDirty } } = form;

  useEffect(() => {
    if (isDirty) {
      form.setValue('basic.judge', getJudgeValue(1));
      form.setValue('plan1st.judge', getJudgeValue(2));
    }
  }, [
    basicUsageStore,
    basicFaceSheetStore,
    basicImportantStore,
    basicImportantSign,
    basicUsageContractStore,
    basicUsageContractSign,
    basicUsageCreatedAt,
    basicFaceSheetCreatedAt,
    basicImportantCreatedAt,
    basicUsageContractCreatedAt,
    plan1stDraftStore,
    plan1stDraftSign,
    plan1stMeetingStore,
    plan1stMeetingWriteCheck,
    plan1stMainStore,
    plan1stMainSign,
    plan1stDraftCreatedAt,
    plan1stMeetingCreatedAt,
    plan1stMainCreatedAt,
    plan1stLastUpdatedAt,
    isDirty,
  ]);

  return (
    <FormReact {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="tab-form-xl space-y-8">
        <div className="flex-none lg:flex">
          {/* Basic Info */}
          <div className="w-full lg:w-1/2 space-y-3 lg:space-y-6">
            <div className="font-medium">基本書類</div>
            {/* 判定 */}
            <div className="mx-5 lg:mx-10 w-full lg:w-5/6" style={{ marginTop: 0 }}>
              <div className="font-medium">判定</div>
              <FormItemBox
                name="basic.judge" label="" disabled={true}
                className={{
                  formBox: 'mx-5 lg:mx-10',
                  formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                }}
              />
            </div>
            {/* 利用申込書 */}
            <div className="mx-5 lg:mx-10 w-full lg:w-5/6">
              <div className="font-medium">利用申込書</div>
              <FormItemBox
                name="basic.usage.store"
                label="格納有無"
                inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                  formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                }}
              >
                {(field) => (
                  <RadioItemBox field={field} fieldData={basicUsageStore} />
                )}
              </FormItemBox>
              <FormItemBox
                name="basic.usage.createdAt"
                label="作成日付"
                inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                  formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                }}
              >
                {(field) => (
                  <DatePicker
                    value={field.value  || null}
                    onChange={field.onChange}
                    mode="single"
                    placeholder="YYYY年MM月DD日(ddd)"
                    className="custom-datepicker content-center !mt-0"
                    inputClassName="custom-input"
                    format="YYYY年MM月DD日(ddd)"
                    name=""
                  />
                )}
              </FormItemBox>
            </div>
            {/* フェイスシート */}
            <div className="mx-5 lg:mx-10 w-full lg:w-5/6">
              <div className="font-medium">フェイスシート</div>
              <FormItemBox
                name="basic.faceSheet.store"
                label="格納有無"
                inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                  formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                }}
              >
                {(field) => (
                  <RadioItemBox field={field} fieldData={basicFaceSheetStore} />
                )}
              </FormItemBox>
              <FormItemBox
                name="basic.faceSheet.createdAt"
                label="作成日付"
                inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                  formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                }}
              >
                {(field) => (
                  <DatePicker
                    value={field.value  || null}
                    onChange={field.onChange}
                    mode="single"
                    placeholder="YYYY年MM月DD日(ddd)"
                    className="custom-datepicker content-center !mt-0"
                    inputClassName="custom-input"
                    format="YYYY年MM月DD日(ddd)"
                    name=""
                  />
                )}
              </FormItemBox>
            </div>

            {/* 重要事項説明書 */}
            <div className="mx-5 lg:mx-10 w-full lg:w-5/6">
              <div className="font-medium">重要事項説明書</div>
              <FormItemBox
                name="basic.important.store"
                label="格納有無"
                inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                  formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                }}
              >
                {(field) => (
                  <RadioItemBox field={field} fieldData={basicImportantStore} />
                )}
              </FormItemBox>
              <FormItemBox
                name="basic.important.sign"
                label="サイン＋印"
                inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                  formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                }}
              >
                {(field) => (
                  <RadioItemBox field={field} fieldData={basicImportantSign} />
                )}
              </FormItemBox>
              <FormItemBox
                name="basic.important.createdAt"
                label="作成日付"
                inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                  formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                }}
              >
                {(field) => (
                  <DatePicker
                    value={field.value  || null}
                    onChange={field.onChange}
                    mode="single"
                    placeholder="YYYY年MM月DD日(ddd)"
                    className="custom-datepicker content-center !mt-0"
                    inputClassName="custom-input"
                    format="YYYY年MM月DD日(ddd)"
                    name=""
                  />
                )}
              </FormItemBox>
            </div>

            {/* 利用契約書 */}
            <div className="mx-5 lg:mx-10 w-full lg:w-5/6">
              <div className="font-medium">利用契約書</div>
              <FormItemBox
                name="basic.usageContract.store"
                label="格納有無"
                inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                  formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                }}
              >
                {(field) => (
                  <RadioItemBox field={field} fieldData={basicUsageContractStore} />
                )}
              </FormItemBox>
              <FormItemBox
                name="basic.usageContract.sign"
                label="サイン＋印"
                inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                  formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                }}
              >
                {(field) => (
                  <RadioItemBox field={field} fieldData={basicUsageContractSign} />
                )}
              </FormItemBox>
              <FormItemBox
                name="basic.usageContract.createdAt"
                label="作成日付"
                inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                  formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                }}
              >
                {(field) => (
                  <DatePicker
                    value={field.value  || null}
                    onChange={field.onChange}
                    mode="single"
                    placeholder="YYYY年MM月DD日(ddd)"
                    className="custom-datepicker content-center !mt-0"
                    inputClassName="custom-input"
                    format="YYYY年MM月DD日(ddd)"
                    name=""
                  />
                )}
              </FormItemBox>
            </div>
            {/* MEMO */}
            <div className="mx-5 lg:mx-10 w-full lg:w-5/6">
              <div className="font-medium">MEMO</div>
              <FormItemBox
                name="memo"
                label=""
                inputType="textarea"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                  formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                }}
              />
            </div>
          </div>

          {/* plan first */}
          <div className="w-full lg:w-1/2 space-y-3 lg:space-y-6">
            <div className="font-medium">初回個別支援計画</div>
            {/* 判定 */}
            <div className="mx-5 lg:mx-10 w-full lg:w-5/6" style={{ marginTop: 0 }}>
              <div>判定</div>
              <FormItemBox
                name="plan1st.judge" label="" disabled={true}
                className={{
                  formBox: 'mx-5 lg:mx-10',
                  formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                }}
              />
            </div>
            {/* 最遅作成日 */}
            <div className="mx-5 lg:mx-10 w-full lg:w-5/6">
              <div className="font-medium">最遅作成日</div>
              <FormItemBox
                name="plan1st.lastUpdatedAt"
                label=""
                inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                  formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                }}
              >
                {(field) => (
                  <DatePicker
                    value={field.value  || null}
                    onChange={field.onChange}
                    mode="single"
                    placeholder="YYYY年MM月DD日(ddd)"
                    className="custom-datepicker content-center !mt-0"
                    inputClassName="custom-input"
                    format="YYYY年MM月DD日(ddd)"
                    name=""
                  />
                )}
              </FormItemBox>
            </div>
            {/* 原案 */}
            <div className="mx-5 lg:mx-10 w-full lg:w-5/6">
              <div className="font-medium">原案</div>
              <FormItemBox
                name="plan1st.draft.store"
                label="格納有無"
                inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                  formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                }}
              >
                {(field) => (
                  <RadioItemBox field={field} fieldData={plan1stDraftStore} />
                )}
              </FormItemBox>
              <FormItemBox
                name="plan1st.draft.sign"
                label="サイン＋印"
                inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                  formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                }}
              >
                {(field) => (
                  <RadioItemBox field={field} fieldData={plan1stDraftSign} />
                )}
              </FormItemBox>
              <FormItemBox
                name="plan1st.draft.staff"
                label="サビ管名"
                inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                }}
              >
                {(field) => (
                  <Select field={field} selectList={staffs} classNameTrigger="w-full h-8 rounded-none border border-gray-300" />
                )}
              </FormItemBox>
              <FormItemBox
                name="plan1st.draft.createdAt"
                label="作成日付"
                inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                  formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                }}
              >
                {(field) => (
                  <DatePicker
                    value={field.value  || null}
                    onChange={field.onChange}
                    mode="single"
                    placeholder="YYYY年MM月DD日(ddd)"
                    className="custom-datepicker content-center !mt-0"
                    inputClassName="custom-input"
                    format="YYYY年MM月DD日(ddd)"
                    name=""
                  />
                )}
              </FormItemBox>
              {/* <FormItemBox
                name="plan1st.draft.fileId"
                label="ファイル"
                inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                }}
              >
                {(field) => (
                  <input
                    type="file"
                    disabled
                    className="w-full text-sm p-2 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                )}
              </FormItemBox> */}
            </div>

            {/* 担当者会議録 */}
            <div className="mx-5 lg:mx-10 w-full lg:w-5/6">
              <div className="font-medium">担当者会議録</div>
              <FormItemBox
                name="plan1st.meeting.store"
                label="格納有無"
                inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                  formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                }}
              >
                {(field) => (
                  <RadioItemBox field={field} fieldData={plan1stMeetingStore} />
                )}
              </FormItemBox>
              <FormItemBox
                name="plan1st.meeting.writeCheck"
                label="記入者名"
                inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                  formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                }}
              >
                {(field) => (
                  <RadioItemBox field={field} fieldData={plan1stMeetingWriteCheck} />
                )}
              </FormItemBox>
              <FormItemBox
                name="plan1st.meeting.createdAt"
                label="作成日付"
                inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                  formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                }}
              >
                {(field) => (
                  <DatePicker
                    value={field.value  || null}
                    onChange={field.onChange}
                    mode="single"
                    placeholder="YYYY年MM月DD日(ddd)"
                    className="custom-datepicker content-center !mt-0"
                    inputClassName="custom-input"
                    format="YYYY年MM月DD日(ddd)"
                    name=""
                  />
                )}
              </FormItemBox>
              {/* <FormItemBox
                name="plan1st.meeting.fileId"
                label="ファイル"
                inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                }}
              >
                {(field) => (
                  <input
                    type="file"
                    disabled
                    className="w-full text-sm p-2 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                )}
              </FormItemBox> */}
            </div>

            {/* 本案 */}
            <div className="mx-5 lg:mx-10 w-full lg:w-5/6">
              <div className="font-medium">本案</div>
              <FormItemBox
                name="plan1st.main.store"
                label="格納有無"
                inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                  formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                }}
              >
                {(field) => (
                  <RadioItemBox field={field} fieldData={plan1stMainStore} />
                )}
              </FormItemBox>
              <FormItemBox
                name="plan1st.main.sign"
                label="サイン＋印"
                inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                  formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                }}
              >
                {(field) => (
                  <RadioItemBox field={field} fieldData={plan1stMainSign} />
                )}
              </FormItemBox>
              <FormItemBox
                name="plan1st.main.staff"
                label="サビ管名"
                inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                }}
              >
                {(field) => (
                  <Select field={field} selectList={staffs} classNameTrigger="w-full h-8 rounded-none border border-gray-300" />
                )}
              </FormItemBox>
              <FormItemBox
                name="plan1st.main.createdAt"
                label="作成日付"
                inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                  formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                }}
              >
                {(field) => (
                  <DatePicker
                    value={field.value  || null}
                    onChange={field.onChange}
                    mode="single"
                    placeholder="YYYY年MM月DD日(ddd)"
                    className="custom-datepicker content-center !mt-0"
                    inputClassName="custom-input"
                    format="YYYY年MM月DD日(ddd)"
                    name=""
                  />
                )}
              </FormItemBox>
              {/* <FormItemBox
                name="plan1st.main.fileId"
                label="ファイル"
                inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                }}
              >
                {(field) => (
                  <input
                    type="file"
                    disabled
                    className="w-full text-sm p-2 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                )}
              </FormItemBox> */}
            </div>
          </div>
        </div>

        {/* action */}
        <PopupButtons title="保存" disabled={form.formState.isSubmitting} onClose={handleCancelClick} />
      </form>
    </FormReact>
  )
}
