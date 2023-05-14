import { createSlice } from '@reduxjs/toolkit';
export const loginSlice= createSlice({
    name: "login",
    initialState: {
        isLogin: false,
        isLoading: false,
        error: null,
        user: {}, 
        token: ""
    },
    reducers: {
        loginLoading: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        LoginSuccess: (state, action) => {
            state.isLogin = true;
            state.isLoading = false;
            state.error= null;
            state.user = action.payload.user;
            state.token = action.payload.access_token;
        },//=>{type: 'user/LoginSucces}
        LoginFailed: (state, action) => {
            state.isLoading = false;
            state.error= action.payload ? action.payload : "Unknown Error";
        },
        Logout: (state) => {
            state.isLogin = false;
            state.isLoading = false;
            state.error = null;
            state.user = {};
            state.token = "";
        }
    }
})
export const { loginLoading, LoginSuccess, LoginFailed, Logout } = loginSlice.actions

export default loginSlice.reducer