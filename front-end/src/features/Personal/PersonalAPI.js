import { updateUser } from "./PersonalSlice";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
export const editUser = (userId, infor) => async dispatch => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(`${backendUrl}/api/user/${userId}`, infor, config);
    dispatch(updateUser(response.data.user));
    // console.log('check mesage: ', response.data)
  } catch (e) {
    console.log("error: ", e.message);
  }
};

export const editAvatar = (id, avatar) => async dispatch => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(`${backendUrl}/api/user/avatar/${id}`, avatar, config);
    dispatch(updateUser(response.data.user));
    console.log('check mesage: ', response.data)
  } catch (e) {
    console.log("error: ", e.message);
  }
};
