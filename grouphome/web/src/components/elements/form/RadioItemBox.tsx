import { FormControl, FormItem, FormLabel } from "@/components/ui/Form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";

type OptionItem = {
  name: string;
  value: string | boolean;
}
type props = {
  fieldData: string | boolean | undefined | null; 
  field: any;
  options?: OptionItem[];
  isBoolean?: boolean;
}
export const RadioItemBox = ({ fieldData, field, isBoolean = true, options = [
  { name: 'あり', value: true },
  { name: 'なし', value: false }
] }: props) => {
  return (
    <RadioGroup
      onValueChange={(v) => {
        if (isBoolean)
          field.onChange(v === 'true' ? true : (v === 'false' ? false : undefined));
        else
          field.onChange(v)
      }}
      value={isBoolean ? (field.value ? 'true' : 'false') : field.value}
      className="w-full h-8 border border-gray-300 flex flex-row items-center space-x-3 px-2"
    >
      {options.map((item: any, i: number) => (
        <FormItem
          key={i}
          className="flex items-center space-x-3 space-y-0"
        >
          <FormControl>
            <RadioGroupItem value={isBoolean ? (item.value ? 'true' : 'false') : item.value} checked={fieldData !== null && typeof fieldData !== 'undefined' && item.value === fieldData} onClick={(e) => {
              if (fieldData === undefined)
                field.onChange(item.value);
              else if (e.currentTarget.ariaChecked)
                field.onChange(undefined);
            }} />
          </FormControl>
          <FormLabel className="cursor-pointer">
            <small>{item.name}</small>
          </FormLabel>
        </FormItem>
      ))}
    </RadioGroup>
  );
}
