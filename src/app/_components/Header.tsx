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
import { CircleUser, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUpdateCartContext } from "../_context/UpdateCartContext";
import GlobalAPI from "../_utils/GlobalAPI";
import Category from "./Category";

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

type User = {
  id: number;
  username?: string;
  email?: string;
};

type CartItemViewModel = {
  name: string;
  quantity: number;
  amount: number;
  image: string;
  actualPrice: number;
  id: string;
};

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [jwt, setJwt] = useState<string | null>(null);
  const { updateCart, setUpdateCart } = useUpdateCartContext();
  const [cartItemList, setCartItemList] = useState<CartItemViewModel[]>([]);
  const [subTotal, setSubTotal] = useState(0);
  const router = useRouter();

  const signOut = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    setUser(null);
    setJwt(null);
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
      getItemCount();
    });
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userString = sessionStorage.getItem("user");

    setIsLoggedIn(!!token);

    if (userString) {
      try {
        setUser(JSON.parse(userString));
      } catch (error) {
        console.error("Error parsing user data", error);
      }
    }

    setJwt(token);
  }, []);

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
        <div className="relative md:flex gap-3 border rounded-full p-2 hidden">
          <Search className="text-gray-700 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            className="pl-10 outline-none w-full"
            type="text"
            placeholder="Search for products..."
          />
        </div>
        <div className="flex gap-3 items-center">
          <h2 className="flex gap-2 items-center text-lg text-gray-700 cursor-pointer">
            <div className="relative">
              <Sheet>
                <SheetTrigger>
                  <div>
                    <ShoppingCart className="h-6 w-6" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
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
                      {/* Description */}
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
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>My Orders</DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => signOut()}
                >
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
