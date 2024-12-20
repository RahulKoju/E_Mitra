import { Category } from "@/lib/type";
import Link from "next/link";
import React from "react";

type CategoryListProps = {
  categoryList: Category[];
  selectedCategory?: string;
};

function TopCategoryList({
  categoryList,
  selectedCategory,
}: CategoryListProps) {
  return (
    <div className="w-full px-7 md:px-20 mt-3">
      <div className="overflow-x-auto scrollbar-hide -mx-7 md:-mx-20">
        <div className="inline-flex gap-5 pb-2 px-7 md:px-20 min-w-full justify-center">
          {categoryList.map((category, index) => (
            <Link
              href={`/category/${category.slug}`}
              key={index}
              className={`flex-shrink-0 flex justify-center items-center bg-green-50 p-6 text-center rounded-lg group hover:cursor-pointer hover:bg-green-100
              ${selectedCategory == category.slug && "bg-green-500"}`}
            >
              <h2 className="text-green-800 text-lg font-semibold whitespace-nowrap transition-transform duration-200 group-hover:scale-110">
                {category.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopCategoryList;
