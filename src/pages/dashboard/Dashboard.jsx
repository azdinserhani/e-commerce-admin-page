import "./Dashboard.scss";
import DashBoardCard from "../../components/DashBoardCard/DashBoardCard";
import Charts from "../../components/Charts/Charts";
import LatestProduct from "../../components/LatestProduct/LatestProduct";
import { useDispatch, useSelector } from "react-redux";

import {
  BarChart,
  XAxis,
  YAxis,
  Bar,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../axios";
import { getAllOrders } from "../../redux/ApiCalls";
const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const orders = useSelector((stat) => stat.orders.order);

  const dispatch = useDispatch();
  const MONTHS = useMemo(() => [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await userRequest.get("/api/user/stats/");
        const topProducts = await userRequest.get(
          "/api/products/top-selling-products"
        );
        setTopSellingProducts(topProducts.data.data);
        const formattedData = res.data.data.map((item) => ({
          name: MONTHS[item._id - 1],
          "Active User": item.total,
          mountIndex: item._id - 1,
        }));
        getAllOrders(dispatch);
        setUserData(formattedData);
      } catch (error) {}
    };
    getData();
  }, []);
  const data = [
    {
      name: "Page A",
      quantity: 4000,
    },
    {
      name: "Page B",
      quantity: 3000,
    },
    {
      name: "Page C",
      quantity: 2000,
    },
    {
      name: "Page D",
      quantity: 2780,
    },
    {
      name: "Page E",
      quantity: 1890,
    },
  ];
  console.log(topSellingProducts);

  const totalActiveUsers = userData.reduce((total, current) => {
    return total + current["Active User"];
  }, 0);
  return (
    <div className="dashBoard">
      <div className="top">
        <DashBoardCard
          title={"Total users"}
          number={totalActiveUsers}
          type={"user"}
        />
        <DashBoardCard title={"Total orders"} number={orders.length} />
      </div>
      <div className="charts">
        <Charts data={userData} />
      </div>
      <div className="productChart">
        <LatestProduct data={topSellingProducts} />
        <ResponsiveContainer width={"100%"} height={500}>
          <BarChart data={topSellingProducts} className="barChart">
            <CartesianGrid strokeDasharray="3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalQuantity" fill="#008080" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
