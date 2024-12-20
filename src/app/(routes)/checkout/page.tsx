"use client";
import { useAuth } from "@/app/_context/AuthContext";
import { useUpdateCart } from "@/app/_context/UpdateCartContext";
import GlobalAPI from "@/app/_utils/GlobalAPI";
import { Input } from "@/components/ui/input";
import {
  BillingDetails,
  billingSchema,
  CartItemViewModel,
  OrderPayload,
} from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreditCard,
  LoaderCircleIcon,
  Mail,
  MapPin,
  Phone,
  ShoppingCart,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function Checkout() {
  const [cartItemList, setCartItemList] = useState<CartItemViewModel[]>([]);
  const [subTotal, setSubTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);
  const { updateCart, resetCart } = useUpdateCart();
  const { isLoggedIn, user, jwt } = useAuth();
  const router = useRouter();

  const taxRate = 0.13; // 13% tax
  const tax = subTotal * taxRate;
  const total = subTotal + tax;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BillingDetails>({
    resolver: zodResolver(billingSchema),
  });

  const checkAuthentication = () => {
    const token = sessionStorage.getItem("token");
    const userString = sessionStorage.getItem("user");

    if (!token) {
      toast.error("Please log in to place the order");
      router.replace("/sign-in");
      return false;
    }

    try {
      const parsedUser = userString ? JSON.parse(userString) : null;
      return parsedUser !== null;
    } catch (error) {
      console.error("Error parsing user data", error);
      toast.error("Authentication error. Please log in again.");
      router.replace("/sign-in");
      return false;
    }
  };

  const getCartItems = async () => {
    setLoadingCart(true);
    if (user && jwt) {
      try {
        const orderItems: CartItemViewModel[] =
          await GlobalAPI.getUserCartItems(user.id, jwt);
        setCartItemList(orderItems);
        setItemCount(orderItems.length);
      } catch (error) {
        console.error("Error fetching cart items", error);
        setCartItemList([]);
        setItemCount(0);
      } finally {
        setLoadingCart(false);
      }
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    const total = cartItemList.reduce((sum, item) => sum + item.amount, 0);
    setSubTotal(total);
  }, [cartItemList]);

  useEffect(() => {
    if (isLoggedIn) {
      getCartItems();
    }
  }, [isLoggedIn, updateCart]);

  const onSubmit = async (data: BillingDetails) => {
    setIsLoading(true);
    if (!checkAuthentication()) {
      return;
    }

    if (!user || !jwt) {
      toast.error("Please log in to place an order");
      router.replace("/sign-in");
      return;
    }

    const payload: OrderPayload = {
      data: {
        username: data.name,
        email: data.email,
        address: data.address,
        phone_no: Number(data.phoneNo),
        totalOrderAmount: total,
        userId: user.id,
        orderItemList: cartItemList.map((item) => ({
          amount: item.amount,
          quantity: item.quantity,
          product: item.product,
        })),
      },
    };
    try {
      await GlobalAPI.createOrder(payload, jwt);
      // Delete cart items and update local state immediately
      const deletePromises = cartItemList.map((item) =>
        GlobalAPI.deleteCartItem(item.id, jwt)
      );
      await Promise.all(deletePromises);
      setCartItemList([]);
      setItemCount(0);
      setSubTotal(0);
      resetCart();
      toast.success("Order placed successfully!");
      reset();
      router.replace("/order-confirmation");
    } catch (error) {
      console.error("Order placement error", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800 flex items-center">
            <ShoppingCart className="mr-4 text-blue-600" size={40} />
            Checkout
          </h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Billing Details Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl fo // Stop loadingnt-bold mb-6 flex items-center text-gray-800">
              <CreditCard className="mr-3 text-blue-600" size={28} />
              Billing Details
            </h2>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <div className="relative">
                  <Input
                    id="name"
                    {...register("name")}
                    className="pl-10 py-3 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your full name"
                  />
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="pl-10 py-3 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Shipping Address
                </label>
                <div className="relative">
                  <Input
                    id="address"
                    {...register("address")}
                    className="pl-10 py-3 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your shipping address"
                  />
                  <MapPin
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                </div>
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phoneNo"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <Input
                    id="phoneNo"
                    type="tel"
                    {...register("phoneNo")}
                    className="pl-10 py-3 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your phone number"
                  />
                  <Phone
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                </div>
                {errors.phoneNo && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phoneNo.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Order Summary ({itemCount})
            </h2>

            {loadingCart ? (
              <div className="flex justify-center items-center py-12">
                <LoaderCircleIcon className="animate-spin text-blue-600 h-12 w-12" />
              </div>
            ) : cartItemList.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <ShoppingCart
                  size={48}
                  className="mx-auto mb-4 text-gray-300"
                />
                <p>Your cart is empty</p>
              </div>
            ) : (
              <div>
                <div className="space-y-4 max-h-64 overflow-y-auto pr-2 mb-6">
                  {cartItemList.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center border-b pb-3 last:border-b-0"
                    >
                      <div>
                        <p className="font-semibold text-gray-800">
                          {item.name}
                        </p>
                        <p className="text-gray-500 text-sm">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="font-bold text-gray-700">
                        Rs. {(item.actualPrice * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t pt-4">
                  <div className="flex justify-between text-gray-600">
                    <p>Subtotal</p>
                    <p className="font-semibold">Rs. {subTotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <p>Tax (13%)</p>
                    <p className="font-semibold">Rs. {tax.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between font-bold text-xl text-gray-800 mt-4">
                    <p>Total</p>
                    <p>Rs. {total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Place Order Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center"
              disabled={cartItemList.length === 0 || isLoading}
            >
              {isLoading ? (
                <LoaderCircleIcon className="animate-spin text-white h-6 w-6" />
              ) : (
                "Place Order"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
