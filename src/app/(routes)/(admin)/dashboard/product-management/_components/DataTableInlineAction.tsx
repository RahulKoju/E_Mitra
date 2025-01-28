"use client";

import { Button } from "@/components/ui/button";
import { EditIcon, TrashIcon } from "lucide-react";
import { Row } from "@tanstack/react-table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DataTableRow {
  name: string;
  documentId: string;
}

interface DataTableInlineActionsProps<TData extends DataTableRow> {
  row: Row<TData>;
  onDelete: (id: string) => void;
  onEdit: (product: TData) => void;
}

export function DataTableInlineActions<TData extends DataTableRow>({
  row,
  onDelete,
  onEdit,
}: DataTableInlineActionsProps<TData>) {
  const product = row.original;

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onEdit(product)}
        className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
      >
        <EditIcon className="h-4 w-4" />
        <span className="sr-only">Edit</span>
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <TrashIcon className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the product "{product.name}". This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onDelete(product.documentId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
