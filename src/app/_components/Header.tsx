import { Button } from "@/components/ui/button";
import { Search, ShoppingCart } from "lucide-react";
import Category from "./Category";

function Header() {
  return (
    <div className="py-4 flex items-center justify-between shadow-md">
      <div className="text-xl font-bold text-gray-800">MITRA</div>
      <Category />
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
