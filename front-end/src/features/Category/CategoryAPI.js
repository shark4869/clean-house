import { getCategory } from "./CategorySlice";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
export const fetchCategory = () => async dispatch => {
  try {
    const response = await axios.get(`${backendUrl}/api/categories`);
    dispatch(getCategory(response.data));
  } catch (error) {
    throw error;
  }
};