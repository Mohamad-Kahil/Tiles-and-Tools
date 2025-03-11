import React from "react";
import { useParams } from "react-router-dom";
import ProductForm from "@/components/cms/products/ProductForm";
import CMSLayout from "@/components/cms/CMSLayout";

const EditProductPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <CMSLayout>
      <ProductForm />
    </CMSLayout>
  );
};

export default EditProductPage;
