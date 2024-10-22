import "./UpdateProduct.scss";
import UpdateProductArea from "../../components/UpdateProductArea/UpdateProductArea";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { userRequest } from "../../axios";

const UpdateProduct = () => {
  const [product, setProduct] = useState({});
  const location = useLocation().pathname;
  const id = location.split("/")[2];

  useEffect(() => {
    const getProduct = async () => {
      const res = await userRequest.get("/api/products/find/" + id);
      console.log(res.data.data);
      setProduct(res.data.data);
    };
    getProduct();
  }, []);
  console.log(product.category);

  return (
    <div className="updateProduct">
      <UpdateProductArea productType={product.category} product={product}/>
    </div>
  );
};

export default UpdateProduct;
