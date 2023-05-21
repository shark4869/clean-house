import { getRoles } from "./RoleSlice";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
export const fetchRoles = () => async dispatch => {
  try {
    const response = await axios.get(`${backendUrl}/api/roles`);
    dispatch(getRoles(response.data));
  } catch (error) {
    throw error;
  }
};