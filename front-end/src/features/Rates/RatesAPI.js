import { getRateService, getAllRate, addRate } from "./RateSlice";
import axios from "axios";

export const fetchRateService = (service_id) => async dispatch => {
  try {
    const response = await axios.get(`http://127.0.0.1:5000/api/rate-service/${service_id}`);
    dispatch(getRateService(response.data));
  } catch (error) {
    throw error;
  }
};
export const fetchAllRate = () => async dispatch => {
  try {
    const response = await axios.get(`http://127.0.0.1:5000/api/rates`);
    dispatch(getAllRate(response.data));
  } catch (error) {
    throw error;
  }
};

export const createRate = (data) => async dispatch => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(`http://127.0.0.1:5000/api/rate`, data, config);
    dispatch(addRate(response.data));
    console.log('res:', response.data)
  } catch (error) {
    throw error;
  }
};