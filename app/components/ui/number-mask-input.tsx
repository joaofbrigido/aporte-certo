/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { Input } from "./input";
import { cn } from "@/app/lib/utils";

const moneyFormatter = Intl.NumberFormat("pt-BR", {
  currency: "BRL",
  currencyDisplay: "symbol",
  currencySign: "standard",
  style: "currency",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const numberFormatter = Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

type NumberMaskInputProps = {
  className?: string;
  initialValue?: string;
  onCallback?: (value: number) => void;
  numberType: "number" | "currency";
};

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  NumberMaskInputProps;

const NumberMaskInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      value: controlledValue,
      onChange,
      initialValue = "",
      onCallback,
      numberType,
      ...props
    },
    ref
  ) => {
    const formatValue = (val: string) => {
      const digits = val.replace(/\D/g, "");

      if (numberType === "currency") {
        return moneyFormatter.format(Number(digits) / 100);
      }

      return numberFormatter.format(Number(digits) / 100);
    };

    const [value, setValue] = React.useState(
      () => controlledValue ?? formatValue(initialValue)
    );

    // Atualiza quando valor controlado mudar
    React.useEffect(() => {
      if (controlledValue !== undefined) {
        setValue(formatValue(controlledValue.toString()));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [controlledValue]);

    const handleChange = (formattedValue: string) => {
      const digits = formattedValue.replace(/\D/g, "");
      const realValue = Number(digits) / 100;

      if (onCallback) onCallback(realValue);
      if (onChange) onChange({ target: { value: formattedValue } } as any);
    };

    return (
      <Input
        ref={ref}
        className={cn("w-full", className)}
        {...props}
        value={value}
        onChange={(ev) => {
          const formatted = formatValue(ev.target.value);
          setValue(formatted);
          handleChange(formatted);
        }}
      />
    );
  }
);

NumberMaskInput.displayName = "NumberMaskInput";

export { NumberMaskInput };
