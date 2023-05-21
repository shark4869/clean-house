import { getUser, getAllUser } from "./UsersSlice";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
export const fetchUser = (id) => async dispatch => {
  try {
    const response = await axios.get(`${backendUrl}/api/user/${id}`);
    dispatch(getUser(response.data));
  } catch (error) {
    throw error;
  }
};
export const fetchAllUser = () => async dispatch => {
  try {
    const response = await axios.get(`${backendUrl}/api/users`);
    dispatch(getAllUser(response.data));
  } catch (error) {
    throw error;
  }
};