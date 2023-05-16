import { getRoles } from "./RoleSlice";
import axios from "axios";

export const fetchRoles = () => async dispatch => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/api/roles');
    dispatch(getRoles(response.data));
  } catch (error) {
    throw error;
  }
};