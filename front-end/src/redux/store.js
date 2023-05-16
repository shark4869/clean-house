import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "../features/Login/LoginSlice";
import { registerSlice } from "../features/Register/RegisterSlice";
import { personalSlice } from "../features/Personal/PersonalSlice";
import { roleSlice } from "../features/GetRole/RoleSlice";
import { userSlice } from "../features/Users/UsersSlice";
import { homeSlice } from "../features/HomeContent/HomeSlice";

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    register: registerSlice.reducer,
    personal: personalSlice.reducer,
    roles: roleSlice.reducer,
    users: userSlice.reducer,
    home: homeSlice.reducer
  },
});
export default store;