import React from "react";

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
  orderList: Order[];
};

function AllOrderDialog({ orderList }: OrderTableProps) {
  return <div>hi</div>;
}

export default AllOrderDialog;
