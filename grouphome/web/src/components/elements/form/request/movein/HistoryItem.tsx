import { Trash2 } from 'lucide-react';

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';

type props = {
  update?: any;
  remove: any;
  index: number;
  value?: any;
  control: any;
};
export const HistoryItem = ({ remove, index, control }: props) => {
  return (
    <div className="col-span-7 grid grid-cols-7">
      <div className="col-span-1 border-collapse content-center border px-2">
        (病名)
      </div>
      <div className="col-span-2 border-collapse border px-2">
        <FormField
          control={control}
          name={`contents.history[${index}].name`}
          render={({ field }) => (
            <FormItem className="">
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  className="rounded-none border-0 border-b focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="col-span-1 border-collapse content-center border px-2">
        医療機関
      </div>
      <div className="col-span-2 border-collapse border px-2">
        <FormField
          control={control}
          name={`contents.history[${index}].medical`}
          render={({ field }) => (
            <FormItem className="">
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  className="rounded-none border-0 border-b focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="col-span-1 flex items-center justify-center">
        <Trash2
          className="size-6 cursor-pointer text-red-500"
          onClick={() => remove(index)}
        />
      </div>
    </div>
  );
};
