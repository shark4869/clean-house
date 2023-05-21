import { registerRequest, registerSuccess, registerFailure } from "./RegisterSlice";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
export const registerAction = (user) => async dispatch => {
  try {
    dispatch(registerRequest());
    const response = await axios.post(`${backendUrl}/api/register`, user,  {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('check mesage: ', response.data)
    dispatch(registerSuccess(response.data));
  } catch (e) {
    dispatch(registerFailure(e.message));
    console.log("error: ", e.message);
  }
};