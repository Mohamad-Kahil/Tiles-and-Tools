import React from "react";
import ProductList from "@/components/cms/products/ProductList";
import CMSLayout from "@/components/cms/CMSLayout";

const ProductsPage = () => {
  return (
    <CMSLayout>
      <ProductList />
    </CMSLayout>
  );
};

export default ProductsPage;
