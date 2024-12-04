"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CircleUser,
  LayoutDashboard,
  LogOut,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUpdateCart } from "../_context/UpdateCartContext";
import GlobalAPI from "../_utils/GlobalAPI";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CartItemList from "./CartItemList";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "../_context/AuthContext";
import Category from "./Category";
import NavMenu from "./NavMenu";

type CartItemViewModel = {
  name: string;
  quantity: number;
  amount: number;
  image: string;
  actualPrice: number;
  id: string;
};

function Header() {
  const [itemCount, setItemCount] = useState(0);
  const { isLoggedIn, user, jwt, logout } = useAuth();
  const { updateCart, decrementCart } = useUpdateCart();
  const [cartItemList, setCartItemList] = useState<CartItemViewModel[]>([]);
  const [subTotal, setSubTotal] = useState(0);
  const router = useRouter();

  const signOut = () => {
    logout();
    setItemCount(0);
    setCartItemList([]);
    setSubTotal(0);
  };

  const getItemCount = async () => {
    if (user && jwt) {
      try {
        const userCartItemList: CartItemViewModel[] =
          await GlobalAPI.getUserCartItems(user.id, jwt);
        setItemCount(userCartItemList.length);
        setCartItemList(userCartItemList);
      } catch (error) {
        console.error("Error fetching cart items", error);
        setItemCount(0);
        setCartItemList([]);
      }
    }
  };

  const onDeleteCartItem = (id: string) => {
    GlobalAPI.deleteCartItem(id, jwt).then((res) => {
      toast("Item removed!");
      decrementCart();
      getItemCount();
    });
  };

  useEffect(() => {
    let total = 0;
    cartItemList.forEach((e) => {
      total += e.amount;
    });
    setSubTotal(total);
  }, [cartItemList]);

  useEffect(() => {
    if (isLoggedIn) {
      getItemCount();
    }
  }, [isLoggedIn, updateCart]);

  return (
    <div className="shadow-md">
      <div className="max-w-screen-2xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-xl font-bold text-gray-800">
          <Link href="/">MITRA KHAJA GHAR</Link>
        </div>

        <Category />

        <NavMenu />

        <div className="flex gap-3 items-center">
          <h2 className="flex gap-2 items-center text-lg text-gray-700 cursor-pointer">
            <div className="relative">
              <Sheet>
                <SheetTrigger>
                  <div className="pt-2">
                    <ShoppingCart className="h-6 w-6" />
                    <span className="absolute top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {itemCount}
                    </span>
                  </div>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle className="bg-green-600 text-white text-lg p-2 mt-5 font-bold text-center">
                      My Orders
                    </SheetTitle>
                    <SheetDescription className="sr-only">
                      SheetDescription
                    </SheetDescription>
                    <div>
                      <CartItemList
                        cartItemList={cartItemList}
                        onDeleteItem={onDeleteCartItem}
                      />
                    </div>
                  </SheetHeader>
                  <SheetClose asChild>
                    {cartItemList.length > 0 ? (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-lg font-bold text-gray-800">
                            Subtotal
                          </span>
                          <span className="text-xl font-bold text-green-600">
                            Rs. {subTotal}
                          </span>
                        </div>
                        <Button
                          onClick={() =>
                            router.push(jwt ? "/checkout" : "/sign-in")
                          }
                          className="w-full bg-green-600 hover:bg-green-700 text-white transition-colors font-semibold text-md"
                        >
                          Proceed to checkout
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <p className="text-gray-500 text-xl">
                          Your cart is empty
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                          Add some delicious items!
                        </p>
                      </div>
                    )}
                  </SheetClose>
                </SheetContent>
              </Sheet>
            </div>
          </h2>
          {!isLoggedIn ? (
            <Link href={"/sign-in"}>
              <Button>Login</Button>
            </Link>
          ) : (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <CircleUser className="w-12 h-12 p-2 bg-green-100 rounded-full text-green-700 cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel className="flex items-center space-x-3 p-2">
                  <CircleUser className="w-8 h-8 text-gray-400" />
                  <div>
                    <p className="text-sm font-semibold">
                      {user?.username || "User"}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user?.admin && (
                  <Link href={"/dashboard"}>
                    <DropdownMenuItem>
                      <LayoutDashboard className="mr-1 h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>
                  </Link>
                )}
                <Link href={"/my-order"}>
                  <DropdownMenuItem>
                    <ShoppingBag className="mr-1 h-4 w-4" />
                    My Orders
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => signOut()}
                >
                  <LogOut className="mr-1 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
