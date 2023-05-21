import { getBaner } from "./HomeSlice";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
export const fetchBaner = () => async dispatch => {
  try {
    const response = await axios.get(`${backendUrl}/api/banners`);
    dispatch(getBaner(response.data));
  } catch (error) {
    throw error;
  }
};