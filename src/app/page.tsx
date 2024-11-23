import CategoryList from "./_components/CategoryList";
import ProductList from "./_components/ProductList";
import Slider from "./_components/Slider";
import GlobalAPI from "./_utils/GlobalAPI";

export default async function Home() {
  const sliderList = await GlobalAPI.getSlider();
  const categoryList = await GlobalAPI.getCategoryList();
  const productList = await GlobalAPI.getAllProducts();
  return (
    <div className="max-w-screen-2xl mx-auto md:p-10 px-16 p-5 md:overflow-hidden">
      <Slider sliderList={sliderList} />
      <CategoryList categoryList={categoryList} />
      <ProductList productList={productList} />
    </div>
  );
}
