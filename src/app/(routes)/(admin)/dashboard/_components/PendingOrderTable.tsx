import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoaderCircle } from "lucide-react";
import AllOrderDialog from "./AllOrderDialog";
import OrderTable from "./OrderTable";

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

function PendingOrderTable({ orders, orderLoading }: OrderTableProps) {
  const pendingOrders = orders.filter(
    (order) => order.orderStatus === "Pending"
  );
  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <h2 className="text-lg font-semibold">All Pending Orders</h2>
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-blue-500 hover:underline text-sm">
                  View Order History
                </button>
              </DialogTrigger>
              <DialogContent className="w-[95%] max-w-[1200px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-lg">Order History</DialogTitle>
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
            <div className="w-full overflow-x-auto">
              <OrderTable orders={pendingOrders} />
            </div>
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

export default PendingOrderTable;
