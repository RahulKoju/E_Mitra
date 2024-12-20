"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutGrid } from "lucide-react";
import Link from "next/link";
import { useCategories } from "../_utils/tanstackQuery";

function Category() {
  const { data: categories, isLoading, error } = useCategories();
  const validCategories = categories || [];

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <h2 className="hidden md:flex gap-2 items-center p-2 px-5 border rounded-full bg-slate-200 cursor-pointer">
          <LayoutGrid className="h-5 w-5" /> Category
        </h2>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isLoading ? (
          <DropdownMenuItem disabled>Loading...</DropdownMenuItem>
        ) : error ? (
          <DropdownMenuItem disabled>Error loading categories</DropdownMenuItem>
        ) : validCategories.length === 0 ? (
          <DropdownMenuItem disabled>No categories available</DropdownMenuItem>
        ) : (
          validCategories.map((category) => (
            <Link href={`/category/${category.slug}`} key={category.id}>
              <DropdownMenuItem>
                <h2>{category.name}</h2>
              </DropdownMenuItem>
            </Link>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Category;
