import { loginLoading, LoginSuccess, LoginFailed, Logout } from "./LoginSlice";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const loginApi = async (username, password) => {
  try {
    const response = await axios.post(`${backendUrl}/api/login`, {
      username,
      password,
    });
    return response.data;
  } catch (e) {
    console.log("check error: ", e.message);
  }
};
export const loginAction = (username, password) => async (dispatch) => {
  try {
    dispatch(loginLoading());
    const data = await loginApi(username, password);
    console.log("check data login: ", data);
    // localStorage.setItem("id", data.account.id);
    dispatch(LoginSuccess(data));
  } catch (e) {
    dispatch(LoginFailed(e.message));
    console.log("error: ", e.message);
  }
};
export const handleLogout = () => async (dispatch) => {
  try {
    dispatch(Logout());
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(`${backendUrl}/api/logout`, {}, config);
    console.log(response.data.message);
  } catch (e) {
    console.error("error: ", e.message);
  }
};