import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/ButtonCus';
import { Form } from '@/components/ui/Form';
import { RequestSave } from '@/features/blc-common/assets/ApiPath';
import ErrorManager from '@/features/blc-common/utils/ErrorManager';
import formSchemaMeeting, { defaultValuesMeeting as defaultValues } from '@/features/customer-management/validator/tenant/MeetingFormSchema';
import { Post } from '@/features/blc-common/utils/ServerRequest';

import { PopupConfirm } from '@/components/elements/PopupConfirm';
import { PopupConfirmParams } from '@/components/elements/Common';
import { ItemBuilder } from '@/components/elements/form/ItemBuilder';

import { Venue } from '@/components/elements/form/meeting/Venue';
import { Username } from '@/components/elements/form/meeting/Username';
import { WrittenBy } from '@/components/elements/form/meeting/WrittenBy';
import { Date } from '@/components/elements/form/meeting/Date';
import { TimeRange } from '@/components/elements/form/meeting/TimeRange';
import { MeetingAttendes } from '@/components/elements/form/meeting/MeetingAttendes';
import { ItemsConsidered, ResultsConsideration1, ResultsConsideration2 } from '@/components/elements/form/meeting/Other';
import { ContentMeetingPersonInChargeSave } from '@/features/customer-management/types/Tenant';
import { SupportPlanCss } from '../../../assets/SupportPlanCss'

type props = {
  onCancelClick: () => void;
  data?: any;
  contents: ContentMeetingPersonInChargeSave;
};

export const MeetingForm = forwardRef(
  ({ onCancelClick, data, contents }: props, ref: any) => {
    const [confirmParam, setConfirmParam] = useState<PopupConfirmParams>({
      isOpen: false,
      textConfirm: '',
      message: '',
      isShowCancel: true,
      confirmAction: () => { },
      onClose: () => handleCloseConfirm()
    });
    const formRef = useRef(ref);

    const form = useForm<z.infer<typeof formSchemaMeeting>>({
      resolver: zodResolver(formSchemaMeeting),
      defaultValues,
      reValidateMode: 'onChange',
    });

    useEffect(() => {
      if (data) {
        console.log('data', data)
        
      }
    }, [data]);

    useEffect(() => {
      if(Object.keys(form.formState.errors).length != 0)
      console.log("バリデーションエラー : ", form.formState.errors);
    }, [ form.formState.errors ]);

    useImperativeHandle(formRef, () => ({
      reset: () => {
        return form.reset();
      },
    }));

    const handleCloseConfirm = () => {
      setConfirmParam(prevState => ({
        ...prevState,
        isOpen: false
      }));
    };

    const onSubmit = async (values: z.infer<typeof formSchemaMeeting>) => {
      console.log('values', values)
      try {
        
        // doSave(dto);

      } catch (error: any) {
        console.log(error);
        ErrorManager.showErrors(error.response.data);
      }
    };

    const doSave = (data: any) => {
      Post({
        apiPath: RequestSave,
        params: data,
        message: '見学・体験を' + (data?.requestInfo?.id ? '追加' : '更新') + 'しました。',
        onSuccess: (res: any) => {
          onCancelClick();
        }
      });
    };

    const baseLayout = [
      {
        label: "root", child: [
          {
            sub: {
              span: 8, cols: 8, child: [
                { label: "利用者名", ele: <Username form={form} /> },
                { label: "記入者", ele: <WrittenBy form={form} /> },
              ]
            }
          },
          {
            sub: {
              span: 8, cols: 8, child: [
                { label: "開催年月日", ele: <Date form={form} /> },
                { label: "開催時間", ele: <TimeRange form={form} /> },
              ]
            }
          },
          {
            sub: {
              span: 8, cols: 8, child: [
                { label: "開催場所", ele: <Venue form={form} /> },
              ]
            }
          },
          {
            sub: {
              span: 8, cols: 8, child: [
                { 
                  label: "会議出席者", 
                  sub: { span: 7, cols: 8, isItem: false, child: [{ ele: <MeetingAttendes form={form} /> }] } 
                },
              ]
            }
          },
          {
            sub: {
              span: 8, cols: 8, child: [
                { label: "検討した項目", ele: <ItemsConsidered form={form} /> }
              ]
            }
          },
          {
            sub: {
              span: 8, cols: 8, child: [
                { label: "検討した結果", ele: <ResultsConsideration1 form={form} /> }
              ]
            }
          },
          {
            sub: {
              span: 8, cols: 8, child: [
                { label: "その他", ele: <ResultsConsideration2 form={form} /> }
              ]
            }
          }
        ]
      }
    ];

    return (
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="container rounded border border-black p-5 formMeeting">
              <ItemBuilder layout={baseLayout} className='grid grid-cols-8'/>
            </div>
            <div className="mt-4 flex justify-end gap-5 px-4">
              <Button
                type="button"
                className="w-[120px] bg-red-400 hover:bg-red-400"
                onClick={onCancelClick}
              >
                キャンセル
              </Button>
              <Button
                type="submit"
                className="w-[120px] bg-blue-400 hover:bg-blue-400"
              >
                更新
              </Button>
            </div>
          </form>
        </Form>
        <PopupConfirm param={confirmParam} />
      </div>

    );
  },
);
MeetingForm.displayName = 'meetingForm';
