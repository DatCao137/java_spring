import { Button } from "@/components/ui/ButtonCus";
import { Form as  FormReact} from "@/components/ui/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormItemBox } from "../../../../../../../components/elements/form/FormItemBox";
import { SelectListResponseDto, useSelectList } from "@/features/customer-management/contexts/SelectListContext";
import { Post } from '@/features/blc-common/utils/ServerRequest';
import { showErrors } from "../common/CustomerForm";
import { TenantMonitoringSave as saveApi } from "@/features/blc-common/assets/ApiPath";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { TenantTabContext } from "../../Tabs";
import { RadioItemBox } from "../../../../../../../components/elements/form/RadioItemBox";
import { TenantMainContext } from "@/features/customer-management/pages/TenantMain";
import { Select } from "@/components/elements/form/Controls";
import { getStaffByBranchId } from "../moveinDocumentStatus/Tab";
import { formSchema, SaveCustomerMonitoringRequestDto } from "@/features/customer-management/validator/tenant/CustomerMonitoringSchema";
import { formatJPDate } from "@/utils/DateUtils";
import dayjs from "dayjs";
import DatePicker from "@/components/elements/CalendarPicker";
import { PopupButtons } from "@/components/elements/PopupButtons";

type props = {
  formData: SaveCustomerMonitoringRequestDto;
  onCancelClick: () => void;
  setSeq?: Dispatch<SetStateAction<number>>;
}

export const Form = ({ formData, onCancelClick, setSeq }: props) => {
  const { userAgent } = useContext(TenantTabContext);
  const { detailBasic } = useContext(TenantMainContext);
  const [staffs, setStaffs] = useState<SelectListResponseDto[]>([]);
  const { selectListData } = useSelectList();
  const continueOptions = selectListData.get('continue_or_change')?.filter((e) => e.value) || [];

  const form = useForm<SaveCustomerMonitoringRequestDto>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  })

  async function onSubmit(values: SaveCustomerMonitoringRequestDto) {
    const saveData = {
      ...values,
      yyyymm: values.yyyymm ? formatJPDate(String(values.yyyymm), "YYYYMM") : null
    };
    Post({
      apiPath: saveApi,
      params: saveData,
      message: '顧客情報の基本情報を正常に保存しました',
      onSuccess: (res) => {
        form.reset();
        setSeq && setSeq((prev) => prev + 1);
        onCancelClick();
      },
      onValidation: (err) => {
        showErrors(err, form);
      }
    });
  }

  const handleCancelClick = () => {
    form.reset();
    onCancelClick();
  }

  const [
    lastUpdatedAt,
    monitoringStore,
    monitoringSign,
    draftStore,
    draftSign,
    meetingStore,
    meetingWriteCheck,
    mainStore,
    mainSign,
    planStart,
  ] = form.watch([
    'info.lastUpdatedAt',
    'info.monitoring.store',
    'info.monitoring.sign',
    'info.draft.store',
    'info.draft.sign',
    'info.meeting.store',
    'info.meeting.writeCheck',
    'info.main.store',
    'info.main.sign',
    'info.plan.start',
  ]);

  useEffect(() => {
    const getStaffs = async () => {
      const staffs: SelectListResponseDto[] = await getStaffByBranchId(detailBasic?.branchId || -1, true);
      setStaffs(staffs);
    }

    getStaffs();
  }, [])

  return (
    <FormReact {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* info plan : 計画 - タイトル */}
        <div className="w-full mx-5 lg:mx-10 space-y-3 lg:space-y-6">
          <div className="w-full flex-none lg:flex">
            <div className="w-full lg:w-1/3">
              <div className="font-medium">最遅作成日</div>
              <FormItemBox
                name="info.lastUpdatedAt" label="" inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
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
            <div className="w-full lg:w-1/3">
              <div className="font-medium">対象年月</div>
              <FormItemBox
                name="yyyymm" label="" inputType={userAgent === "firefox" ? "input" : "other"}
                className={{
                  formBox: 'mx-5 lg:mx-10',
                  formInput: userAgent === 'firefox' ? 'w-full h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0' : '',
                }}
              >
                {(field) => (
                  <DatePicker
                    value={field.value  || null}
                    onChange={field.onChange}
                    mode="single"
                    placeholder="YYYY年MM月"
                    className="custom-datepicker content-center !mt-0"
                    inputClassName="custom-input"
                    format="YYYY年MM月"
                    name=""
                    viewMode="month"
                  />
                )}
              </FormItemBox>
            </div>
          </div>
          <div className="w-full">
            <div className="font-medium">計画</div>
            <div className="flex-none lg:flex gap-x-0 lg:gap-x-5 px-5 lg:px-10 mr-0 lg:mr-10">
              <div className="w-full lg:w-1/3">
                <FormItemBox
                  name="info.plan.season" label="時期"
                  className={{
                    formInput: 'w-full h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                  }}
                />
              </div>
              <div className="w-full lg:w-1/3">
                <FormItemBox
                  name="info.plan.start" label="開始" inputType="other"
                >
                  {(field) => (
                    <DatePicker
                      value={field.value  || null}
                      onChange={field.onChange}
                      mode="single"
                      placeholder="YYYY年MM月DD日"
                      className="custom-datepicker content-center !mt-0"
                      inputClassName="custom-input"
                      format="YYYY年MM月DD日"
                      name=""
                    />
                  )}
                </FormItemBox>
              </div>
              <div className="w-full lg:w-1/3">
                <FormItemBox
                  name="info.plan.end" label="終了" inputType="other"
                >
                  {(field) => (
                    <DatePicker
                      value={field.value  || null}
                      onChange={field.onChange}
                      mode="single"
                      placeholder="YYYY年MM月DD日"
                      className="custom-datepicker content-center !mt-0"
                      inputClassName="custom-input"
                      format="YYYY年MM月DD日"
                      name=""
                    />
                  )}
                </FormItemBox>
              </div>
            </div>
          </div>
        </div>

        {/* info other */}
        <div className="flex-none lg:flex">
          {/* left */}
          <div className="w-full lg:w-1/2 space-y-3 lg:space-y-6">
            {/* モニタリング */}
            <div className="mx-5 lg:mx-10 w-full lg:w-5/6" style={{ marginTop: 0 }}>
              <div className="font-medium">モニタリング</div>
              <FormItemBox
                name="info.monitoring.store"
                label="格納有無"
                inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                }}
              >
                {(field) => (
                  <RadioItemBox field={field} fieldData={monitoringStore} />
                )}
              </FormItemBox>
              <FormItemBox
                name="info.monitoring.sign"
                label="サイン＋印"
                inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                }}
              >
                {(field) => (
                  <RadioItemBox field={field} fieldData={monitoringSign} />
                )}
              </FormItemBox>
              <FormItemBox
                name="info.monitoring.continueValue"
                label="継続是非"
                inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                }}
              >
                {(field) => (
                  <Select field={field} selectList={continueOptions} classNameTrigger="w-full h-8 rounded-none border border-gray-300" />
                )}
              </FormItemBox>
              <FormItemBox
                name="info.monitoring.createdAt"
                label="作成日付"
                inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
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
                name="info.monitoring.fileId" label="ファイル" inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                }}
              >
                {(field) => (
                  <input
                    type="file"
                    disabled
                    className="w-full text-sm px-2 h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                )}
              </FormItemBox> */}
            </div>
            {/* 担当者会議録 */}
            <div className="mx-5 lg:mx-10 w-full lg:w-5/6">
              <div className="font-medium">担当者会議録</div>
              <FormItemBox
                name="info.meeting.store"
                label="格納有無"
                inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                }}
              >
                {(field) => (
                  <RadioItemBox field={field} fieldData={meetingStore} />
                )}
              </FormItemBox>
              <FormItemBox
                name="info.meeting.writeCheck"
                label="記入者名"
                inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                }}
              >
                {(field) => (
                  <RadioItemBox field={field} fieldData={meetingWriteCheck} />
                )}
              </FormItemBox>
              <FormItemBox
                name="info.meeting.createdAt"
                label="作成日付"
                inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
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
                name="info.meeting.fileId" label="ファイル" inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                  formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                }}
              >
                {(field) => (
                  <input
                    type="file"
                    disabled
                    className="w-full text-sm px-2 h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                )}
              </FormItemBox> */}
            </div>
          </div>

          {/* right */}
          <div className="w-full lg:w-1/2 space-y-3 lg:space-y-6">
            {/* 原案 */}
            <div className="mx-5 lg:mx-10 w-full lg:w-5/6" style={{ marginTop: 0 }}>
              <div className="font-medium">原案</div>
              <FormItemBox
                name="info.draft.store"
                label="格納有無"
                inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                }}
              >
                {(field) => (
                  <RadioItemBox field={field} fieldData={draftStore} />
                )}
              </FormItemBox>
              <FormItemBox
                name="info.draft.sign"
                label="サイン＋印"
                inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                }}
              >
                {(field) => (
                  <RadioItemBox field={field} fieldData={draftSign} />
                )}
              </FormItemBox>
              <FormItemBox
                name="info.draft.staff"
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
                name="info.draft.createdAt"
                label="作成日付"
                inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
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
                name="info.draft.fileId" label="ファイル" inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                }}
              >
                {(field) => (
                  <input
                    type="file"
                    disabled
                    className="w-full text-sm px-2 h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                )}
              </FormItemBox> */}
            </div>

            {/* 本案 */}
            <div className="mx-5 lg:mx-10 w-full lg:w-5/6">
              <div className="font-medium">本案</div>
              <FormItemBox
                name="info.main.store"
                label="格納有無"
                inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                }}
              >
                {(field) => (
                  <RadioItemBox field={field} fieldData={mainStore} />
                )}
              </FormItemBox>
              <FormItemBox
                name="info.main.sign"
                label="サイン＋印"
                inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                }}
              >
                {(field) => (
                  <RadioItemBox field={field} fieldData={mainSign} />
                )}
              </FormItemBox>
              <FormItemBox
                name="info.main.staff"
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
                name="info.main.createdAt"
                label="作成日付"
                inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
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
                name="info.main.fileId" label="ファイル" inputType="other"
                className={{
                  formBox: 'mx-5 lg:mx-10',
                }}
              >
                {(field) => (
                  <input
                    type="file"
                    disabled
                    className="w-full text-sm px-2 h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
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
