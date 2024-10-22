import "./App.scss";
import SideBar from "./components/SideBar/SideBar";
import TopBar from "./components/TopBar/TopBar.jsx";
import {
  Outlet,
  Navigate,
  createBrowserRouter,
  RouterProvider,
  Link,
} from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Order from "./pages/Order/Order.jsx";
import Product from "./pages/Product/Product.jsx";
import CreateProduct from "./pages/createProduct/CreateProduct.jsx";
import UserList from "./pages/user/UserList.jsx";
import UpdateUser from "./pages/updateUser/UpdateUser.jsx";
import CreateUser from "./pages/createUser/CreateUser.jsx";
import Login from "./pages/Login/Login.jsx";
import { DarkModeContext } from "./context/darkModeContext.jsx";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import UpdateProduct from "./pages/updateProduct/UpdateProduct.jsx";
import OrderDetail from "./pages/orderDetail/OrderDetail.jsx";
function App() {
  const { currentUser, isAuthenticated, error } = useSelector(
    (stat) => stat.user
  );

  const { dark } = useContext(DarkModeContext);
  const [toastShown, setToastShown] = useState(false);
  const Layout = () => (
    <div className={`theme-${dark ? "dark" : "light"}`}>
      <TopBar />
      <div className="container">
        <SideBar />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
  useEffect(() => {
    if (error) {
      toast.error(error, {
        theme: "colored",
        pauseOnFocusLoss: false,
        toastId: "error-toast",
      });
    }
  }, [error]);
  console.log(isAuthenticated);

  const ProtectedRoute = ({ children }) => {
    // Return a loading state while currentUser is being fetched
    if (isAuthenticated === undefined || currentUser === undefined) {
      return <div>Loading...</div>;
    }

    // If the user is not authenticated, redirect to the login page
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    // If the user is authenticated but not an admin, show an error toast and redirect to login
    if (currentUser && currentUser.info && !currentUser.info.isAdmin) {
      toast.error("This page is accessible only to admin users", {
        theme: "colored",
        pauseOnFocusLoss: false,
        toastId: "admin-error-toast",
      });
      return <Navigate to="/login" />;
    }

    // Show success toast only once upon successful login
    if (!toastShown && isAuthenticated && currentUser?.info?.isAdmin) {
      toast.success("Login Success", {
        theme: "colored",
        pauseOnFocusLoss: false,
        toastId: "login-success-toast",
      });
      setToastShown(true);
    }

    // Render the children components for admin users
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { path: "/", element: <Dashboard /> },
        { path: "/order", element: <Order /> },
        { path: "/product", element: <Product /> },
        { path: "/product/:id", element: <UpdateProduct /> },
        { path: "/createProduct", element: <CreateProduct /> },
        { path: "/order/:id", element: <OrderDetail /> },
        { path: "/userList", element: <UserList /> },
        { path: "/user/:id", element: <UpdateUser /> },
        { path: "/createUser", element: <CreateUser /> },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
