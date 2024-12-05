import React from "react";
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

function AllOrderDialog({ orderList }: { orderList: Order[] }) {
  return (
    <div className="max-h-[70vh] overflow-x-auto">
      <OrderTable orders={orderList} />
    </div>
  );
}

export default AllOrderDialog;
