import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form as FormReact} from "@/components/ui/Form";
import { Button } from "@/components/ui/ButtonCus";

import { Post } from '@/features/blc-common/utils/ServerRequest';
import ErrorManager from "@/features/blc-common/utils/ErrorManager";
import { toast } from "react-toastify";
import { FormItemBox } from "../../../../../../../components/elements/form/FormItemBox";
import { SaveBillingDetailDto } from "@/features/customer-management/types/Tenant";
import { TenantBillingDetailSave } from "@/features/blc-common/assets/ApiPath";
import { formSchema } from "@/features/customer-management/validator/tenant/BillingDetailFormSchema";
import { useContext } from "react";
import { TenantMainContext } from "@/features/customer-management/pages/TenantMain";
import { TenantTabContext } from "../../Tabs";
import DatePicker from "@/components/elements/CalendarPicker";
import { formatJPDate } from "@/utils/DateUtils";
import { PopupButtons } from "@/components/elements/PopupButtons";

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
  formData: SaveBillingDetailDto;
}

export const Form = ({ onCancelClick, formData }: props) => {
  const { setBillingInfo } = useContext(TenantTabContext);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
    shouldFocusError: true,
    reValidateMode: 'onChange',
})

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const saveData = {
        ...values,
        yyyymm: values.yyyymm ? formatJPDate(values.yyyymm, "YYYYMM") : null
    };

    Post({
      apiPath: TenantBillingDetailSave,
      params: saveData,
      message: '顧客情報の基本情報を正常に保存しました',
      onSuccess: (res) => {
        setBillingInfo && setBillingInfo((prev: any) => ({
          ...prev, id: prev?.id === undefined ? res.data.data?.billingId : undefined,
        }));
        form.reset();
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

  return (
    <FormReact {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="tab-form-sm space-y-8">
        <div className="grid grid-cols-12 gap:0 lg:gap-x-10 lg:gap-y-4 px-5">
          <FormItemBox
            name="yyyymm"
            label="提供月"
            inputType="other"
            className={{
              formBox: 'col-span-12 lg:col-span-12',
              formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
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

          <FormItemBox
            name="nationalAt"
            label="国保連(※)"
            inputType="other"
            className={{
              formBox: 'col-span-12 lg:col-span-12',
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

          <FormItemBox
            name="selfGoverningAt"
            label="自治単独加算等(※)"
            inputType="other"
            className={{
              formBox: 'col-span-12 lg:col-span-12',
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

          <FormItemBox
            name="otherAt"
            label="その他助成金等(※)"
            inputType="other"
            className={{
              formBox: 'col-span-12 lg:col-span-12',
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

          <FormItemBox
            name="issueAt"
            label="利用料請求(発行日付)"
            inputType="other"
            className={{
              formBox: 'col-span-12 lg:col-span-12',
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

          <FormItemBox
            name="memo"
            label="メモ"
            inputType="textarea"
            className={{
              formBox: 'col-span-12',
              formInput: 'rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            }}
          />
        </div>
        <PopupButtons title="保存" disabled={form.formState.isSubmitting} onClose={handleCancelClick} />
      </form>
    </FormReact>
  )
}
