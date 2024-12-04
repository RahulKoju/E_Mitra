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
import { LoaderCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AllOrderDialog from "./AllOrderDialog";

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

type OrderTableProps = {
  orders: Order[];
  orderLoading: boolean;
};

function OrderTable({ orders, orderLoading }: OrderTableProps) {
  const pendingOrders = orders.filter(
    (order) => order.orderStatus === "Pending"
  );
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center mx-3">
            <h2>Pending Orders</h2>
            <Dialog>
              <DialogTrigger asChild>
                <h2 className="text-blue-500 hover:underline">
                  View Order History
                </h2>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Order History</DialogTitle>
                  <DialogDescription className="sr-only">
                    Description
                  </DialogDescription>
                  <AllOrderDialog orderList={orders} />
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {orderLoading ? (
            <div className="flex justify-center py-6">
              <LoaderCircle className="text-gray-500 w-10 h-10 animate-spin" />
            </div>
          ) : pendingOrders.length > 0 ? (
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
                {pendingOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.documentId}</TableCell>
                    <TableCell>{order.orderStatus}</TableCell>
                    <TableCell>
                      {order.username} <br />
                      <span className="text-sm text-gray-500">
                        {order.email}
                      </span>
                    </TableCell>
                    <TableCell>Rs.{order.totalOrderAmount}</TableCell>
                    <TableCell>
                      {order.orderItemList.map((item) => (
                        <div key={item.id} className="text-sm">
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
          ) : (
            <p className="text-gray-500 text-center">
              No pending orders found.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default OrderTable;
