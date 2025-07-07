import React from "react";
import { Ellipsis, Pen, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

type TableActionButtonsProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export const TableActionButtons = ({
  onEdit,
  onDelete,
}: TableActionButtonsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <Ellipsis className="h-4 w-4" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuItem onSelect={onEdit}>
          <Pen size={12} className="mr-2" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-500 hover:!text-red-500"
          onSelect={onDelete}
        >
          <Trash size={12} className="mr-2 text-red-500" />
          Deletar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
