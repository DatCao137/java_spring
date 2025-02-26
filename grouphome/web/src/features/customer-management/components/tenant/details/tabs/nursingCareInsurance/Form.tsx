import { Button } from "@/components/ui/ButtonCus";
import { Form as FormReact} from "@/components/ui/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormItemBox } from "../../../../../../../components/elements/form/FormItemBox";
import { Select } from "@/components/elements/form/Controls";
import { useSelectList } from "@/features/customer-management/contexts/SelectListContext";
import { Post } from '@/features/blc-common/utils/ServerRequest';
import { showErrors } from "../common/CustomerForm";
import { TenantCareSave as saveApi } from "@/features/blc-common/assets/ApiPath";
import { useContext } from "react";
import { TenantTabContext } from "../../Tabs";
import { careSchema, SaveCustomerCareRequestDto } from "@/features/customer-management/validator/tenant/CustomerCareSchema";
import { formatCurrency } from "@/utils/Helper";
import { PopupButtons } from "@/components/elements/PopupButtons";

type props = {
  formData: SaveCustomerCareRequestDto;
  onCancelClick: () => void;
}

export const Form = ({ formData, onCancelClick }: props) => {
  const { selectListData } = useSelectList();
  const careTypes = selectListData.get('care_type')?.filter((e) => e.value) || [];
  const { setCare } = useContext(TenantTabContext);

  const form = useForm<SaveCustomerCareRequestDto>({
    resolver: zodResolver(careSchema),
    defaultValues: formData,
  })

  async function onSubmit(values: SaveCustomerCareRequestDto) {
    Post({
      apiPath: saveApi,
      params: values,
      message: '顧客情報の基本情報を正常に保存しました',
      onSuccess: (res) => {
        setCare && setCare((prev: any) => ({
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
    // Reset form values to default
    form.reset();
    onCancelClick();
  }

  return (
    <FormReact {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="tab-form-xs space-y-8">
        <div className="grid grid-cols-12 gap-y-4 px-5">
          <FormItemBox
            name="careNo"
            label="介護保険被保険者証（番号）"
            className={{
              formBox: 'col-span-12',
              formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            }}
          />
          <FormItemBox
            name="careTypeId"
            label="要介護区分"
            inputType="other"
            className={{
              formBox: 'col-span-12',
              formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            }}
          >
            {(field) => (
              <Select field={field} selectList={careTypes} classNameTrigger="w-full h-8 rounded-none border border-gray-300" />
            )}
          </FormItemBox>
          <FormItemBox
            name="limit"
            label="支給限度額"
            inputType="other"
            className={{
              formBox: 'col-span-12',
            }}
          >
            {(field) => (
              <input
                type="text"
                onChange={(v) => field.onChange(+v.target.value?.replace(/[^[0-9]/g, ''))}
                value={formatCurrency(field.value)}
                className="w-full h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            )}
          </FormItemBox>
        </div>
        <PopupButtons title="保存" disabled={form.formState.isSubmitting} onClose={handleCancelClick} />
      </form>
    </FormReact>
  )
}
