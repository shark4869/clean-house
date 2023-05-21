import { getStatus } from "./StatusSlice";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
export const fetchStatus = () => async dispatch => {
  try {
    const response = await axios.get(`${backendUrl}/api/status`);
    dispatch(getStatus(response.data));
  } catch (error) {
    throw error;
  }
};