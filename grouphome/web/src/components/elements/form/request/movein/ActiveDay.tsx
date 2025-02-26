import React from 'react'
import { FormField } from '@/components/ui/Form';
import { SelectListResponseDto } from '@/features/customer-management/contexts/SelectListContext';
import { TextLine, TimeRange } from './Contents';
import { Item } from '../../Item';
import { CheckList } from '../../CheckList';

interface Props {
    form: any;
    path?: string;
    weeks: SelectListResponseDto[];
    checkLength: string[];
}

export const ActiveDay = React.forwardRef<HTMLElement, Props>(({
    form, path = 'contents.situation.activity', weeks, checkLength = []
}
) => {
    return (<>
        <div className="col-span-3 mt-2">
            <FormField
                control={form.control}
                name={`${path}.weeks`}
                render={() => (
                    <Item className='col-span-3 grid grid-cols-7' contents={<CheckList form={form} list={weeks} path={`${path}.weeks`} gridWidth='col-span-1' />} />
                )}
            />
        </div>
        <div className="col-span-1 flex flex-row items-center">
            計週
            {checkLength.length || ''}回
        </div>
        <div className="col-span-3 flex flex-row items-center space-x-2">
            <TimeRange form={form} path="contents.situation.activity" label="活動時間" />
        </div>
        <div className="col-span-7 flex flex-row items-center space-x-2 space-y-0">
            <span className="text-nowrap">特記事項:</span>
            <TextLine form={form} path="contents.situation.activity.notes" />
        </div>

    </>
    )
})