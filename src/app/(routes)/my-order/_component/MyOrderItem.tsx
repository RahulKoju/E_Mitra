import Image from "next/image";
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

type MyOrderItemProps = {
  orderItem: OrderItemDetails;
};

function MyOrderItem({ orderItem }: MyOrderItemProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center w-full max-w-6xl mx-auto bg-white p-4 rounded-lg shadow-md my-2">
      <div className="flex justify-center md:col-span-1">
        <Image
          src={
            process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
            orderItem.product.images[0]?.url
          }
          alt={orderItem.product.name}
          width={120}
          height={120}
          className="object-cover rounded-md border border-gray-200"
        />
      </div>
      <div className="text-center md:text-left md:col-span-2 space-y-2">
        <h2 className="text-lg font-semibold text-gray-800">
          {orderItem.product.name}
        </h2>
        <p className="text-gray-600">
          Item Price: Rs. {orderItem.product.price.toFixed(2)}
        </p>
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-gray-700">Quantity</h2>
        <p className="font-medium text-gray-900">{orderItem.quantity}</p>
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-gray-700">Subtotal</h2>
        <p className="font-semibold text-green-600">
          Rs. {orderItem.amount.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default MyOrderItem;
