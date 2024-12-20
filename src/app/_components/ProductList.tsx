"use client";
import React, { useState } from "react";
import ProductItem from "./ProductItem";
import { Product } from "@/lib/type";

type ProductListProps = {
  productList: Product[];
};

function ProductList({ productList }: ProductListProps) {
  const [visibleProducts, setVisibleProducts] = useState(8);

  const handleShowMore = () => {
    setVisibleProducts((prevVisible) => prevVisible + 8);
  };

  const displayedProducts = productList.slice(0, visibleProducts);
  const hasMoreProducts = visibleProducts < productList.length;

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
