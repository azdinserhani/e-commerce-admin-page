import axios from "axios";

const BASE_URL = "http://localhost:3000";
const persistData = localStorage.getItem("persist:root");
let token = null;

if (persistData) {
  try {
    const parseData = JSON.parse(persistData);
    const user = parseData?.user ? JSON.parse(parseData.user) : null;
    token = user?.currentUser?.accessToken || null;
  } catch (error) {
    console.log("error persisting data :", error);
  }
}
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { Token: `Bearer ${token}` },
});
