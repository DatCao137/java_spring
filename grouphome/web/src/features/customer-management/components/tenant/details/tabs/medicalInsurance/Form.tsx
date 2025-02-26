import { Button } from "@/components/ui/ButtonCus";
import { Form as FormReact} from "@/components/ui/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormItemBox } from "../../../../../../../components/elements/form/FormItemBox";
import { Select } from "@/components/elements/form/Controls";
import { useSelectList } from "@/features/customer-management/contexts/SelectListContext";
import { Post } from '@/features/blc-common/utils/ServerRequest';
import { showErrors } from "../common/CustomerForm";
import { TenantMedicalSave as saveApi } from "@/features/blc-common/assets/ApiPath";
import { useContext } from "react";
import { TenantTabContext } from "../../Tabs";
import { formSchema, SaveCustomerMedicalRequestDto } from "@/features/customer-management/validator/tenant/CustomerMedicalSchema";
import { PopupButtons } from "@/components/elements/PopupButtons";

type props = {
  formData: SaveCustomerMedicalRequestDto;
  onCancelClick: () => void;
}

export const Form = ({ formData, onCancelClick }: props) => {
  const { selectListData } = useSelectList();
  const insuranceTypes = selectListData.get('insurance_type')?.filter((e) => e.value) || [];
  const { setMedical } = useContext(TenantTabContext);

  const form = useForm<SaveCustomerMedicalRequestDto>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  })

  async function onSubmit(values: SaveCustomerMedicalRequestDto) {
    Post({
      apiPath: saveApi,
      params: values,
      message: '顧客情報の基本情報を正常に保存しました',
      onSuccess: (res) => {
        setMedical && setMedical((prev: any) => ({
          ...prev, id: prev?.id === undefined ? res.data.data.id : undefined,
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
            name="insuranceTypeId"
            label="保険証種別"
            inputType="other"
            className={{
              formBox: 'col-span-12',
              formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            }}
          >
            {(field) => (
              <Select field={field} selectList={insuranceTypes} classNameTrigger="w-full h-8 rounded-none border border-gray-300" />
            )}
          </FormItemBox>
          <FormItemBox
            name="number"
            label="記号-番号-枝番（半角）"
            className={{
              formBox: 'col-span-12',
              formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            }}
          />
        </div>
        <PopupButtons title="保存" disabled={form.formState.isSubmitting} onClose={handleCancelClick} />
      </form>
    </FormReact>
  )
}
