import React from "react";
import OrderTable from "./OrderTable";
import { Order } from "@/lib/type";

function AllOrderDialog({ orderList }: { orderList: Order[] }) {
  return (
    <div className="max-h-[70vh] overflow-x-auto">
      <OrderTable orders={orderList} />
    </div>
  );
}

export default AllOrderDialog;
