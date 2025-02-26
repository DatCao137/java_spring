import { Button } from "@/components/ui/ButtonCus";
import { Form as FormReact} from "@/components/ui/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormItemBox } from "../../../../../../../components/elements/form/FormItemBox";
import { Select } from "@/components/elements/form/Controls";
import { useSelectList } from "@/features/customer-management/contexts/SelectListContext";
import { Post } from '@/features/blc-common/utils/ServerRequest';
import { showErrors } from "../common/CustomerForm";
import { TenantHandbookSave as saveApi } from "@/features/blc-common/assets/ApiPath";
import { useContext } from "react";
import { TenantTabContext } from "../../Tabs";
import { formSchema, SaveCustomerHandbookStatusRequestDto } from "@/features/customer-management/validator/tenant/CustomerHandbookStatusSchema";
import { RadioItemBox } from "../../../../../../../components/elements/form/RadioItemBox";
import DatePicker from "@/components/elements/CalendarPicker";
import { PopupButtons } from "@/components/elements/PopupButtons";

type props = {
  formData: SaveCustomerHandbookStatusRequestDto;
  onCancelClick: () => void;
}

export const Form = ({ formData, onCancelClick }: props) => {
  const { selectListData } = useSelectList();
  const categories = selectListData.get('support_type')?.filter((e) => e.value) || [];
  const { setHandbook } = useContext(TenantTabContext);

  const form = useForm<SaveCustomerHandbookStatusRequestDto>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  })

  async function onSubmit(values: SaveCustomerHandbookStatusRequestDto) {
    Post({
      apiPath: saveApi,
      params: values,
      message: '顧客情報の基本情報を正常に保存しました',
      onSuccess: (res) => {
        setHandbook && setHandbook((prev: any) => ({
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

  const [
    certificateGH,
  ] = form.watch(['recipient.certificateGH']);

  return (
    <FormReact {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="tab-form-xl space-y-8">
        <div className="grid grid-cols-12 gap:0 lg:gap-x-10 gap-y-4 px-5">
          <FormItemBox
            name="recipient.no"
            label="受給者番号"
            className={{
              formBox: 'col-span-12 lg:col-span-6',
              formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            }}
          />
          <FormItemBox
            name="visitingPlace"
            label="通所先"
            className={{
              formBox: 'col-span-12 lg:col-span-6',
              formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            }}
          />
          <FormItemBox
            name="recipient.certificateGH"
            label="受給者証（GH支給決定を受けたもの）"
            inputType="other"
            className={{
              formBox: 'col-span-12 lg:col-span-6',
              formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            }}
          >
            {(field) => (
              <RadioItemBox field={field} fieldData={certificateGH} />
            )}
          </FormItemBox>
          <FormItemBox
            name="service"
            label="何の支給決定（他サービス）を受けているか"
            className={{
              formBox: 'col-span-12 lg:col-span-6',
              formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            }}
          />
          <FormItemBox
            name="recipient.limit"
            label="支給決定期限"
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
          <FormItemBox
            name="handbookType"
            label="障がい者手帳"
            className={{
              formBox: 'col-span-12 lg:col-span-6',
              formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            }}
          />
          <FormItemBox
            name="disabled.category"
            label="障害者支援区分"
            inputType="other"
            className={{
              formBox: 'col-span-12 lg:col-span-6',
              formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            }}
          >
            {(field) => (
              <Select field={field} selectList={categories} classNameTrigger="w-full h-8 rounded-none border border-gray-300" />
            )}
          </FormItemBox>
          <FormItemBox
            name="limit.amount"
            label="上限額管理"
            type="number"
            className={{
              formBox: 'col-span-12 lg:col-span-6',
              formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            }}
          />
          <FormItemBox
            name="disabled.limit"
            label="認定期限"
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
          <FormItemBox
            name="limit.limit"
            label="上限額管理期限"
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
        </div>

        {/* action */}
        <PopupButtons title="保存" disabled={form.formState.isSubmitting} onClose={handleCancelClick} />
      </form>
    </FormReact>
  )
}
