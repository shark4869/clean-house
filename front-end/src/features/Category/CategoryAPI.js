import { getCategory } from "./CategorySlice";
import axios from "axios";

export const fetchCategory = () => async dispatch => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/api/categories');
    dispatch(getCategory(response.data));
  } catch (error) {
    throw error;
  }
};