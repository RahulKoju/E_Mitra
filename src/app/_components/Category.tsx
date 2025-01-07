import { useCategories } from "../_utils/tanstackQuery";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Category() {
  const { data: categories, isLoading, error } = useCategories();
  const pathname = usePathname();
  const validCategories = categories || [];

  const isCurrentCategory = (slug: string) => pathname === `/category/${slug}`;

  return (
    <div>
      {/* Desktop: Dropdown Menu */}
      <div className="hidden lg:block">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 hover:bg-transparent hover:text-green-600 text-base"
            >
              Categories
              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white p-2" align="start">
            <DropdownMenuLabel className="text-base font-bold text-gray-700 px-2 py-2">
              Browse Categories
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-2" />

            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <div className="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : error ? (
              <DropdownMenuItem disabled className="text-red-500">
                Error loading categories
              </DropdownMenuItem>
            ) : validCategories.length === 0 ? (
              <DropdownMenuItem disabled className="text-gray-500">
                No categories available
              </DropdownMenuItem>
            ) : (
              validCategories.map((category) => {
                const isActive = isCurrentCategory(category.slug);
                return (
                  <Link
                    href={`/category/${category.slug}`}
                    key={category.id}
                    className="block relative"
                  >
                    <DropdownMenuItem
                      className={cn(
                        "rounded-md transition-all duration-200",
                        "hover:bg-green-50 hover:text-green-600 focus:bg-green-50 focus:text-green-600",
                        "cursor-pointer py-2.5 px-3 my-1 font-medium",
                        isActive
                          ? "text-green-600 bg-green-50"
                          : "text-gray-600"
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        {category.name}
                        {isActive && (
                          <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                        )}
                      </div>
                    </DropdownMenuItem>
                  </Link>
                );
              })
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile: List of Categories */}
      <div className="lg:hidden">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Categories</h2>
        <div className="space-y-3">
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <div className="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : error ? (
            <p className="text-red-500">Error loading categories</p>
          ) : validCategories.length === 0 ? (
            <p className="text-gray-500">No categories available</p>
          ) : (
            validCategories.map((category) => {
              const isActive = isCurrentCategory(category.slug);
              return (
                <Link
                  href={`/category/${category.slug}`}
                  key={category.id}
                  className={cn(
                    "block px-4 py-3 rounded-lg transition-all",
                    isActive
                      ? "bg-green-50 text-green-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <div className="flex items-center">
                    <span className="text-lg">{category.name}</span>
                    {isActive && (
                      <span className="ml-2 w-1.5 h-1.5 bg-green-600 rounded-full" />
                    )}
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Category;
