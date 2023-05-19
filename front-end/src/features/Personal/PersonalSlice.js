import { createSlice } from '@reduxjs/toolkit';
export const personalSlice= createSlice({
    name: "personal",
    initialState: {
        userUpdate: {}
    },
    reducers: {
        updateUser: (state, action) => {
        state.userUpdate = action.payload;
        }
        // updateAvatar: (state, action) => {
        // state.userUpdate = action.payload;
        // },
    }
})
export const { updateUser } = personalSlice.actions

export default personalSlice.reducer