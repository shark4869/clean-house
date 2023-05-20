import { getStatus } from "./StatusSlice";
import axios from "axios";

export const fetchStatus = () => async dispatch => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/api/status');
    dispatch(getStatus(response.data));
  } catch (error) {
    throw error;
  }
};