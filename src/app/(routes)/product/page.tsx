"use client";
import ProductItem from "@/app/_components/ProductItem";
import { useAllProducts } from "@/app/_utils/tanstackQuery";
import { LoaderCircleIcon } from "lucide-react";

function Product() {
  const { data: products, error, isLoading } = useAllProducts();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoaderCircleIcon className="animate-spin h-16 w-16 text-green-600" />
        <span className="ml-3 text-green-600 text-xl">Loading products...</span>
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

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-green-600 font-bold text-2xl mb-4">
          Our Popular Products
        </h2>
        <p className="text-gray-600">No products available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-8">
      <h2 className="text-green-600 font-bold text-2xl mb-6">
        Our Popular Products
      </h2>

      <ProductItem products={products} />
    </div>
  );
}

export default Product;
