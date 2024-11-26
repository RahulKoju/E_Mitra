import React from "react";
import ProductItem from "./ProductItem";

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

type ProductListProps = {
  productList: Product[];
};

function ProductList({ productList }: ProductListProps) {
  const recentProducts = productList.slice(0, 8);

  return (
    <div className="mt-8">
      <h2 className="text-green-600 font-bold text-2xl">
        Our Popular Products
      </h2>
      <ProductItem products={recentProducts} />
    </div>
  );
}

export default ProductList;
