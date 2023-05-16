import { createSlice } from '@reduxjs/toolkit';
export const userSlice= createSlice({
    name: "users",
    initialState: {
        user: {}
    },
    reducers: {
        getUser: (state, action) => {
        state.user = action.payload;
        },
    }
})
export const { getUser } = userSlice.actions

export default userSlice.reducer