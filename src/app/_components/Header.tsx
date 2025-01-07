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
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUpdateCart } from "../_context/UpdateCartContext";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "../_context/AuthContext";
import { useDeleteCartItem, useUserCartItems } from "../_utils/tanstackQuery";
import CartItemList from "./CartItemList";
import Category from "./Category";
import NavMenu from "./NavMenu";
import Search from "./Search";

function Header() {
  const { isLoggedIn, user, jwt, logout } = useAuth();
  const { updateCart, decrementCart } = useUpdateCart();
  const [subTotal, setSubTotal] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const { data: cartItem = [] } = useUserCartItems(
    isLoggedIn && user?.id ? user.id : null,
    jwt
  );

  const { mutate: deleteCartItem } = useDeleteCartItem();

  const signOut = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  const onDeleteCartItem = (id: string) => {
    if (!jwt) return;
    deleteCartItem(
      { id, jwt },
      {
        onSuccess: () => {
          toast("Item removed");
          decrementCart();
        },
      }
    );
  };

  useEffect(() => {
    let total = 0;
    cartItem.forEach((e) => {
      total += e.amount;
    });
    setSubTotal(total);
  }, [cartItem]);

  // Automatically closes the mobile menu whenever the user navigates to a different route
  // (e.g., using the browser's back/forward buttons or programmatic navigation).
  // This ensures the menu does not stay open unintentionally across route changes.
  // The event listener is properly cleaned up when the component unmounts to prevent memory leaks.
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMobileMenuOpen(false);
    };
    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-screen-2xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>

          <Link
            href="/"
            className="text-xl md:text-2xl font-bold text-gray-800 hover:text-green-600 transition-colors"
          >
            MITRA KHAJA GHAR
          </Link>

          <div className="hidden lg:flex items-center flex-1 gap-5 mx-5 justify-center">
            <div className="w-full max-w-md">
              <Search />
            </div>
            <Category />
            <NavMenu />
          </div>

          <div className="flex gap-4 items-center">
            <Sheet>
              <SheetTrigger className="relative group">
                <div className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <ShoppingCart className="h-6 w-6 text-gray-700 group-hover:text-green-600 transition-colors" />
                  {cartItem.length > 0 && (
                    <span className="absolute top-0 right-0 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center transform -translate-y-1 translate-x-1">
                      {cartItem.length}
                    </span>
                  )}
                </div>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="bg-green-600 text-white text-lg p-3 rounded-lg mt-5 font-bold text-center">
                    My Orders
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    Cart Items
                  </SheetDescription>
                  <div className="mt-4">
                    <CartItemList
                      cartItemList={cartItem}
                      onDeleteItem={onDeleteCartItem}
                    />
                  </div>
                </SheetHeader>
                <SheetClose asChild>
                  {cartItem.length > 0 ? (
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
                        className="w-full bg-green-600 hover:bg-green-700 text-white transition-colors font-semibold text-md h-12"
                      >
                        Proceed to checkout
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <ShoppingCart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
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

            {!isLoggedIn ? (
              <Link href="/sign-in">
                <Button className="bg-green-600 hover:bg-green-700 text-white transition-colors">
                  Login
                </Button>
              </Link>
            ) : (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <div className="p-2 hover:bg-green-50 rounded-full transition-colors cursor-pointer">
                    <CircleUser className="w-8 h-8 text-green-600" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel className="flex items-center space-x-3 p-4">
                    <CircleUser className="w-10 h-10 text-green-600" />
                    <div>
                      <p className="text-sm font-semibold">
                        {user?.username || "User"}
                      </p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {user?.admin && (
                    <Link href="/dashboard">
                      <DropdownMenuItem className="p-3 cursor-pointer">
                        <LayoutDashboard className="mr-3 h-4 w-4" />
                        Dashboard
                      </DropdownMenuItem>
                    </Link>
                  )}
                  <Link href="/my-order">
                    <DropdownMenuItem className="p-3 cursor-pointer">
                      <ShoppingBag className="mr-3 h-4 w-4" />
                      My Orders
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem
                    className="p-3 cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={signOut}
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        <div
          className={`
    lg:hidden fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out
    ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
  `}
        >
          <div className="flex flex-col h-full bg-white">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <Link href="/" className="text-2xl font-bold text-gray-800">
                MITRA KHAJA GHAR
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            <div className="p-4 border-b border-gray-100">
              <Search />
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                <Category />
                <div className="mt-6">
                  <h2 className="text-xl font-bold text-gray-800">Pages</h2>
                  <NavMenu />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 p-4">
              {!isLoggedIn ? (
                <Link href="/sign-in">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white transition-colors">
                    Login
                  </Button>
                </Link>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-2">
                    <CircleUser className="w-10 h-10 text-green-600" />
                    <div>
                      <p className="font-semibold">
                        {user?.username || "User"}
                      </p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                  <div>
                    {user?.admin && (
                      <Link href="/dashboard">
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          Dashboard
                        </Button>
                      </Link>
                    )}
                    <Link href="/my-order">
                      <Button variant="ghost" className="w-full justify-start">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        My Orders
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={signOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
