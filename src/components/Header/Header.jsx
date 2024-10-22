import { useNavigate } from "react-router-dom";
import "./Header.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Header = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="tittle">
        <h3>{title}</h3>
        <p>
          {" "}
          <span onClick={() => navigate("/")}>Home</span>
          <ArrowForwardIosIcon fontSize="sm" /> {title}
        </p>
      </div>
    </div>
  );
};

export default Header;
