"use client";
import { Button } from "@/components/ui/button";
import { CircleUser, Search, ShoppingCart } from "lucide-react";
import Category from "./Category";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const signOut = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(false);
    setIsLoggedIn(!!token);
  }, []);

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
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </div>
          </h2>
          {!isLoggedIn ? (
            <Link href={"/sign-in"}>
              <Button>Login</Button>
            </Link>
          ) : (
            <DropdownMenu>
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
