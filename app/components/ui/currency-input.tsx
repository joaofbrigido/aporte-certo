/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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

type CurrencyInputProps = {
  className?: string;
  initialValue?: string;
  onCallback?: (value: number) => void;
};

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  CurrencyInputProps;

const CurrencyInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, initialValue = "", onCallback, ...props }, ref) => {
    const [value, setValue] = React.useReducer((_: any, next: string) => {
      const digits = next.replace(/\D/g, "");
      return moneyFormatter.format(Number(digits) / 100);
    }, initialValue);

    function handleChange(formattedValue: string) {
      const digits = formattedValue.replace(/\D/g, "");
      const realValue = Number(digits) / 100;
      if (onCallback !== undefined) onCallback(realValue);
    }

    return (
      <Input
        ref={ref}
        className={cn("w-full", className)}
        value={value}
        onChange={(ev) => {
          setValue(ev.target.value);
          handleChange(ev.target.value);
        }}
        {...props}
      />
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";

export { CurrencyInput };
