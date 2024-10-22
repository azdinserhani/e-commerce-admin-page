import "./UserList.scss";
import Header from "../../components/Header/Header";
import List from "../../components/List/List";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllUser } from "../../../../api/Controller/user";
import {
  getUsersError,
  getUsersStart,
  getUsersSuccuss,
} from "../../redux/usersSlice";
import { userRequest } from "../../axios";
import { deleteUser } from "../../redux/ApiCalls";

const UserList = () => {
  const users = useSelector((stat) => stat.users.users);
  const dispatch = useDispatch();

  const fetchUsers = async () => {
    dispatch(getUsersStart());
    try {
      const res = await userRequest.get("/api/user/");
      console.log(res.data);
      dispatch(getUsersSuccuss(res.data.data));
    } catch (error) {
      console.log(error);

      dispatch(getUsersError());
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const userRows = users.map((user) => ({
    id: user._id, // Use _id as the id
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin,
    createdAt: user.createdAt,
  }));
  const handleDelete = (id) => {
    deleteUser(dispatch,id);
  };
  
const columns = [
  { field: "id", headerName: "ID", width: 250 },
  {
    field: "username",
    headerName: "Username",
    width: 200,
  },
  { field: "email", headerName: "Email", width: 200 },
  {
    field: "isAdmin",
    headerName: "Role",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="role">
          {params.row.isAdmin ? (
            <p className="admin">Admin</p>
          ) : (
            <p className="costumer">Costumer</p>
          )}
        </div>
      );
    },
  },
  { field: "createdAt", headerName: "Created At", width: 150 },
  {
    field: "action",
    headerName: "ACTION",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
          <Link to={"/user/" + params.row.id}>
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
    <div className="userList">
      <div className="header">
        <Header title={"User"} />
        <div className="search">
          <input type="text" placeholder="User id" />
          <button>
            <SearchIcon />
          </button>
        </div>
      </div>
      <List columns={columns} rows={userRows} />
    </div>
  );
};

export default UserList;
