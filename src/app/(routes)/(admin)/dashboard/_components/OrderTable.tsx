import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";

type ProductImage = {
  url: string;
};

type Product = {
  id: number;
  documentId: string;
  name: string;
  price: number;
  images: ProductImage[];
};

type OrderItemDetails = {
  id: number;
  quantity: number;
  amount: number;
  product: Product;
};

type Order = {
  id: number;
  documentId: string;
  username: string;
  email: string;
  totalOrderAmount: number;
  orderItemList: OrderItemDetails[];
  orderStatus: string;
  createdAt: string;
};

function OrderTable({ orders }: { orders: Order[] }) {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.orderStatus}</TableCell>
              <TableCell>
                {order.username} <br />
                <span className="text-sm text-gray-500">{order.email}</span>
              </TableCell>
              <TableCell>Rs.{order.totalOrderAmount}</TableCell>
              <TableCell>
                {order.orderItemList.map((item) => (
                  <div key={item.id} className="text-sm mb-1">
                    {item.product.name} (x{item.quantity}) - Rs.
                    {item.amount}
                  </div>
                ))}
              </TableCell>
              <TableCell>
                {dayjs(order.createdAt).format("DD/MM/YYYY")} <br />
                <span className="text-sm text-gray-500">
                  {dayjs(order.createdAt).format("h:mm A")}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default OrderTable;
