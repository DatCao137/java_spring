import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: any | null;
  minValue?: number;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, minValue, value, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let inputValue = e.target.value;

      if (inputValue === null) {
        inputValue = '';
      }

      if (type === "number" && minValue !== undefined) {
        const numericValue = parseFloat(inputValue);
        if (!isNaN(numericValue) && numericValue < minValue) {
          inputValue = minValue.toString();
        }
      }

      if (onChange) {
        onChange({
          ...e,
          target: { ...e.target, value: inputValue },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    };

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        value={value ?? ''} // Ensure value is not null
        onChange={handleChange}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };