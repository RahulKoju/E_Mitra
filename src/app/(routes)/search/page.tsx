"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";
import ProductItem from "@/app/_components/ProductItem";
import { useSearchProducts } from "@/app/_utils/tanstackQuery";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q");

  // Redirect to 404 if no search query is provided
  if (!searchQuery) {
    return notFound();
  }

  const {
    data: results = [],
    isLoading,
    isError,
    error,
  } = useSearchProducts(searchQuery);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Search Results for "{searchQuery}"
      </h1>

      {isLoading ? (
        <p className="text-gray-500">Loading...</p>
      ) : isError ? (
        <p className="text-red-500">
          Error:{" "}
          {error instanceof Error ? error.message : "Failed to fetch results"}
        </p>
      ) : results.length > 0 ? (
        <ProductItem products={results} />
      ) : (
        <p className="text-gray-500">No products found.</p>
      )}
    </div>
  );
};

export default SearchPage;
