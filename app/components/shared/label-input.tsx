import { cn } from "@/app/lib/utils";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { NumberMaskInput } from "../ui/number-mask-input";

type LabelInputProps = React.ComponentProps<"input"> & {
  label: string;
  errors?: string[];
  containerClassName?: string;
  isCurrency?: boolean;
  isNumber?: boolean;
};

export const LabelInput = ({
  label,
  errors,
  containerClassName,
  isCurrency,
  isNumber,
  ...props
}: LabelInputProps) => {
  return (
    <div className={cn("w-full", containerClassName)}>
      <Label htmlFor={props.name} className="block mb-2 text-md">
        {label}
        {props.required && <span className="text-red-500 ml-1">*</span>}
      </Label>

      {isCurrency ? (
        <NumberMaskInput
          numberType="currency"
          className={cn(
            props.className,
            errors &&
              "border-red-500 dark:border-red-500 dark:focus:border-red-500"
          )}
          placeholder="R$ 0,00"
          id={props.name}
          {...props}
        />
      ) : isNumber ? (
        <NumberMaskInput
          numberType="number"
          className={cn(
            props.className,
            errors &&
              "border-red-500 dark:border-red-500 dark:focus:border-red-500"
          )}
          placeholder="R$ 0,00"
          id={props.name}
          {...props}
        />
      ) : (
        <Input
          className={cn(
            props.className,
            errors &&
              "border-red-500 dark:border-red-500 dark:focus:border-red-500"
          )}
          id={props.name}
          {...props}
        />
      )}

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
