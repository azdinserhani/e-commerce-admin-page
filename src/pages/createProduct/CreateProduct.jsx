import { useState } from "react";
import "./CreateProduct.scss";
import CreateProductArea from "../../components/CreateProductArea/CreateProductArea";

const CreateProduct = () => {
  const [productType, setProductType] = useState("phone");

  return (
    <div className="createProduct">
      <label htmlFor="productType">Product Type</label>
      <select
        name="productType"
        id="productType"
        onChange={(e) => setProductType(e.target.value)}
      >
        <option value="phone">phone</option>
        <option value="laptop">laptop</option>
        <option value="headphone">headphone</option>
        <option value="watch">watch</option>
      </select>
      <CreateProductArea productType={productType}/>
    </div>
  );
};

export default CreateProduct;
