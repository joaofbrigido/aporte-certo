"use client";

import { useState, useMemo, useEffect } from "react";
import useSWR from "swr";
import { Check, ChevronsUpDown } from "lucide-react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/app/components/ui/popover";
import type { SelectProps } from "@radix-ui/react-select";
import { Skeleton } from "../ui/skeleton";
import { debounce } from "lodash";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { cn } from "@/app/lib/utils";
import { Input } from "../ui/input";
import { BrapiStock } from "@/app/services/brapi/types";

type StockSelectProps = SelectProps & {
  label?: string;
  placeholder: string;
  errors?: string[];
  containerClassName?: string;
  popoverClassName?: string;
  value?: string;
  onValueChange?: (value: string) => void;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const StockSelect = ({
  label,
  placeholder,
  errors,
  containerClassName = "",
  popoverClassName = "",
  value,
  onValueChange,
  ...props
}: StockSelectProps) => {
  const [open, setOpen] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loadingDefaultStock, setLoadingDefaultStock] = useState(false);

  // Debounce da busca
  useEffect(() => {
    const debounced = debounce((search: string) => {
      setDebouncedSearch(search);
    }, 500);

    debounced(inputSearch);

    return () => {
      debounced.cancel();
    };
  }, [inputSearch]);

  const key =
    debouncedSearch.length > 0
      ? `/api/brapi?search=${encodeURIComponent(debouncedSearch)}`
      : null;

  const { data, isLoading } = useSWR<BrapiStock>(key, fetcher);

  const options = useMemo(
    () =>
      data?.stocks
        ?.filter((stock) => !stock.stock.toLowerCase().endsWith("f"))
        .map((stock) => ({
          value: `${stock.stock}|${stock.close}|${stock.logo}`,
          label: `${stock.stock} - ${stock.name}`,
        })) ?? [],
    [data]
  );

  // Quando for passado um valor inicial, busca e define o label
  useEffect(() => {
    if (value && !selectedLabel) {
      async function fetchDefaultStock() {
        setLoadingDefaultStock(true);

        try {
          const res = await fetch(`/api/brapi?search=${value}`);
          if (!res.ok) {
            toast.error("Erro ao buscar ativo selecionado.");
            return;
          }

          const { stocks: defaultStock } = (await res.json()) as BrapiStock;

          if (defaultStock.length > 0) {
            setSelectedLabel(
              `${defaultStock[0].stock} - ${defaultStock[0].name}`
            );
          }
        } catch (err) {
          toast.error("Erro ao buscar ativo selecionado.");
          console.error(err);
        } finally {
          setLoadingDefaultStock(false);
        }
      }

      fetchDefaultStock();
    }
  }, [value, selectedLabel]);

  // Reseta o label se o valor externo for limpo
  useEffect(() => {
    if (!value) {
      setSelectedLabel("");
    }
  }, [value]);

  return (
    <div className={`w-full ${containerClassName}`}>
      <input type="hidden" name={props.name} value={value ?? ""} />

      {label && (
        <Label htmlFor={props.name} className="block mb-2 text-md">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild disabled={props.disabled}>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between font-normal overflow-hidden",
              errors && "border-red-500"
            )}
          >
            {!loadingDefaultStock ? (
              <>{selectedLabel ? selectedLabel : placeholder}</>
            ) : (
              <Skeleton className="h-6 w-full" />
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className={cn(
            "w-full p-1 min-w-64 max-w-96 max-sm:max-w-64",
            popoverClassName
          )}
        >
          <Input
            placeholder="Buscar Ativo"
            className="focus-visible:ring-0 focus-visible:ring-transparent"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
          />

          <ul className="mt-2 max-h-72 overflow-y-auto">
            {inputSearch.length === 0 && (
              <li className="px-2 py-1.5 text-sm text-muted-foreground">
                Digite código de um ativo para buscar, ex: PETR4
              </li>
            )}

            {isLoading && (
              <li className="px-2 py-1.5 text-sm text-muted-foreground space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
              </li>
            )}

            {debouncedSearch.length > 0 &&
              !isLoading &&
              options.length === 0 && (
                <li className="px-2 py-1.5 text-sm text-muted-foreground">
                  Nenhum ativo encontrado
                </li>
              )}

            {!isLoading &&
              options.map((opt) => (
                <li
                  key={opt.value}
                  onClick={() => {
                    onValueChange?.(opt.value);
                    setSelectedLabel(opt.label);
                    setOpen(false);
                  }}
                  className="flex items-center px-2 py-1.5 text-sm rounded hover:bg-muted cursor-default"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === opt.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {opt.label}
                </li>
              ))}
          </ul>
        </PopoverContent>
      </Popover>

      {errors && (
        <p className="text-red-500 mt-1">
          {errors.map((errorMsg) => (
            <span key={errorMsg}>{errorMsg}. </span>
          ))}
        </p>
      )}
    </div>
  );
};
