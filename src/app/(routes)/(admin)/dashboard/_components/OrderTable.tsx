import React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { ChevronDown, ChevronUp, Package } from "lucide-react";
import dayjs from "dayjs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Order } from "@/lib/type";

interface OrderTableProps {
  orders: Order[];
}

function OrderTable({ orders }: OrderTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Order ID",
        cell: (info: any) => (
          <div className="font-medium">{info.getValue()}</div>
        ),
      },
      {
        accessorKey: "orderStatus",
        header: "Status",
        cell: (info: any) => {
          const status = info.getValue();
          const getStatusColor = (status: string) => {
            switch (status.toLowerCase()) {
              case "pending":
                return "text-yellow-600 bg-yellow-50";
              case "completed":
                return "text-green-600 bg-green-50";
              case "cancelled":
                return "text-red-600 bg-red-50";
              default:
                return "text-gray-600 bg-gray-50";
            }
          };
          return (
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                status
              )}`}
            >
              {status}
            </span>
          );
        },
      },
      {
        accessorKey: "username",
        header: "Customer",
        cell: (info: any) => {
          const order = info.row.original;
          return (
            <div className="space-y-1">
              <div className="font-medium">{order.username}</div>
              <div className="text-gray-500 text-sm">{order.email}</div>
            </div>
          );
        },
      },
      {
        accessorKey: "totalOrderAmount",
        header: "Total Amount",
        cell: (info: any) => (
          <div className="font-medium">
            Rs.
            {Number(info.getValue()).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
            })}
          </div>
        ),
      },
      {
        accessorKey: "orderItemList",
        header: "Items",
        cell: (info: any) => (
          <div className="space-y-2">
            {info.getValue().map((item: any) => (
              <div
                key={item.id}
                className="flex items-center space-x-2 text-sm"
              >
                <Package className="h-4 w-4 text-gray-400" />
                <div>
                  {item.product ? (
                    <span className="text-gray-700">
                      {item.product.name} (x{item.quantity}) - Rs.{item.amount}
                    </span>
                  ) : (
                    <span className="text-gray-400 italic">
                      Deleted Product (x{item.quantity}) - Rs.{item.amount}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        cell: (info: any) => (
          <div className="space-y-1">
            <div className="font-medium">
              {dayjs(info.getValue()).format("DD/MM/YYYY")}
            </div>
            <div className="text-gray-500 text-sm">
              {dayjs(info.getValue()).format("h:mm A")}
            </div>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gray-50">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className={`px-6 py-4 ${
                      header.column.getCanSort()
                        ? "cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() === "asc" && (
                        <ChevronUp className="h-4 w-4 text-gray-500" />
                      )}
                      {header.column.getIsSorted() === "desc" && (
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="px-6 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="text-sm"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="text-sm"
          >
            Next
          </Button>
        </div>
        <div className="text-sm text-gray-500">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
      </div>
    </div>
  );
}

export default OrderTable;
