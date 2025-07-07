import React from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SelectProps } from "@radix-ui/react-select";
import { cn } from "@/app/lib/utils";

type Option = {
  value: string;
  label: string;
};

type SelectLabelProps = SelectProps & {
  label: string;
  placeholder?: string;
  errors?: string[];
  containerClassName?: string;
  options: Option[];
};

export const SelectLabel = ({
  label,
  placeholder,
  errors,
  containerClassName,
  options,
  ...props
}: SelectLabelProps) => {
  return (
    <div className={cn("w-full", containerClassName)}>
      <Label htmlFor={props.name} className="block mb-2 text-md">
        {label}
        {props.required && <span className="text-red-500 ml-1">*</span>}
      </Label>

      <Select {...props}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={`option-${option.value}`} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {errors && (
        <p className="text-red-500 mt-1">
          {errors.map((error) => (
            <span key={error}>{error}. </span>
          ))}
        </p>
      )}
    </div>
  );
};
