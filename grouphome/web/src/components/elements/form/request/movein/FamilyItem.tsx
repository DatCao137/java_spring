import { Trash2 } from 'lucide-react';
import {
  useEffect,
  useState,
} from 'react';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Input as InputUI } from '@/components/ui/Input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { PostalAddress } from '@/features/blc-common/components/PostalAddress';
import { useFormContext } from 'react-hook-form';
import { FamilyItem as FamilyType } from '@/features/customer-management/types/Request';

type props = {
  index: any;
  remove: any;
  data: FamilyType
  cbMatchedTown?: (index:number, isMatched:boolean|undefined) => void
  errors?: any;
};

export const FamilyItem = ({ remove, index, data, cbMatchedTown, errors }: props) => {
  const [isMatchedTown, setIsMatchedTown] = useState(true);

  const form = useFormContext();
  const { control, watch } = form;

  const showAddressInput = watch(`contents.family[${index}].together.has`)

  useEffect(() => {
    if(cbMatchedTown != null) {
      cbMatchedTown(index, isMatchedTown);
    }
  }, [ isMatchedTown ]);

  return (
    <div className="col-span-12 grid grid-cols-12">
      <div className="col-span-2 border-collapse content-center border text-center px-2">
        <FormField
          control={control}
          name={`contents.family[${index}].name`}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <InputUI
                  type="text"
                  {...field}
                  className="h-8 rounded-none border-0 border-b bg-[#e0e0e0e0] focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="col-span-2 border-collapse content-center border text-center px-2">
        <FormField
          control={control}
          name={`contents.family[${index}].gana`}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <InputUI
                  type="text"
                  {...field}
                  className="h-8 rounded-none border-0 border-b bg-[#e0e0e0e0] focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="col-span-2 border-collapse content-center border text-center px-2">
        <FormField
          control={control}
          name={`contents.family[${index}].relationship`}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <InputUI
                  type="text"
                  {...field}
                  className="h-8 rounded-none border-0 border-b bg-[#e0e0e0e0] focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="col-span-5 grid border-collapse grid-cols-7 items-center border p-2">
        <div className="col-span-3">
          <FormField
            control={control}
            name={`contents.family[${index}].together.has`}
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={(v) => {
                      field.onChange(v == 'true' ? true : false);
                    }}
                    defaultValue={field.value == null ? '' : field.value ? 'true' : 'false'}
                    value={field.value == null ? '' : field.value ? 'true' : 'false'}
                    className="flex flex-row items-center space-x-1"
                  >
                    {[
                      { name: '同居', value: true },
                      { name: '別居', value: false },
                    ].map((item, i) => (
                      <FormItem
                        key={i}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={item.value ? 'true' : 'false'} onClick={(e) => {
                            if (e.currentTarget.ariaChecked)
                              field.onChange(null);
                          }} />
                        </FormControl>
                        <FormLabel>
                          <small>{item.name}</small>
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-7">
          {showAddressInput != null && !showAddressInput && (
            <PostalAddress
              key={`contents.family[${index}].together.has`}
              formData={{
                ...data.together.address,
                postNo: (data?.together?.address?.postNo1st || '') + (data?.together?.address?.postNo2nd || ''),
              }}
              register={() => { }}
              errors={errors?.contents?.family?.[index]?.together?.address}
              onChange={(data) => {
                form.setValue(`contents.family[${index}].together.address`, data)
              }}
              isMatchedTown={setIsMatchedTown}
              opts={{
                showLabel: false,
                showPlaceHolder: false,
                className: 'relative border-none text-gray-700 space-y-1',
              }}
            />
          )}
        </div>
      </div>

      <div className="col-span-1 flex border-collapse items-center justify-center border">
        <Trash2
          className="size-6 cursor-pointer text-red-500"
          onClick={() => {
            remove(index);
            if(cbMatchedTown != null) {
              cbMatchedTown(index, undefined);
            }
          }}
        />
      </div>
    </div>
  );
};
