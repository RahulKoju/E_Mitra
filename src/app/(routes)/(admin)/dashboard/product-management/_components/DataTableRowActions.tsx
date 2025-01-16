"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

interface DataTableRow {
  documentId: string;
}

interface DataTableRowActionsProps<TData extends DataTableRow> {
  row: Row<TData>;
  onDelete: (id: string) => void;
  onEdit: (product: TData) => void;
}

export function DataTableRowActions<TData extends DataTableRow>({
  row,
  onDelete,
  onEdit,
}: DataTableRowActionsProps<TData>) {
  const product = row.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={() => onEdit(product)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(product.documentId)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
