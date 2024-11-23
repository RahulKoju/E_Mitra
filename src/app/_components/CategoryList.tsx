type Category = {
  id: number;
  name: string;
  slug: string;
};

type CategoryListProps = {
  categoryList: Category[];
};

function CategoryList({ categoryList }: CategoryListProps) {
  return (
    <div className="mt-8">
      <h2 className="text-green-600 font-bold text-2xl">Order By Category</h2>
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-5 mt-3">
        {categoryList.map((category, index) => (
          <div
            key={index}
            className="flex justify-center items-center bg-green-50 py-4 px-3 text-center rounded-lg group hover:cursor-pointer hover:bg-green-100"
          >
            <h2 className="text-green-800 text-lg font-semibold transition-transform duration-200 group-hover:scale-110">
              {category.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
