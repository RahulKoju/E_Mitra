import GlobalAPI from "@/app/_utils/GlobalAPI";
import React from "react";
import TopCategoryList from "./_components/TopCategoryList";
import ProductList from "@/app/_components/ProductList";

type Params = {
  params: { slug: string };
};

async function Category({ params }: Params) {
  const { slug } = await params;
  const productList = await GlobalAPI.getProductsByCategory(slug);
  const categoryList = await GlobalAPI.getCategoryList();
  const formatCategoryName = (slug: string) => {
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  return (
    <div>
      <h2 className="p-4 bg-green-700 text-white text-center font-bold text-3xl">
        {formatCategoryName(slug)}
      </h2>

      <TopCategoryList categoryList={categoryList} selectedCategory={slug} />

      <div className="max-w-7xl mx-auto px-8">
        <ProductList productList={productList} />
      </div>
    </div>
  );
}

export default Category;
