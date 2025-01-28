"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/app/_context/AuthContext";
import { useUpdateCart } from "@/app/_context/UpdateCartContext";
import {
  useCreateOrder,
  useDeleteCartItem,
  useUserCartItems,
} from "@/app/_utils/tanstackQuery";
import { CartItemViewModel, OrderPayload } from "@/lib/type";
import { LoaderCircleIcon } from "lucide-react";

export default function PaymentSuccess() {
  const router = useRouter();
  const { user, jwt, isLoggedIn } = useAuth();
  const { resetCart } = useUpdateCart();
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const { mutateAsync: deleteCartItem } = useDeleteCartItem();
  const { mutateAsync: createOrder } = useCreateOrder();

  const {
    data: cartItems = [],
    isLoading: isLoadingCart,
    error: cartError,
  } = useUserCartItems(user?.id ? user.id : null, jwt);

  const createOrderAfterPayment = async (
    transactionUuid: string,
    cartItems: CartItemViewModel[]
  ) => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      // Verify authentication
      const storedToken = sessionStorage.getItem("token");
      const storedUserString = sessionStorage.getItem("user");

      if (!storedToken || !storedUserString) {
        throw new Error("Authentication required");
      }

      const storedUser = JSON.parse(storedUserString);

      // Calculate the total order amount
      const totalOrderAmount = cartItems.reduce(
        (sum, item) => sum + item.amount,
        0
      );

      const payload: OrderPayload = {
        data: {
          username: storedUser.username || "",
          email: storedUser.email || "",
          address: "bhaktapur",
          phone_no: 9800000000,
          totalOrderAmount: totalOrderAmount,
          userId: storedUser.id,
          orderItemList: cartItems.map((item) => ({
            amount: item.amount,
            quantity: item.quantity,
            product: item.product,
          })),
          orderStatus: "Completed",
        },
      };

      await createOrder({ data: payload, jwt: storedToken });

      // Delete cart items and reset cart only after order is successfully created
      await Promise.all(
        cartItems.map((item) =>
          deleteCartItem({ id: item.id, jwt: storedToken })
        )
      );
      resetCart();

      toast.success("Payment successful! Your order has been placed.");
      router.replace("/order-confirmation");
    } catch (error) {
      console.error("Order creation error:", error);
      toast.error(
        "There was an error processing your order. Please contact support."
      );
      router.replace("/checkout");
    } finally {
      setIsProcessing(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      try {
        if (cartError) {
          throw new Error("Failed to load cart items");
        }

        if (!isLoadingCart && cartItems.length > 0) {
          const query = new URLSearchParams(window.location.search);
          const transactionUuid = query.get("transaction_uuid");

          if (!transactionUuid) {
            throw new Error("Invalid transaction");
          }

          await createOrderAfterPayment(transactionUuid, cartItems);
        }
      } catch (error) {
        console.error("Payment success handling error:", error);
        toast.error(
          "There was an error processing your payment. Please try again."
        );
        router.replace("/checkout");
      }
    };

    if (!isLoadingCart) {
      handlePaymentSuccess();
    }
  }, [isLoadingCart, cartItems, cartError]);

  if (isLoading || isProcessing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <LoaderCircleIcon className="animate-spin h-8 w-8 text-blue-600 mb-4" />
        <p className="text-lg text-gray-700">Processing your payment...</p>
      </div>
    );
  }

  return null;
}
