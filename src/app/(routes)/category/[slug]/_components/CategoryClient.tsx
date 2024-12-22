"use client";
import ProductList from "@/app/_components/ProductList";
import {
  useCategories,
  useProductsByCategory,
} from "@/app/_utils/tanstackQuery";
import React from "react";
import TopCategoryList from "./TopCategoryList";
import { LoaderCircleIcon } from "lucide-react";

interface CategoryClientProps {
  slug: string;
}

const CategoryClient: React.FC<CategoryClientProps> = ({ slug }) => {
  const { data: productList, isLoading: productsLoading } =
    useProductsByCategory(slug);
  const { data: categoryList, isLoading: categoriesLoading } = useCategories();

  const formatCategoryName = (slug: string) => {
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (productsLoading || categoriesLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoaderCircleIcon className="animate-spin h-16 w-16 text-green-600" />
        <span className="ml-3 text-green-600 text-xl">Loading products...</span>
      </div>
    );
  }

  return (
    <div>
      <h2 className="p-4 bg-green-700 text-white text-center font-bold text-3xl">
        {formatCategoryName(slug)}
      </h2>

      {categoryList && (
        <TopCategoryList categoryList={categoryList} selectedCategory={slug} />
      )}

      <div className="max-w-7xl mx-auto px-8">
        {productList && <ProductList productList={productList} />}
      </div>
    </div>
  );
};

export default CategoryClient;
