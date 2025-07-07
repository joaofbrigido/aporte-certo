import { cn } from "@/app/lib/utils";
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableRow,
} from "../ui/table";

type BasicTableProps = {
  children: React.ReactNode;
  header: React.ReactNode;
  footer?: React.ReactNode;
  bordered?: boolean;
  containerClassName?: string;
};

export const BasicTable = ({
  header,
  footer,
  bordered,
  containerClassName,
  children,
}: BasicTableProps) => {
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
            {header}
          </TableRow>
        </TableHeader>
        <TableBody
          className={cn(bordered && "[&>tr>td]:border-r last:border-r-0")}
        >
          {children}
        </TableBody>
        {footer && <TableFooter>{footer}</TableFooter>}
      </Table>
    </div>
  );
};
