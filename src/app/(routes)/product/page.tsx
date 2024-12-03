"use client";
import ProductItem from "@/app/_components/ProductItem";
import GlobalAPI from "@/app/_utils/GlobalAPI";
import { LoaderCircleIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

type Product = {
  id: number;
  documentId: string;
  name: string;
  description: string;
  price: number;
  images: Array<{
    url: string;
  }>;
  slug: string;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
};

function Product() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const data = await GlobalAPI.getAllProducts();
      setProductList(data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Failed to load products. Please try again later.");
      setProductList([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoaderCircleIcon className="animate-spin h-16 w-16 text-green-600" />
        <span className="ml-3 text-green-600 text-xl">Loading products...</span>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Oops! </strong>
        <span className="block sm:inline">{error}</span>
        <button
          onClick={getProducts}
          className="ml-4 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  // Render empty state if no products
  if (productList.length === 0) {
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

      <ProductItem products={productList} />
    </div>
  );
}

export default Product;
