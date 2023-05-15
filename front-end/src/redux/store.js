import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "../features/Login/LoginSlice";
import { registerSlice } from "../features/Register/RegisterSlice";

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    register: registerSlice.reducer,
  },
});
export default store;