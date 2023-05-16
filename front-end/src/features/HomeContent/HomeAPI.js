import { getBaner } from "./HomeSlice";
import axios from "axios";

export const fetchBaner = () => async dispatch => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/api/banners');
    dispatch(getBaner(response.data));
  } catch (error) {
    throw error;
  }
};