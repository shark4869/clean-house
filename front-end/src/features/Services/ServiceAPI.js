import { getAllSerrvice, updateSerrvice, addService, deleteService } from "./ServiceSlice";
import axios from "axios";

export const fetchServices = () => async dispatch => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/api/services');
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
    const response = await axios.put(`http://127.0.0.1:5000/api/service/${id}`, service, config);
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
    const response = await axios.delete(`http://127.0.0.1:5000//api/service/${id}`, {}, config);
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
    const response = await axios.post(`http://127.0.0.1:5000/api/service`, service, config);
    console.log('response:', response.data.message);
    dispatch(addService(response.data.service));
  } catch (error) {
    throw error;
  }
};