import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "../features/Login/LoginSlice";
import { registerSlice } from "../features/Register/RegisterSlice";
import { personalSlice } from "../features/Personal/PersonalSlice";
import { roleSlice } from "../features/GetRole/RoleSlice";
import { userSlice } from "../features/Users/UsersSlice";
import { homeSlice } from "../features/HomeContent/HomeSlice";
import { serviceSlice } from "../features/Services/ServiceSlice";
import { categorySlice } from "../features/Category/CategorySlice";
import { bookSlice } from "../features/Books/BookSlice";
import { rateSlice } from "../features/Rates/RateSlice";
import { statusSlice } from "../features/Status/StatusSlice";

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    register: registerSlice.reducer,
    personal: personalSlice.reducer,
    roles: roleSlice.reducer,
    users: userSlice.reducer,
    home: homeSlice.reducer,
    services: serviceSlice.reducer,
    category: categorySlice.reducer,
    books: bookSlice.reducer,
    rates: rateSlice.reducer,
    status: statusSlice.reducer,
  },
});
export default store;