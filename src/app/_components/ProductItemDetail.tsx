"use client";
import { CartData, Product } from "@/lib/type";
import { LoaderCircleIcon, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../_context/AuthContext";

type ProductItemProps = {
  product: Product;
  isPending: boolean;
  onAddToCart: (data: CartData, jwt: string) => void;
};

function ProductItemDetail({
  product,
  isPending,
  onAddToCart,
}: ProductItemProps) {
  const [quantity, setQuantity] = useState(1);
  const totalPrice = quantity * product.price;
  const { jwt, user } = useAuth();
  const router = useRouter();
  //const { mutate: addToCartMutation, isPending } = useAddToCart();

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(prev + 1, 20));
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const addToCart = async () => {
    if (!jwt || !user) {
      toast.error("You must be signed in to add items to the cart.");
      router.push("/sign-in");
      return;
    }
    const data = {
      data: {
        quantity: quantity,
        amount: totalPrice,
        products: product.documentId,
        users_permissions_user: user.id,
        userId: user.id,
      },
    };
    onAddToCart(data, jwt);
    setQuantity(1);
    // addToCartMutation(
    //   { data, jwt },
    //   {
    //     onSuccess: () => {
    //       toast.success(`Added ${quantity} ${product.name} to cart`);
    //       incrementCart();
    //       setQuantity(1);
    //     },
    //     onError: (error: unknown) => {
    //       if (error instanceof Error) {
    //         toast.error(error.message || "Failed to add item to cart");
    //       } else if (typeof error === "string") {
    //         toast.error(error);
    //       } else {
    //         toast.error("Failed to add item to cart");
    //       }
    //     },
    //   }
    // );
  };

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-white rounded-xl">
        {/* Image Section */}
        <div className="flex items-center justify-center">
          <div className="relative w-full aspect-square">
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${product.images[0].url}`}
              alt={product.name}
              fill
              className="bg-slate-50 p-6 object-contain rounded-xl transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col p-6 gap-3">
          {/* Header */}
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-gray-600 leading-relaxed text-justify">
              {product.description.replace(/\*\*/g, "")}
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-green-600">
                Rs. {product.price.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500">/ piece</span>
            </div>
          </div>

          {/* Quantity Selector and Total */}
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    className="p-3 hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    disabled={quantity >= 20}
                    className="p-3 hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="text-lg font-medium text-green-600">
                  Total: Rs. {totalPrice}
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={addToCart}
              disabled={isPending}
              className="flex items-center justify-center w-full bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 active:bg-green-800 transform active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow"
            >
              {isPending ? (
                <LoaderCircleIcon className="animate-spin" />
              ) : (
                "Add to Cart"
              )}
            </button>
          </div>

          {/* Categories */}
          {product.categories?.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-medium text-gray-700">Categories</h2>
              <div className="flex gap-2 flex-wrap">
                {product.categories.map((category) => (
                  <Link
                    href={`/category/${category.slug}`}
                    key={category.id}
                    className="px-3 py-1 text-sm font-medium text-green-700 bg-green-50 rounded-full 
                             border border-green-100 hover:bg-green-100 transition-colors duration-200 
                             cursor-pointer"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductItemDetail;
