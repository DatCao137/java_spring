import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/Form";
import { Button } from "@/components/ui/ButtonCus";

import { Post } from '@/features/blc-common/utils/ServerRequest';
import ErrorManager from "@/features/blc-common/utils/ErrorManager";
import { toast } from "react-toastify";
import { FormItemBox } from "../../../../../../../components/elements/form/FormItemBox";
import { SaveBillingDto } from "@/features/customer-management/types/Tenant";
import { formSchema } from "@/features/customer-management/validator/tenant/BillingFormSchema";
import { TenantBillingSave } from "@/features/blc-common/assets/ApiPath";
import { useContext, useState } from 'react';
import { TenantTabContext } from "../../Tabs";
import DatePicker from "@/components/elements/CalendarPicker";
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
  formData: SaveBillingDto;
}

export const FormDetail = ({ onCancelClick, formData }: props) => {
  const { setBillingInfo } = useContext(TenantTabContext);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
    shouldFocusError: true,
    reValidateMode: 'onChange',
})

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    Post({
      apiPath: TenantBillingSave,
      params: values,
      message: '顧客情報の基本情報を正常に保存しました',
      onSuccess: (res) => {
        setBillingInfo && setBillingInfo((prev: any) => ({
          ...prev, id: prev?.id === undefined ? res.data.data : undefined,
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
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="tab-form-sm space-y-8">
        <div className="grid grid-cols-12 gap:0 lg:gap-x-10 lg:gap-y-4 px-5">
          <FormItemBox
            name="movein1stAt"
            label="本入居分（初回）"
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
            name="originalRequestAt"
            label="口座振替依頼書原本発送"
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
            name="rpInputAt"
            label="口座振替RP入力"
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
            name="transfer1stAt"
            label="初回口座振替日"
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
            name="remark"
            label="備考"
            inputType="textarea"
            className={{
              formBox: 'col-span-12',
              formInput: 'rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            }}
          />
        </div>

        <PopupButtons title="保存" disabled={form.formState.isSubmitting} onClose={handleCancelClick} />
      </form>
    </Form>
  )
}
