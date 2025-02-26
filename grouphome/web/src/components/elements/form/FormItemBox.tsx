import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { HTMLInputTypeAttribute } from "react";
import { useFormContext } from "react-hook-form";

type props = {
  name: string;
  label: string;
  type?: HTMLInputTypeAttribute | undefined;
  className?: {
    formField?: string;
    formItem?: string;
    formMessage?: string;
    formLabel?: string;
    formBox?: string;
    formInput?: string;
    formOuterControl?: string;
  }
  inputType?: 'input' | 'textarea' | 'other';
  children?: (field: any) => React.ReactNode;
  disabled?: boolean;
}
export const FormItemBox = ({ name, className, label, type = 'text', inputType = 'input', children, disabled = false }: props) => {
  const form = useFormContext();

  return (
    <div className={className?.formBox || ''}>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className={className?.formItem || ''}>
            <FormLabel className={className?.formLabel}>{label}</FormLabel>
            <div className={`space-y-2 ${className?.formOuterControl || ''}`}>
              <FormControl>
                {inputType === 'other' ? (
                  !!children && children(field)
                ) : (
                  <>
                    {inputType === 'input' && type === 'text' && (
                      <Input
                        type={type}
                        onChange={(v) => field.onChange(v || '')}
                        value={field.value}
                        className={className?.formInput || ''}
                        disabled={disabled}
                      />
                    )}

                    {inputType === 'input' && type === 'number' && (
                      <Input
                        type={type}
                        onChange={(e) => field.onChange(+e.target.value)}
                        value={field.value?.toString() || undefined}
                        className={className?.formInput || ''}
                        disabled={disabled}
                      />
                    )}

                    {inputType === 'textarea' && (
                      <Textarea
                        rows={4}
                        onChange={(v) => field.onChange(v || '')}
                        value={field.value}
                        className={className?.formInput || ''}
                        disabled={disabled}
                      />
                    )}
                  </>
                )}
              </FormControl>
              <FormMessage className={className?.formMessage} />
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
