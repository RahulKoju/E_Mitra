"use client";
import { Product } from "@/lib/type";
import { useState } from "react";
import ProductItem from "./ProductItem";
import { LoaderCircleIcon } from "lucide-react";

type ProductListProps = {
  productList: Product[];
  isLoading?: boolean;
  error?: Error | null;
};

function ProductList({ productList, isLoading, error }: ProductListProps) {
  const [visibleProducts, setVisibleProducts] = useState(8);

  const handleShowMore = () => {
    setVisibleProducts((prevVisible) => prevVisible + 8);
  };

  const displayedProducts = productList.slice(0, visibleProducts);
  const hasMoreProducts = visibleProducts < productList.length;

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

  return (
    <div className="mt-8">
      <h2 className="text-green-600 font-bold text-2xl mb-6">
        Our Popular Products
      </h2>

      <ProductItem products={displayedProducts} />

      {hasMoreProducts && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleShowMore}
            className="bg-green-500 text-white px-6 py-3 rounded-lg 
            hover:bg-green-600 active:bg-green-700 
            transform active:scale-95 transition-all duration-200
            shadow-md hover:shadow-lg"
          >
            Show More Products
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductList;
