import { useNavigate } from "react-router-dom";
import "./Register.scss";

const Register = () => {
  const navigate = useNavigate()
  return (
    <div className="register">
      <div className="container">
        <div className="right"></div>
        <div className="left">
          <h1>Register Now</h1>
          <form>
            <input type="text" placeholder="username" required />
            <input type="text" placeholder="email" required />
            <input type="text" placeholder="password" required />
            <input type="text" placeholder="confirm password" required />
            <button>Register</button>
          </form>
          <p>
            Do you have an a acount?{" "}
            <span onClick={() => navigate("/login")}>Login Now</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
