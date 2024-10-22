import { useContext } from "react";
import "./TopBar.scss";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { DarkModeContext } from "../../context/darkModeContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useSelector } from "react-redux";
const TopBar = () => {
  const { dark, toggle } = useContext(DarkModeContext);
  const user = useSelector((stat) => stat.user.currentUser);

  return (
    <div className="topBar">
      <div className="wrapper">
        <div className="left">
          <h2>Welcome!</h2>
        </div>
        <div className="right">
          <div className="icon" onClick={toggle}>
            {dark ? <LightModeIcon /> : <DarkModeIcon />}
          </div>
          <h2>{ user.info.username }</h2>
          <img
            src="https://img.freepik.com/free-photo/confident-handsome-guy-posing-against-white-wall_176420-32936.jpg?t=st=1726831228~exp=1726834828~hmac=53e1647ce637047006c52940561c11f5fc7260941e2808e93efebf4e62aeecd0&w=826"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
