import "./sideBar.scss";
import { IconButton } from "@mui/material";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Link, useNavigate } from "react-router-dom";
import Logout from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/userSlice";
const SideBar = () => {
  const [collapsed, setCollapse] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("persist:root");
    dispatch(logOut());
    navigate("/login");
  };
  return (
    <div>
      <Sidebar
        collapsed={collapsed}
        className="sidebar"
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: "#008080", // Removes default sidebar background
          },
        }}
      >
        {collapsed ? (
          <IconButton onClick={() => setCollapse(!collapsed)} className="icon">
            <MenuIcon />
          </IconButton>
        ) : (
          <div className="header">
            <h1>ElecAzdine</h1>

            <IconButton
              onClick={() => setCollapse(!collapsed)}
              className="icon"
            >
              <CloseOutlinedIcon />
            </IconButton>
          </div>
        )}

        <Menu className="menu" closeOnClick={true}>
          <MenuItem
            className="menu-item"
            icon={<DashboardOutlinedIcon />}
            component={<Link to="/" />}
          >
            Dashboard{" "}
          </MenuItem>
          <SubMenu
            label="Products"
            className="subMenu"
            icon={<ShoppingBasketOutlinedIcon />}
          >
            <MenuItem component={<Link to="/product" />}> List </MenuItem>

            <MenuItem component={<Link to="/createProduct" />}>
              {" "}
              Create{" "}
            </MenuItem>
          </SubMenu>
          <MenuItem
            className="menu-item"
            icon={<Inventory2OutlinedIcon />}
            component={<Link to="/order" />}
          >
            Order{" "}
          </MenuItem>

          <SubMenu
            label="Users"
            icon={<PersonOutlineOutlinedIcon />}
            className="subMenu"
          >
            <MenuItem component={<Link to="/userList" />}> List </MenuItem>
            <MenuItem component={<Link to="/createUser" />}> create </MenuItem>
          </SubMenu>
          <MenuItem
            icon={<Logout />}
            className="logOut"
            onClick={() => handleLogout()}
          >
            Log out
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SideBar;
