import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/ApiCalls";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, user);
    navigate("/");
  };
  return (
    <div className="login">
      <div className="container">
        <div className="right"></div>
        <div className="left">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="username"
              required
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <input
              type="text"
              placeholder="password"
              required
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
