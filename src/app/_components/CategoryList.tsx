"use client";
import Link from "next/link";
import { useCategories } from "../_utils/tanstackQuery";
import { LoaderCircleIcon } from "lucide-react";

function CategoryList() {
  const { data: categories = [], isLoading, error } = useCategories();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoaderCircleIcon className="animate-spin h-16 w-16 text-green-600" />
        <span className="ml-3 text-green-600 text-xl">
          Loading categories...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Oops! </strong>
        <span className="block sm:inline">
          {error instanceof Error ? error.message : "An error occurred"}
        </span>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-green-600 font-bold text-2xl">Order By Category</h2>
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-5 mt-3">
        {categories.map((category) => (
          <Link
            href={`/category/${category.slug}`}
            key={category.slug}
            className="flex justify-center items-center bg-green-50 py-4 px-3 text-center rounded-lg group hover:cursor-pointer hover:bg-green-100"
          >
            <h2 className="text-green-800 text-lg font-semibold transition-transform duration-200 group-hover:scale-110">
              {category.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
