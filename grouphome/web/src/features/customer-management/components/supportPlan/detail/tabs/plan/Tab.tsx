
import { ButtonProps, ButtonType, TableOpeButtons } from '@/components/elements/TableOpeButtons';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/Form';
import { SupportPlanDto } from '@/features/customer-management/types/SupportPlan';
import { BaseLayout } from '@/components/elements/form/support_plan/BaseLayout';
import { useContext, useRef, useState } from 'react';
import { SupportPlanVersionForm } from '../../../form/SupportPlanVersionForm';
import { Popup } from '@/components/elements/Popup';
import { SupportPlanMainContext } from '@/features/customer-management/pages/SupportPlanMain';
import { TextInput } from '@/components/elements/form/support_plan/Layout';
type ArgsData = {
  tgtId: string | null
}

export function Tab({ tgtId }: ArgsData) {
  const [contentData, setContentData] = useState<JSX.Element>(<></>);
  const [titleText, setTitleText] = useState('');
  const [btnText, setBtnText] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const formRef = useRef<any>(null);
  const { defaultValues } = useContext(SupportPlanMainContext);
  
  const form = useForm<SupportPlanDto>({
    mode: "onSubmit",
    defaultValues
  });

  const handleBtnCancelClick = () => {
    setIsPopupOpen(false);
  };

  const handleAddClick = () => {
    setContentData(
      <SupportPlanVersionForm
        ref={formRef}
        onCancelClick={handleBtnCancelClick}
        defaultValues={defaultValues}
      />,
    );
    setTitleText('②同意取得済バージョン');
    setIsPopupOpen(true);
    setBtnText('更新');
  };

  if (tgtId == null) {
    return (<></>);
  }

  return (
    <>
      <div className="info-plan">
        <TableOpeButtons items={[
          { name: "同意取得", buttonType: ButtonType.Add, cb: () => handleAddClick()  },
          { name: "担当者会議録追加", buttonType: ButtonType.Add },
        ] as ButtonProps[]} />
      </div>

      <div>
        <Form {...form}>
          <form className="space-y-8">
            <div className="container rounded containner-form p-3">
              <div className="form-custom">
                <BaseLayout form={form} disabled={true} />
                <div className="w-full grid grid-cols-12 mt-5">
                  <div className="col-span-6">
                    <span>作成者</span>
                    <div className="w-3/4 flex flex-row">
                      <div className="w-1/3 bg-gray-200 border border-solid border-gray-400 flex flex-row items-center">
                        <span className="w-full text-center">
                          サービス管理責任者
                        </span>
                      </div>
                      <div className="w-2/3 border border-solid border-gray-400">
                        <TextInput
                          disabled={true}
                          form={form}
                          path={'managermentService'}
                        />
                      </div>
                      <div className="flex flex-row items-center">
                        <span className="w-full text-center font-normal ml-1">印</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>

      <Popup
            title={titleText}
            doText={btnText}
            isOpen={isPopupOpen}
            contents={contentData}
            hideFooter={true}
            onClose={() => setIsPopupOpen(false)}
          />
    </>
  );
}
