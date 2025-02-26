import React from 'react'
import { FormField } from '@/components/ui/Form';
import { Text } from '../../Controls';
import { Item } from '../../Item';
import { TypePhone } from './TypePhone';


type Target = 'doctor' | 'caseWorker';
interface Props {
    form: any;
    path?: string;
    target: Target;
    addressEle?: JSX.Element
}

export const Related = React.forwardRef<HTMLElement, Props>(({
    form, path = 'contents.related', target, addressEle
}, ref
) => {
    var basePath:string, name:string, contents:{name:string, path:string}[];
    switch (target) {
        case 'doctor':
            basePath = `${path}.doctor.`;
            name = '病院';
            contents = [{ name: '病院名', path: 'hospital' },
            { name: '科', path: 'medicine' },
            { name: '医師名', path: 'name' }]
            break;
        case 'caseWorker':
            basePath = `${path}.caseWorker.`;
            name = '機関';
            contents = [{ name: '機関名', path: 'institutionName' },
            { name: '氏名', path: 'name' }];

    }

    const InputItem = (label: string, path: string) => (
        <div className="col-span-3 flex flex-row items-center space-x-2">
            <span className="text-nowrap">{label} :</span>
            <FormField
                control={form.control}
                name={path}
                render={({ field }) => (
                    <Item contents={(<Text field={field} />)} />
                )}
            />
        </div>
    )
    return (<>
    {
        contents?.map((item, index) => (
            InputItem(item.name, `${basePath}${item.path}`)
        ))
    }
    { addressEle && (<div className="col-span-9 flex flex-row items-center space-x-2">
                          <span className="text-nowrap">住所:</span>
                          {addressEle}
                    </div>)}
    <div className="col-span-9 flex flex-row items-center space-x-2">
        <TypePhone form={form} path={`${basePath}contact`} label={name} />
    </div>
</>)
})
