import { CartItemViewModel } from "@/lib/type";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";

type CartItemListProp = {
  cartItemList: CartItemViewModel[];
};

function CartItemList({
  cartItemList,
  onDeleteItem,
}: CartItemListProp & { onDeleteItem: (id: string) => void }) {
  return (
    <div className="bg-white shadow-sm rounded-lg p-4 relative">
      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
        {cartItemList.map((cart, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200 rounded-md p-2"
          >
            <div className="flex items-center space-x-4">
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${cart.image}`}
                alt={cart.name}
                width={90}
                height={90}
                className="border border-gray-200 rounded-md p-2 bg-gray-50"
              />
              <div>
                <h2 className="font-semibold text-gray-800 mb-1">
                  {cart.name}
                </h2>
                <div className="text-sm text-gray-600 space-x-2">
                  <span>Quantity: {cart.quantity}</span>
                  <span className="font-bold text-green-600">
                    Rs. {cart.amount}
                  </span>
                </div>
              </div>
            </div>
            <Trash2Icon
              className="text-red-500 hover:text-red-700 cursor-pointer transition-colors"
              onClick={() => onDeleteItem(cart.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartItemList;
