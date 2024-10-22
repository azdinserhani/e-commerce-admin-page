import "./UpdateUser.scss";
import Header from "../../components/Header/Header";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { userRequest } from "../../axios";
import { toast } from "react-toastify";

const UpdateUser = () => {
  const [user, setUser] = useState({});
  const location = useLocation().pathname;
  const id = location.split("/")[2];
  useEffect(() => {
    const fetchUser = async () => {
      const res = await userRequest.get("/api/user/find/" + id);
      setUser(res.data.data);
    };
    fetchUser();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser, // Spread the previous state
      [name]: value, // Update only the changed property
    }));
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await userRequest.put("/api/user/" + id, user);
      setUser(res.data.data);
      toast.success("User has been updated", {
        theme: "colored",
        pauseOnFocusLoss: false,
        toastId: 1,
      });
    } catch (error) {
      toast.error("Something was wrong", {
        theme: "colored",
        pauseOnFocusLoss: false,
        toastId: 1,
      });
    }
  };

  return (
    <div className="updateUser">
      <Header title={"Edit User"} />
      <div className="mainContainer">
        <form action="">
          <div className="inputItem">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              placeholder="username"
              value={user.username}
              name="username"
              onChange={handleChange}
            />
          </div>
          <div className="inputItem">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              placeholder="Email"
              value={user.email}
              name="email"
              onChange={(e) => handleChange}
            />
          </div>
          <div className="inputItem">
            <label htmlFor="role">Role:</label>

            <select name="isAdmin" id="role" onChange={handleChange}>
              <option value="true">Admin</option>
              <option value="false" selected={!user.isAdmin}>
                user
              </option>
            </select>
          </div>
          <button onClick={handleUpdate}>Save</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
