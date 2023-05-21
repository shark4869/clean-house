import { getAllSerrvice, updateSerrvice, addService, deleteService } from "./ServiceSlice";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
export const fetchServices = () => async dispatch => {
  try {
    const response = await axios.get(`${backendUrl}/api/services`);
    dispatch(getAllSerrvice(response.data));
  } catch (error) {
    throw error;
  }
};
export const editService = (id, service) => async dispatch => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(`${backendUrl}/api/service/${id}`, service, config);
    console.log('response:', response.data);
    dispatch(updateSerrvice(response.data));
  } catch (error) {
    throw error;
  }
};

export const removeService = (id) => async dispatch => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(`${backendUrl}/api/service/${id}`, {}, config);
    console.log('response:', response.data.message);
    dispatch(deleteService(id));
  } catch (error) {
    throw error;
  }
};

export const CreateService = (service) => async dispatch => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(`${backendUrl}/api/service`, service, config);
    console.log('response:', response.data.message);
    dispatch(addService(response.data.service));
  } catch (error) {
    throw error;
  }
};