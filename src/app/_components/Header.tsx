import { Button } from "@/components/ui/button";
import { LayoutGrid, Search, ShoppingBag, ShoppingCart } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React from "react";

function Header() {
  return (
    <div className="py-4 flex items-center justify-between shadow-md">
      <div className="text-xl font-bold text-gray-800">MITRA</div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <h2 className="hidden md:flex gap-2 items-center p-2 px-5 border rounded-full bg-slate-200 cursor-pointer">
              <LayoutGrid className="h-5 w-5" /> Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="md:flex gap-3 border rounded-full p-2 hidden">
        <Search className="text-gray-700" />
        <input className="outline-none" type="text" placeholder="Search" />
      </div>
      <div className="flex gap-3 items-center">
        <h2 className="flex gap-2 items-center text-lg text-gray-700">
          <ShoppingCart /> 0
        </h2>
        <Button>Login</Button>
      </div>
    </div>
  );
}

export default Header;
