import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoaderCircle, AlertCircle } from "lucide-react";
import AllOrderDialog from "./AllOrderDialog";
import OrderTable from "./OrderTable";
import { Order } from "@/lib/type";
import { Alert, AlertDescription } from "@/components/ui/alert";

type OrderTableProps = {
  orders: Order[];
  orderLoading: boolean;
};

const PendingOrderTable: React.FC<OrderTableProps> = ({
  orders,
  orderLoading,
}) => {
  const [error, setError] = React.useState<string | null>(null);

  const pendingOrders = React.useMemo(() => {
    try {
      return orders.filter((order) => order.orderStatus === "Pending");
    } catch (err) {
      setError("Error processing orders data");
      return [];
    }
  }, [orders]);

  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="w-full">
      <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="border-b">
          <CardTitle className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <h2 className="text-lg font-semibold text-gray-800">
              Pending Orders ({pendingOrders.length})
            </h2>
            <Dialog>
              <DialogTrigger asChild>
                <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors duration-200">
                  View Order History
                </button>
              </DialogTrigger>
              <DialogContent className="w-[95%] max-w-[1200px] max-h-[90vh] overflow-y-auto">
                <DialogHeader className="space-y-4">
                  <DialogTitle className="text-xl font-semibold text-gray-900">
                    Complete Order History
                  </DialogTitle>
                  <DialogDescription className="text-sm text-gray-500">
                    View and manage all past orders
                  </DialogDescription>
                  <AllOrderDialog orderList={orders} />
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {orderLoading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <LoaderCircle className="text-blue-500 w-12 h-12 animate-spin" />
              <p className="text-sm text-gray-500">Loading orders...</p>
            </div>
          ) : pendingOrders.length > 0 ? (
            <div className="w-full overflow-x-auto rounded-lg">
              <OrderTable orders={pendingOrders} />
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No pending orders available
              </p>
              <p className="text-sm text-gray-400 mt-2">
                New orders will appear here when received
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PendingOrderTable;
