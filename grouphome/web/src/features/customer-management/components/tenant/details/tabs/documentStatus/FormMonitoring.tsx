import { Trash2 } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { FormItemBox } from '../../../../../../../components/elements/form/FormItemBox';
import { RadioItemBox } from '../../../../../../../components/elements/form/RadioItemBox';

type props = {
  remove: any;
  index: number;
};
export const FormMonitoring = ({ remove, index }: props) => {
  const form = useFormContext();

  const apply = form.watch(`monitoring[${index}].apply`);

  return (
    <div className="w-full lg:w-11/12 xl:w-5/6 text-sm border border-gray-800 border-dashed">
      <div className='flex flex-row items-start justify-between w-full'>
        <span className=''>モニタリング{index + 1}</span>
        <Trash2
          className="size-4 cursor-pointer text-red-500"
          onClick={() => remove(index)}
        />
      </div>

      <div className='ml-6 mt-1'>
        <FormItemBox
          name={`monitoring[${index}].apply`}
          label="実施状況"
          inputType="other"
          className={{
            formBox: 'w-full',
            formInput: 'h-8 rounded-none border border-gray-300 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
          }}
        >
          {(field) => (
            <RadioItemBox field={field} fieldData={apply} />
          )}
        </FormItemBox>
      </div>
    </div>
  );
};
