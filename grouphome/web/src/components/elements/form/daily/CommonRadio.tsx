import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import './CommonRadio.css';

export type RadioOption = {
  label: string;
  value: string;
}

type props = {
  options: RadioOption[];
  defaultValue?: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}
export const CommonRadio = ({ options = [], defaultValue, onChange, className = '', disabled = false }: props) => {
  return (
    <>
      <RadioGroup defaultValue={defaultValue} onValueChange={onChange} className={`common-radio ${className}`} disabled={disabled}>
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={option.value} />
            <Label htmlFor={option.value}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </>
  )
}