import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "../features/Login/LoginSlice";

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
  },
});
export default store;