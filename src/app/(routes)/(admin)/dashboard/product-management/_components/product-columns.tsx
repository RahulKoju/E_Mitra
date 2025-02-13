"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Category, Product } from "@/lib/type";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableInlineActions } from "./DataTableInlineAction";

export const columns = (
  onDelete: (id: string) => void,
  onEdit: (product: Product) => void
): ColumnDef<Product>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate text-gray-600">
        {row.getValue("description")}
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => (
      <div className="text-green-600">
        Rs. {parseFloat(row.getValue("price")).toFixed(2)}
      </div>
    ),
  },
  {
    accessorKey: "slug",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Slug" />
    ),
  },
  {
    accessorKey: "categories",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Categories" />
    ),
    cell: ({ row }) => {
      const categories: Category[] = row.getValue("categories");
      return (
        <div className="flex flex-wrap gap-1">
          {categories.map((category) => (
            <span
              key={category.id}
              className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
            >
              {category.name}
            </span>
          ))}
        </div>
      );
    },
    filterFn: "categoryFilter",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <DataTableInlineActions
        row={row}
        onDelete={(id) => onDelete(id)}
        onEdit={(product) => onEdit(product)}
      />
    ),
  },
];
