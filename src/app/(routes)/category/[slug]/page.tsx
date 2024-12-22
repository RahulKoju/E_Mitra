import CategoryClient from "./_components/CategoryClient";

type Params = {
  params: { slug: string };
};

export default async function CategoryPage({ params }: Params) {
  const { slug } = await params;

  return <CategoryClient slug={slug} />;
}
