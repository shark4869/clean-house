import { createSlice } from '@reduxjs/toolkit';
export const userSlice= createSlice({
    name: "users",
    initialState: {
        user: {},
        users: []
    },
    reducers: {
        getUser: (state, action) => {
        state.user = action.payload;
        },
        getAllUser: (state, action) => {
        state.users = action.payload;
        },
    }
})
export const { getUser, getAllUser } = userSlice.actions

export default userSlice.reducer