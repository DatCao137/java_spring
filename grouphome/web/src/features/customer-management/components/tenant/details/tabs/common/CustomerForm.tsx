import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/Form";
import { Button } from "@/components/ui/ButtonCus";
import { formSchema } from "@/features/customer-management/validator/tenant/CustomerFormSchema";
import { useSelectList } from "@/features/customer-management/contexts/SelectListContext";
import { Post } from '@/features/blc-common/utils/ServerRequest';
import ErrorManager from "@/features/blc-common/utils/ErrorManager";
import { toast } from "react-toastify";
import { FormItemBox } from "../../../../../../../components/elements/form/FormItemBox";
import { getAge } from "@/utils/DateUtils";
import { RadioItemBox } from "../../../../../../../components/elements/form/RadioItemBox";
import { Select } from "@/components/elements/form/Controls";
import { FormData } from "@/features/customer-management/types/Tenant";
import { TenantSave as saveApi } from "@/features/blc-common/assets/ApiPath";
import DatePicker from "@/components/elements/CalendarPicker";

export const showErrors = (error: any, form: any) => {
  const data = error.response.data;

  toast.error(data.message);

  const errors: Record<string, string> | undefined = ErrorManager.getErrors(data);

  if (errors) { //set form errors
    Object.entries(errors).forEach(([key, value]) => {
      form?.setError(key as keyof z.infer<typeof formSchema>, { message: value }, {
        shouldFocus: true,
      });
    });
  }
}

type props = {
  onCancelClick: () => void;
  formData: FormData;
}

export const CustomerForm = ({ onCancelClick, formData }: props) => {
  const { selectListData } = useSelectList();
  const supportTypes = selectListData.get('support_type')?.filter((e) => e.value) || [];
  const servicePaces = selectListData.get('cust_service_pace')?.filter((e) => e.value) || [];
  const sexes = selectListData.get('sex')?.filter((e) => e.value) || [];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
    shouldFocusError: true,
    reValidateMode: 'onChange',
  })

  const [
    detailsMentallyDisabled,
    detailsSeverelyDisabled,
    detailsBehavioralDisorder,
    detailsHomeCare,
    personalBirthday,
    personalSex,
  ] = form.watch([
    'details.mentallyDisabled',
    'details.severelyDisabled',
    'details.behavioralDisorder',
    'details.homeCare',
    'personal.birthDay',
    'personal.sex',
  ]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    Post({
      apiPath: saveApi,
      params: values,
      message: '顧客情報の基本情報を正常に保存しました',
      onSuccess: (res) => {
        form.reset();
        onCancelClick();
      },
      onValidation: (err) => {
        showErrors(err, form);
      }
    });
  }

  const handleCancelClick = () => {
    // Reset form values to default
    form.reset();
    onCancelClick();
  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 gap:0 lg:gap-x-10 lg:gap-y-4 px-5">

          {/* line addition:  */}
          <FormItemBox
            name="name"
            label="氏名"
            className={{
              formBox: 'col-span-12 lg:col-span-6',
              // formItem: 'flex flex-row items-start space-x-2 justify-between',
              // formLabel: 'w-1/2 mt-2 leading-normal',
              // formOuterControl: 'flex flex-col w-1/2 space-y-2',
              formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            }}
          />
          <FormItemBox
            name="personal.sex"
            label="性別"
            inputType="other"
            className={{
              formBox: 'col-span-12 lg:col-span-6',
              formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            }}
          >
            {(field) => (
              <RadioItemBox field={field} fieldData={personalSex} options={sexes} isBoolean={false} />
            )}
          </FormItemBox>

          {/* line addition:  */}
          <FormItemBox
            name="nameGana"
            label="氏名(ふりがな)"
            className={{
              formBox: 'col-span-12 lg:col-span-6',
              formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            }}
          />
          <FormItemBox
            name="personal.birthDay"
            label="生年月日"
            inputType="other"
            className={{
              formBox: 'col-span-12 lg:col-span-6',
              formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            }}
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

          {/* line 1:  ニックネーム*/}
          <FormItemBox
            name="personal.nickname"
            label="ニックネーム"
            className={{
              formBox: 'col-span-12 lg:col-span-6',
              formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            }}
          />
          <FormItemBox
            name="age"
            label="年齢"
            inputType="other"
            className={{
              formBox: 'col-span-12 lg:col-span-6',
              formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            }}
          >
            {(field) => (
              <input
                disabled
                type="text"
                value={getAge(String(personalBirthday)  || null)?.toString() || ''}
                className="px-2 w-full h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            )}
          </FormItemBox>

          {/* line 2:  生年月日*/}
          <FormItemBox
            name="details.usedOffice"
            label="利用事業所名"
            className={{
              formBox: 'col-span-12 lg:col-span-6',
              formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            }}
          />
          <FormItemBox
            name="details.usedPace"
            label="利用頻度／週"
            inputType="other"
            className={{
              formBox: 'col-span-12 lg:col-span-6',
              formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            }}
          >
            {(field) => (
              <Select field={field} selectList={servicePaces} classNameTrigger="w-full h-8 rounded-none border border-gray-300" />
            )}
          </FormItemBox>

          {/* line 3:  障害支援区分*/}
          <FormItemBox
            name="category"
            label="障害支援区分"
            inputType="other"
            className={{
              formBox: 'col-span-12 lg:col-span-6',
              formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            }}
          >
            {(field) => (
              <Select field={field} selectList={supportTypes} classNameTrigger="w-full h-8 rounded-none border border-gray-300" />
            )}
          </FormItemBox>
          <FormItemBox
            name="details.beforePlace"
            label="入居前の生活場所"
            className={{
              formBox: 'col-span-12 lg:col-span-6',
              formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            }}
          />

          {/* line 4:  生年月日*/}
          <FormItemBox
            name="details.disabilityType"
            label="障害種別と特性（症状名等）"
            className={{
              formBox: 'col-span-12 lg:col-span-6',
              formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            }}
          />
          <FormItemBox
            name="details.beforeOffice"
            label="入居前の居住系利用サービス事業所名①"
            className={{
              formBox: 'col-span-12 lg:col-span-6',
              formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            }}
          />

          {/* line 5:  生年月日*/}
          <FormItemBox
            name="details.mentallyDisabled"
            label="精神障害者地域移行特別加算対象の有無、他"
            inputType="other"
            className={{
              formBox: 'col-span-12 lg:col-span-6',
              formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            }}
          >
            {(field) => (
              <RadioItemBox field={field} fieldData={detailsMentallyDisabled} />
            )}
          </FormItemBox>
          <FormItemBox
            name="details.beforeService2"
            label="入居前の利用福祉サービス②"
            className={{
              formBox: 'col-span-12 lg:col-span-6',
              formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            }}
          />

          {/* line 6:  生年月日*/}
          <FormItemBox
            name="details.severelyDisabled"
            label="重度障害者支援加算の対象有無"
            inputType="other"
            className={{
              formBox: 'col-span-12 lg:col-span-6',
              formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            }}
          >
            {(field) => (
              <RadioItemBox field={field} fieldData={detailsSeverelyDisabled} />
            )}
          </FormItemBox>
          <FormItemBox
            name="details.beforeServiceOffice2"
            label="入居前の利用サービス事業所名"
            className={{
              formBox: 'col-span-12 lg:col-span-6',
              formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            }}
          />

          {/* line 7:  生年月日*/}
          <FormItemBox
            name="details.behavioralDisorder"
            label="強度行動障害支援者対象の有無"
            inputType="other"
            className={{
              formBox: 'col-span-12 lg:col-span-6',
              formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            }}
          >
            {(field) => (
              <RadioItemBox field={field} fieldData={detailsBehavioralDisorder} />
            )}
          </FormItemBox>
          <FormItemBox
            name="details.beforeService3"
            label="入居前の利用福祉サービス③"
            className={{
              formBox: 'col-span-12 lg:col-span-6',
              formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            }}
          />

          {/* line 8:  生年月日*/}
          <FormItemBox
            name="details.homeCare"
            label="個人単位で居宅介護の利用有無"
            inputType="other"
            className={{
              formBox: 'col-span-12 lg:col-span-6',
              formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            }}
          >
            {(field) => (
              <RadioItemBox field={field} fieldData={detailsHomeCare} />
            )}
          </FormItemBox>
          <FormItemBox
            name="details.beforeServiceOffice3"
            label="入居前の利用サービス事業所名"
            className={{
              formBox: 'col-span-12 lg:col-span-6',
              formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            }}
          />

          <FormItemBox
            name="details.memo"
            label="MEMO"
            inputType="textarea"
            className={{
              formBox: 'col-span-12',
              formInput: 'rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            }}
          />
        </div>

        <div className="mt-5 mb-2 flex justify-end gap-5 px-4">
          <Button
            type="button" size={'sm'}
            className="w-[120px] bg-red-400 hover:bg-red-600"
            onClick={handleCancelClick}
          >
            キャンセル
          </Button>
          <Button
            type="submit" size={'sm'}
            className="w-[120px] bg-blue-400 hover:bg-blue-600"
            disabled={form.formState.isSubmitting}
          >
            保存
          </Button>
        </div>
      </form>
    </Form>
  )
}
