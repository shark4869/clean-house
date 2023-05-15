import { createSlice } from '@reduxjs/toolkit';
export const registerSlice= createSlice({
    name: "register",
    initialState: {
        isLoading: false,
        error: null,
        message: null
    },
    reducers: {
        registerRequest: (state) => {
        state.isLoading = true;
        state.error = null;
        },
        registerSuccess: (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        },
        registerFailure: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        },
    }
})
export const { registerRequest, registerSuccess, registerFailure} = registerSlice.actions

export default registerSlice.reducer