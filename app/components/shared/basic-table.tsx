import { cn } from "@/app/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useMemo, useState } from "react";

type SortDirection = "asc" | "desc";

export type SortConfig<T> = {
  key: string;
  getValue: (row: T) => number;
};

type BasicTableProps<T> = {
  data: T[];
  renderRow: (row: T) => React.ReactNode;
  header: (params: {
    onSort: (key: string) => void;
    activeSort?: {
      key: string;
      direction: SortDirection;
    };
  }) => React.ReactNode;

  sortConfig?: Record<string, SortConfig<T>>;

  footer?: React.ReactNode;
  bordered?: boolean;
  containerClassName?: string;
};

export function BasicTable<T>({
  data,
  renderRow,
  header,
  sortConfig,
  footer,
  bordered,
  containerClassName,
}: BasicTableProps<T>) {
  const [sortState, setSortState] = useState<{
    key: string;
    direction: SortDirection;
  } | null>(null);

  function handleSort(key: string) {
    if (!sortConfig?.[key]) return;

    setSortState((prev) => {
      if (prev?.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }

      return { key, direction: "desc" };
    });
  }

  const sortedData = useMemo(() => {
    if (!sortState || !sortConfig) return data;

    const { key, direction } = sortState;
    const getter = sortConfig[key].getValue;

    return [...data].sort((a, b) => {
      const aValue = getter(a);
      const bValue = getter(b);

      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortState, sortConfig]);

  return (
    <div
      className={cn(
        "border rounded-lg [&>div]:max-h-[60vh] overflow-y-auto",
        containerClassName
      )}
    >
      <Table>
        <TableHeader>
          <TableRow
            className={cn(
              "[&>*]:whitespace-nowrap sticky top-0 bg-background z-10",
              bordered && "[&>th]:border-r last:border-r-0"
            )}
          >
            {header({
              onSort: handleSort,
              activeSort: sortState ?? undefined,
            })}
          </TableRow>
        </TableHeader>

        <TableBody
          className={cn(bordered && "[&>tr>td]:border-r last:border-r-0")}
        >
          {sortedData.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={9}
                className="text-center text-muted-foreground"
              >
                Nenhum Ativo Adicionado
              </TableCell>
            </TableRow>
          ) : (
            sortedData.map(renderRow)
          )}
        </TableBody>

        {footer && <TableFooter>{footer}</TableFooter>}
      </Table>
    </div>
  );
}
