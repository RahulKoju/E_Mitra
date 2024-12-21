import CategoryList from "./_components/CategoryList";
import ProductList from "./_components/ProductList";
import Slider from "./_components/Slider";

export default async function Home() {
  return (
    <div className="max-w-screen-2xl mx-auto md:p-10 px-16 p-5 md:overflow-hidden">
      <Slider />
      <CategoryList />
      <ProductList />
    </div>
  );
}
