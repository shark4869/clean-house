import { registerRequest, registerSuccess, registerFailure } from "./RegisterSlice";
import axios from "axios";
export const registerAction = (user) => async dispatch => {
  try {
    dispatch(registerRequest());
    const response = await axios.post('http://127.0.0.1:5000/api/register', user,  {
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