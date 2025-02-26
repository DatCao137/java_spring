import { Button } from "@/components/ui/ButtonCus";
import { Form as FormReact} from "@/components/ui/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { FormItemBox } from "../../../../../../../components/elements/form/FormItemBox";
import { Post } from '@/features/blc-common/utils/ServerRequest';
import { showErrors } from "../common/CustomerForm";
import { TenantDocumentSave as saveApi } from "@/features/blc-common/assets/ApiPath";
import { useContext } from "react";
import { TenantTabContext } from "../../Tabs";
import { RadioItemBox } from "../../../../../../../components/elements/form/RadioItemBox";
import { formSchema, MonitoringDto, SaveCustomerDocumentStatusRequestDto } from "@/features/customer-management/validator/tenant/CustomerDocumentStatusSchema";
import { PlusIcon } from "lucide-react";
import { FormMonitoring } from "./FormMonitoring";
import { PopupButtons } from "@/components/elements/PopupButtons";

type props = {
  formData: SaveCustomerDocumentStatusRequestDto;
  onCancelClick: () => void;
}

export const Form = ({ formData, onCancelClick }: props) => {
  const { setDocument } = useContext(TenantTabContext);

  const form = useForm<SaveCustomerDocumentStatusRequestDto>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  })

  async function onSubmit(values: SaveCustomerDocumentStatusRequestDto) {
    Post({
      apiPath: saveApi,
      params: values,
      message: '顧客情報の基本情報を正常に保存しました',
      onSuccess: (res) => {
        setDocument && setDocument((prev: any) => ({
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
    tourApply,
    assessmentApply,
    trialApply,
    trialImportantExperienceApply,
    usageContractApply,
    importantExperienceApply,
    planApply
  ] = form.watch([
    'tour.apply',
    'assessment.apply',
    'trial.apply',
    'trialImportantExperience.apply',
    'usageContract.apply',
    'importantExperience.apply',
    'plan.apply'
  ]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'monitoring',
  });

  const addMonitoringItem = (index: number) => {
    append({
      id: index + 1,
      apply: undefined,
      fileId: undefined,
    });
  }

  return (
    <FormReact {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="tab-form-xl space-y-8">
        <div className="grid grid-cols-12">
          {/* left */}
          <div className="col-span-12 xl:col-span-6 grid grid-cols-12 gap:0 lg:gap-x-5 gap-y-4 px-5">
            <FormItemBox
              name="tour.apply"
              label="見学申込書"
              inputType="other"
              className={{
                formBox: 'col-span-12 lg:col-span-6',
                formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
              }}
            >
              {(field) => (
                <RadioItemBox field={field} fieldData={tourApply} />
              )}
            </FormItemBox>
            <FormItemBox
              name="assessment.apply"
              label="アセスメントシート"
              inputType="other"
              className={{
                formBox: 'col-span-12 lg:col-span-6',
                formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
              }}
            >
              {(field) => (
                <RadioItemBox field={field} fieldData={assessmentApply} />
              )}
            </FormItemBox>
            <FormItemBox
              name="trial.apply"
              label="体験利用契約"
              inputType="other"
              className={{
                formBox: 'col-span-12 lg:col-span-6',
                formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
              }}
            >
              {(field) => (
                <RadioItemBox field={field} fieldData={trialApply} />
              )}
            </FormItemBox>
            <FormItemBox
              name="trialImportantExperience.apply"
              label="体験重要事項説明書"
              inputType="other"
              className={{
                formBox: 'col-span-12 lg:col-span-6',
                formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
              }}
            >
              {(field) => (
                <RadioItemBox field={field} fieldData={trialImportantExperienceApply} />
              )}
            </FormItemBox>
            <FormItemBox
              name="usageContract.apply"
              label="利用契約"
              inputType="other"
              className={{
                formBox: 'col-span-12 lg:col-span-6',
                formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
              }}
            >
              {(field) => (
                <RadioItemBox field={field} fieldData={usageContractApply} />
              )}
            </FormItemBox>
            <FormItemBox
              name="importantExperience.apply"
              label="重要事項説明書"
              inputType="other"
              className={{
                formBox: 'col-span-12 lg:col-span-6',
                formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
              }}
            >
              {(field) => (
                <RadioItemBox field={field} fieldData={importantExperienceApply} />
              )}
            </FormItemBox>
            <FormItemBox
              name="plan.apply"
              label="個別支援計画"
              inputType="other"
              className={{
                formBox: 'col-span-12 lg:col-span-6',
                formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
              }}
            >
              {(field) => (
                <RadioItemBox field={field} fieldData={planApply} />
              )}
            </FormItemBox>
          </div>
          <div className="col-span-12 xl:col-span-1"></div>
          {/* right */}
          <div className="col-span-12 xl:col-span-5 border border-gray-400 min-h-80 h-80 mx-5 xl:mx-0 mt-5 xl:mt-0 overflow-y-auto">
            <div className="flex flex-row items-start justify-between">
              <div className="font-bold">モニタリング</div>
              <Button onClick={() => addMonitoringItem(fields.length)} size={'icon'} type="button" className="h-7 bg-[#999999] hover:bg-[#b7b7b7] text-black rounded-none" >
                <PlusIcon size={'16'} className="text-xs" />
              </Button>
            </div>
            <div className="px-6 space-y-3 mt-3">
              {fields.map((field: MonitoringDto, index) => (
                <fieldset key={field.id} className="col-span-7">
                  <FormMonitoring
                    remove={remove}
                    index={index}
                  />
                </fieldset>
              ))}
            </div>
          </div>
        </div>

        {/* action */}
        <PopupButtons title="保存" disabled={form.formState.isSubmitting} onClose={handleCancelClick} />
      </form>
    </FormReact>
  )
}
