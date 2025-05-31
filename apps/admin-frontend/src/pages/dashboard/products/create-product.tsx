import React from "react";
import { Card } from "antd";
import CreateProductForm from "./create-product-form";

const CreateProductPage: React.FC = () => {
  return (
    <Card title="Créer un nouveau produit">
      <CreateProductForm />
    </Card>
  );
};

export default CreateProductPage;