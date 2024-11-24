import GlobalAPI from "@/app/_utils/GlobalAPI";
import React from "react";
import TopCategoryList from "./_components/TopCategoryList";
import ProductList from "@/app/_components/ProductList";

type Params = {
  slug: string;
};

type Props = {
  params: Params;
};

async function Category({ params }: Props) {
  const productList = await GlobalAPI.getProductsByCategory(params.slug);
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
        {formatCategoryName(params.slug)}
      </h2>

      <TopCategoryList
        categoryList={categoryList}
        selectedCategory={params.slug}
      />

      <div className="max-w-7xl mx-auto px-8">
        <ProductList productList={productList} />
      </div>
    </div>
  );
}

export default Category;
