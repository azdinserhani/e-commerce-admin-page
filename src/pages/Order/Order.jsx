import "./Order.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchIcon from "@mui/icons-material/Search";
import List from "../../components/List/List";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, updateOrder } from "../../redux/ApiCalls";
import { useState } from "react";

const Order = () => {
  const navigate = useNavigate();
  const orders = useSelector((stat) => stat.orders.order);

  console.log(orders);
  const dispatch = useDispatch();
  const ordersRows = orders.map((order) => ({
    id: order._id, // Use _id as the id
    address: order.shippingAddress,
    amount: order.totalAmount / 100 + " $",
    userId: order.userId,
    status: order.orderStatus,
  }));
  const handleDelete = (id) => {
    deleteOrder(dispatch, id);
  };
  const handleChange = (e, id) => {
    const order = {
      orderStatus: e.target.value,
    };
    console.log(order);
    updateOrder(dispatch, order, id);
  };
  const columns = [
    { field: "id", headerName: "ID", width: 250 },
    {
      field: "userId",
      headerName: "userId",
      width: 250,
    },
    { field: "address", headerName: "ADDRESS", width: 200 },
    { field: "amount", headerName: "AMOUNT", width: 100 },
    {
      field: "status",
      headerName: "STATUS",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="action">
            <select
              name="orderStatus"
              id=""
              className="selectAction"
              onChange={(e) => handleChange(e, params.row.id)}
            >
              <option defaultValue={params.row.status}>
                {params.row.status}
              </option>
              <option value="Completed">completed</option>
              <option value="progress">progress</option>
              <option value="delivered">delivered</option>
              <option value="failed">failed</option>
            </select>
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "ACTION",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="action">
            <Link to={"/order/" + params.row.id}>
              <button className="productListEdit">details</button>
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
    <div className="order">
      <div className="header">
        <div className="tittle">
          <h3>Order</h3>
          <p>
            {" "}
            <span onClick={() => navigate("/")}>Home</span>
            <ArrowForwardIosIcon fontSize="sm" /> Order
          </p>
        </div>
        <div className="search">
          <input type="text" placeholder="orderId" />
          <button>
            <SearchIcon />
          </button>
        </div>
      </div>

      <List columns={columns} rows={ordersRows} />
    </div>
  );
};

export default Order;
