import { Button } from "@/components/ui/ButtonCus";
import { Form } from "@/components/ui/Form";
import { formSchema, SaveCustomerMedicalOrCareDetailRequest } from "@/features/customer-management/validator/tenant/CustomerMedicalOrCareDetailSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormItemBox } from "../../../../../../../components/elements/form/FormItemBox";
import { Select } from "@/components/elements/form/Controls";
import { useSelectList } from "@/features/customer-management/contexts/SelectListContext";
import { showErrors } from "./CustomerForm";
import { Post } from '@/features/blc-common/utils/ServerRequest';
import { useContext } from "react";
import { TenantCareDetailSave, TenantMedicalDetailSave } from "@/features/blc-common/assets/ApiPath";
import { TenantTabContext } from "../../Tabs";
import { PopupButtons } from "@/components/elements/PopupButtons";

type props = {
  formData: SaveCustomerMedicalOrCareDetailRequest;
  onCancelClick?: () => void;
  isTab1?: boolean;
}

export const InsuranceServiceForm = ({ formData, onCancelClick, isTab1 = true }: props) => {
  const { selectListData } = useSelectList();
  const paces = selectListData.get('cust_service_pace')?.filter((e) => e.value) || [];
  const statuses = selectListData.get('cust_service_status')?.filter((e) => e.value) || [];
  const { setMedical, setCare } = useContext(TenantTabContext);

  const form = useForm<SaveCustomerMedicalOrCareDetailRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
    reValidateMode: 'onChange',
  })

  async function onSubmit(values: SaveCustomerMedicalOrCareDetailRequest) {
    const saveApi = isTab1 ? TenantMedicalDetailSave : TenantCareDetailSave;
    Post({
      apiPath: saveApi,
      params: values,
      message: '顧客情報の基本情報を正常に保存しました',
      onSuccess: (res) => {
        form.reset();
        isTab1 ? setMedical((prev: any) => ({
          ...prev, id: undefined
        })) : setCare((prev: any) => ({
          ...prev, id: undefined
        }));
        onCancelClick && onCancelClick();
      },
      onValidation: (err) => {
        showErrors(err, form);
      }
    });
  }

  const handleCancelClick = () => {
    // Reset form values to default
    form.reset();
    onCancelClick && onCancelClick();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="tab-form-sm space-y-8">
        <div className="grid grid-cols-12 gap-y-4 px-5">
          <FormItemBox
            name="serviceName"
            label="利用サービス"
            className={{
              formBox: 'col-span-12',
              formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            }}
          />
          {isTab1 ? (
            <FormItemBox
              name="institution"
              label="利用機関"
              className={{
                formBox: 'col-span-12',
                formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
              }}
            />
          ) : (
            <FormItemBox
              name="useCompany"
              label="利用事業者"
              className={{
                formBox: 'col-span-12',
                formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
              }}
            />
          )}
          <FormItemBox
            name="status"
            label="ステータス"
            inputType="other"
            className={{
              formBox: 'col-span-12',
              formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            }}
          >
            {(field) => (
              <Select field={field} selectList={statuses} classNameTrigger="w-full h-8 rounded-none border border-gray-300" />
            )}
          </FormItemBox>
          <FormItemBox
            name="pace"
            label="利用頻度"
            inputType="other"
            className={{
              formBox: 'col-span-12',
              formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            }}
          >
            {(field) => (
              <Select field={field} selectList={paces} classNameTrigger="w-full h-8 rounded-none border border-gray-300" />
            )}
          </FormItemBox>
        </div>
        <PopupButtons title="保存" disabled={form.formState.isSubmitting} onClose={handleCancelClick} />
      </form>
    </Form>
  )
}
