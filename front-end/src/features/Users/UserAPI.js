import { getUser, getAllUser } from "./UsersSlice";
import axios from "axios";

export const fetchUser = (id) => async dispatch => {
  try {
    const response = await axios.get(`http://127.0.0.1:5000/api/user/${id}`);
    dispatch(getUser(response.data));
  } catch (error) {
    throw error;
  }
};
export const fetchAllUser = () => async dispatch => {
  try {
    const response = await axios.get(`http://127.0.0.1:5000/api/users`);
    dispatch(getAllUser(response.data));
  } catch (error) {
    throw error;
  }
};