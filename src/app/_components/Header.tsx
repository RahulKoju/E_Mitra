import { Button } from "@/components/ui/button";
import { Search, ShoppingCart } from "lucide-react";
import Category from "./Category";
import Link from "next/link";

function Header() {
  return (
    <div className="shadow-md">
      <div className="max-w-screen-2xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-xl font-bold text-gray-800">
          <Link href="/">MITRA</Link>
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
          <Link href={"/sign-in"}>
            <Button>Login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
