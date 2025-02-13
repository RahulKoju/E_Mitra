"use client";
import CategoryList from "./_components/CategoryList";
import Faq from "./_components/Faq";
import ProductList from "./_components/ProductList";
import Slider from "./_components/Slider";
import { useAllProducts } from "./_utils/tanstackQuery";

export default function Home() {
  const { data: products = [], isLoading, error } = useAllProducts();
  return (
    <div className="max-w-screen-2xl mx-auto md:p-10 px-16 p-5 md:overflow-hidden">
      <Slider />
      <CategoryList />
      <ProductList
        productList={products}
        isLoading={isLoading}
        error={error as Error | null}
      />
      <Faq />
    </div>
  );
}
