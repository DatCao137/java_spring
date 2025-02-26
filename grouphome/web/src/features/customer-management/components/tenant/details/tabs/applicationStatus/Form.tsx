import { Button } from '@/components/ui/ButtonCus';
import { Form as FormReact } from '@/components/ui/Form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormItemBox } from '../../../../../../../components/elements/form/FormItemBox';
import { Select } from '@/components/elements/form/Controls'; 
import { useSelectList } from '@/features/customer-management/contexts/SelectListContext';
import { Post } from '@/features/blc-common/utils/ServerRequest';
import { showErrors } from '../common/CustomerForm';
import { TenantApplicationStatusSave as saveApi } from '@/features/blc-common/assets/ApiPath';
import { useContext, useState } from 'react';
import {
  schema,
  SaveApplicationStatusRequestDto,
} from '@/features/customer-management/validator/tenant/ApplicationStatusSchema';
import { RadioItemBox } from '../../../../../../../components/elements/form/RadioItemBox';
import { Plus, Trash2 } from 'lucide-react';
import { TenantMainContext } from '@/features/customer-management/pages/TenantMain';
import { convertToJapaneseEra } from '@/utils/DateUtils';
import { useForm } from "react-hook-form";
import { TenantTabContext } from '../../Tabs';
import DatePicker from '@/components/elements/CalendarPicker';
import { PopupButtons } from '@/components/elements/PopupButtons';

type props = {
  formData: SaveApplicationStatusRequestDto;
  onCancelClick: () => void;
};

export const Form = ({ formData, onCancelClick }: props) => {
  const { selectListData } = useSelectList();
  const insuranceTypes =
    selectListData.get('personal_liability_type')?.filter((e) => e.value) || [];
  const { setApplicationStatusInfo } = useContext(TenantTabContext);
  const yesNoOption = [
    { name: 'あり', value: true },
    { name: 'なし', value: false },
  ];

  const form = useForm<SaveApplicationStatusRequestDto>({
    resolver: zodResolver(schema),
    defaultValues: formData,
  });

  const [
    nationalRentSubsidySpecialBenefit,
    municipalRentSubsidySubject,
    individualMunicipalityAddition,
    lifeInsurancePensionBasic,
    lifeInsurancePensionSpecial,
    lifeInsurancePensionDisabled,
  ] = form.watch([
    'nationalRentSubsidy.specialBenefit',
    'municipalRentSubsidy.subject',
    'individualMunicipality.addition',
    'lifeInsurancePension.basic',
    'lifeInsurancePension.special',
    'lifeInsurancePension.disabled',
  ]);

  const removeField = (index: number) => {
    form.setValue(
      'individualMunicipality.addition',
      individualMunicipalityAddition.filter((_: any, i: any) => i !== index),
    );
  };

  const addField = () => {
    form.setValue('individualMunicipality.addition', [
      ...individualMunicipalityAddition,
      '',
    ]);
  };

  async function onSubmit(values: SaveApplicationStatusRequestDto) {
    Post({
      apiPath: saveApi,
      params: values,
      message: '顧客情報の基本情報を正常に保存しました',
      onSuccess: (res) => {
        setApplicationStatusInfo && setApplicationStatusInfo((prev: any) => ({
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
  };

  return (
    <FormReact {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="tab-form-xl space-y-8"
      >
        <div className="container rounded border border-black p-5">
          <div className="grid grid-cols-8 gap-2">
            <FormItemBox
              name="government"
              label="援護自治体（受給者証発行元）"
              className={{
                formBox: 'col-span-4',
                formInput:
                  'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
              }}
            />
          </div>

          <div className="">
            <div className="mt-3">国GH家賃補助金</div>
            <div className="px-2 pb-2 grid grid-cols-9 gap-2 border">
              <div className="col-span-3 flex items-center space-x-2">
                <FormItemBox
                  name="nationalRentSubsidy.specialBenefit"
                  label="国　特別給付費の有無"
                  inputType="other"
                  className={{
                    formBox: 'w-full',
                    formInput:
                      'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                  }}
                >
                  {(field) => (
                    <RadioItemBox
                      field={field}
                      fieldData={nationalRentSubsidySpecialBenefit}
                      options={yesNoOption}
                      isBoolean={false}
                    />
                  )}
                </FormItemBox>
              </div>
              <div className="col-span-3 flex items-center space-x-2">
                <FormItemBox
                  name="nationalRentSubsidy.limit"
                  label="補足給付期限"
                  inputType="other"
                  className={{
                    formBox: 'w-full',
                    formInput:
                      'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
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
              <div className="col-span-3 flex items-center space-x-2">
              <FormItemBox
                  name="nationalRentSubsidy.limit"
                  label="補足給付期限（和暦）"
                  inputType="other"
                  className={{
                    formBox: 'w-full',
                    formInput:
                      'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                  }}
                >
                  {(field) => (
                    <input
                    type="text"
                    value={convertToJapaneseEra(field.value)}
                    disabled
                    className="w-full text-sm px-2 h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  )}
                </FormItemBox>
              </div>
            </div>
          </div>

          <div className="">
            <div className="mt-3">市区町村GH家賃補助金</div>
            <div className="px-2 pb-2 grid grid-cols-8 gap-2 border">
              <div className="col-span-4 items-center">
                <div className="grid grid-cols-8 gap-2">
                  <div className="col-span-4 items-center space-x-2">
                    <FormItemBox
                      name="municipalRentSubsidy.subject"
                      label="対象可否"
                      inputType="other"
                      className={{
                        formBox: 'w-full',
                        formInput:
                          'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                      }}
                    >
                      {(field) => (
                        <RadioItemBox
                          field={field}
                          fieldData={municipalRentSubsidySubject}
                          options={yesNoOption}
                          isBoolean={false}
                        />
                      )}
                    </FormItemBox>
                  </div>
                  <div className="col-span-4 items-center space-x-2">
                    <FormItemBox
                      name="municipalRentSubsidy.amount"
                      label="金額"
                      inputType="other"
                      className={{
                        formBox: 'w-full',
                        formInput:
                          'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                      }}
                    >
                      {(field) => (
                        <input
                          type="number"
                          onChange={(v) => field.onChange(v || '')}
                          value={field.value}
                          className="w-full text-sm px-2 h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      )}
                    </FormItemBox>
                  </div>
                </div>
                <FormItemBox
                  name="municipalRentSubsidy.requestAt"
                  label="申請日"
                  inputType="other"
                  className={{
                    formBox: 'w-full',
                    formInput:
                      'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
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
              <div className="col-span-4 flex items-center space-x-2">
                <FormItemBox
                  name="municipalRentSubsidy.memo"
                  label="MEMO"
                  inputType="textarea"
                  className={{
                    formBox: 'w-full',
                    formInput:
                      'py-1 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                  }}
                />
              </div>
            </div>
          </div>

          <div className="">
            <div className="mt-3">自治体単独加算</div>
            <div className="px-2 pb-2 grid grid-cols-8 gap-2 border">
              <div className="col-span-4 items-center">
                <div>
                  算定加算
                  {individualMunicipalityAddition.map((item, index) => (
                    <div key={index} className="grid grid-cols-8 gap-2">
                      <div className="col-span-7 flex items-center space-x-2">
                        <FormItemBox
                          key={index}
                          name={`individualMunicipality.addition[${index}]`}
                          label=""
                          className={{
                            formBox: 'w-full',
                            formInput:
                              'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                          }}
                        >
                          {(field) => (
                            <input
                              type="date"
                              onChange={(v) => field.onChange(v || '')}
                              value={field.value}
                              defaultValue={field.value}
                              className="px-0 w-full text-sm h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                          )}
                        </FormItemBox>
                      </div>
                      <div className="col-span-1 flex items-center space-x-2">
                        <Trash2
                          className="size-6 cursor-pointer text-red-500"
                          onClick={() => {
                            removeField(index);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="col-span-12 mb-2 flex justify-center">
                    <Button
                      type="button"
                      size="sm"
                      className="px-4 py-1 mt-1 text-sm h-6"
                      onClick={() => {
                        const families = form.getValues(
                          'individualMunicipality.addition',
                        );
                        const lastFamily = families[families.length - 1];
                        if (families.length == 0 || lastFamily) {
                          addField();
                        }
                      }}
                    >
                      <Plus className="size-4" />
                    </Button>
                  </div>
                </div>

                <FormItemBox
                  name="individualMunicipality.requestAt"
                  label="申請日"
                  inputType="other"
                  className={{
                    formBox: 'w-full',
                    formInput:
                      'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
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
              <div className="col-span-4 flex space-x-2">
                <FormItemBox
                  name="individualMunicipality.memo"
                  label="MEMO"
                  inputType="textarea"
                  className={{
                    formBox: 'w-full',
                    formInput:
                      'py-1 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                  }}
                />
              </div>
            </div>
          </div>

          <div className="">
            <div className="mt-3">生保・年金状況</div>
            <div className="px-2 pb-2 grid grid-cols-9 gap-2 border">
              <div className="col-span-3 flex items-center space-x-2">
                <FormItemBox
                  name="lifeInsurancePension.basic"
                  label="生活保護"
                  inputType="other"
                  className={{
                    formBox: 'w-full',
                    formInput:
                      'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                  }}
                >
                  {(field) => (
                    <RadioItemBox
                      field={field}
                      fieldData={lifeInsurancePensionBasic}
                      options={yesNoOption}
                      isBoolean={false}
                    />
                  )}
                </FormItemBox>
              </div>
              <div className="col-span-3 flex items-center space-x-2">
                <FormItemBox
                  name="lifeInsurancePension.special"
                  label="特別基準有無"
                  inputType="other"
                  className={{
                    formBox: 'w-full',
                    formInput:
                      'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                  }}
                >
                  {(field) => (
                    <RadioItemBox
                      field={field}
                      fieldData={lifeInsurancePensionSpecial}
                      options={yesNoOption}
                      isBoolean={false}
                    />
                  )}
                </FormItemBox>
              </div>
              <div className="col-span-3 flex items-center space-x-2">
                <FormItemBox
                  name="lifeInsurancePension.disabled"
                  label="障がい者年金"
                  inputType="other"
                  className={{
                    formBox: 'w-full',
                    formInput:
                      'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                  }}
                >
                  {(field) => (
                    <RadioItemBox
                      field={field}
                      fieldData={lifeInsurancePensionDisabled}
                      options={yesNoOption}
                      isBoolean={false}
                    />
                  )}
                </FormItemBox>
              </div>
            </div>
          </div>

          <div className="">
            <div className="mt-3">個人賠償責任保険</div>
            <div className="px-2 pb-2 grid grid-cols-8 gap-2 border">
              <div className="col-span-4 flex items-center space-x-2">
                <FormItemBox
                  name="personalLiability.status"
                  label="加入状況"
                  className={{
                    formBox: 'w-full',
                    formInput:
                      'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                  }}
                />
              </div>
              <div className="col-span-4 flex items-center space-x-2">
                <FormItemBox
                  name="personalLiability.insuranceType"
                  label="加入保険"
                  inputType="other"
                  className={{
                    formBox: 'w-full',
                    formInput:
                      'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                  }}
                >
                  {(field) => (
                    <Select
                      field={field}
                      selectList={insuranceTypes}
                      classNameTrigger="w-full h-8 rounded-none border border-gray-300"
                    />
                  )}
                </FormItemBox>
              </div>
              <div className="col-span-4 flex items-center space-x-2">
                <FormItemBox
                  name="personalLiability.insuranceName"
                  label="保険会社名"
                  className={{
                    formBox: 'w-full',
                    formInput:
                      'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                  }}
                />
              </div>
              <div className="col-span-4 flex items-center space-x-2">
                <FormItemBox
                  name="personalLiability.agency"
                  label="代理店名"
                  className={{
                    formBox: 'w-full',
                    formInput:
                      'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                  }}
                />
              </div>
              <div className="col-span-4 flex items-center space-x-2">
                <FormItemBox
                  name="personalLiability.staff"
                  label="担当者"
                  className={{
                    formBox: 'w-full',
                    formInput:
                      'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                  }}
                />
              </div>
              <div className="col-span-4 flex items-center space-x-2">
                <FormItemBox
                  name="personalLiability.contact"
                  label="連絡先"
                  className={{
                    formBox: 'w-full',
                    formInput:
                      'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <PopupButtons title="保存" disabled={form.formState.isSubmitting} onClose={handleCancelClick} />
      </form>
    </FormReact>
  );
};
