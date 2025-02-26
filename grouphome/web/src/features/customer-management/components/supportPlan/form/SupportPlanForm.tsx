'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/ButtonCus';
import { Form } from '@/components/ui/Form';

import { ContentMoveIn } from '@/features/customer-management/types/Request';
import { SupportPlanDto } from '@/features/customer-management/types/SupportPlan';
import { BaseLayout } from '@/components/elements/form/support_plan/BaseLayout';
import { TextInput } from '@/components/elements/form/support_plan/Layout';

type props = {
  onCancelClick: () => void;
  data?: any;
  defaultValues: SupportPlanDto
};

export const SupportPlanForm = forwardRef(
  ({ onCancelClick, data, defaultValues }: props, ref: any) => {
    const formRef = useRef(ref);
    const form = useForm<SupportPlanDto>({
      mode: "onSubmit", 
      defaultValues
  });

    useEffect(() => {
    }, []);

    useImperativeHandle(formRef, () => ({
      reset: () => {
        return form.reset();
      },
    }));

    const onSubmit = async (values: any) => {
    };

    return (
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="container rounded containner-form pl-3 pr-3 pt-3">
              <div className="form-custom">
                <BaseLayout form={form} />
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

            <div className="mt-0 mb-2 flex justify-end gap-3 px-4 pt-1 border-t border-t-gray-300">
                <Button className="common-cancel-button" onClick={onCancelClick} children="キャンセル" />
                <Button type="submit" className="common-save-button" children="更新" />
            </div>
          </form>
        </Form>
      </div>

    );
  },
);
SupportPlanForm.displayName = 'supportPlanForm';
