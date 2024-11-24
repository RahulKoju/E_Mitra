import React from "react";

type Params = {
  slug: string;
};

type Props = {
  params: Params;
};

function Category({ params }: Props) {
  return <div>category {params.slug}</div>;
}

export default Category;
