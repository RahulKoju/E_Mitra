import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import Link from "next/link";

function NavMenu() {
  return (
    <div>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-6 text-gray-700 font-semibold">
        <Link
          href="/product"
          className="hover:text-green-600 transition-colors font-medium"
        >
          Products
        </Link>
        <Link
          href="/about"
          className="hover:text-green-600 transition-colors font-medium"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="hover:text-green-600 transition-colors font-medium"
        >
          Contact
        </Link>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden mt-3">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <button
              className="text-gray-700 hover:text-green-600 transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              <Menu size={24} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-48 bg-white shadow-md rounded-md"
            align="start"
          >
            <DropdownMenuItem asChild>
              <Link
                href="/product"
                className="hover:text-green-600 transition-colors font-medium"
              >
                Products
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/about"
                className="hover:text-green-600 transition-colors font-medium"
              >
                About
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/contact"
                className="hover:text-green-600 transition-colors font-medium"
              >
                Contact
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default NavMenu;
