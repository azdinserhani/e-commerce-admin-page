import { Link, useNavigate } from "react-router-dom";
import DashBoardCard from "../../components/DashBoardCard/DashBoardCard";
import List from "../../components/List/List";
import "./Product.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteProduct, getAllProduct } from "../../redux/ApiCalls";

const Product = () => {
  const products = useSelector((stat) => stat.product.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("products: ",products);
  useEffect(() => {
    getAllProduct(dispatch);
  }, [dispatch]);
  const productRows = products.map((product) => ({
    id: product._id, // Use _id as the id
    title: product.title,
    desc: product.desc,
    img: product.img,
    category: product.category,
    colors: product.colors,
    price: product.price,
    isStock: product.isStock,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  }));
  
  const handleDelete = (id) => {
    deleteProduct(dispatch, id);
  };
  const columns = [
    { field: "id", headerName: "ID", width: 300 },
    {
      field: "product",
      headerName: "Product",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            <p>{params.row.title}</p>
          </div>
        );
      },
    },
    { field: "isStock", headerName: "STOCK", width: 100 },
    { field: "price", headerName: "PRICE", width: 100 },
    {
      field: "action",
      headerName: "ACTION",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="action">
            <Link to={"/product/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteIcon
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </div>
        );
      },
    },
  ];
  return (
    <div className="product">
      <div className="header">
        <div className="tittle">
          <h3>Product</h3>
          <p>
            {" "}
            <span onClick={() => navigate("/")}>Home</span>
            <ArrowForwardIosIcon fontSize="sm" /> Product
          </p>
        </div>
        <div>
          <button className="add" onClick={() => navigate("/createProduct")}>
            Add Product
          </button>
        </div>
      </div>
      <List rows={productRows} columns={columns} />
    </div>
  );
};

export default Product;
