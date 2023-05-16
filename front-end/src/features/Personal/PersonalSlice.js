import { createSlice } from '@reduxjs/toolkit';
export const personalSlice= createSlice({
    name: "personal",
    initialState: {
        userUpdate: {},
        avatarUpdate: {}
    },
    reducers: {
        updateUser: (state, action) => {
        state.userUpdate = action.payload;
        },
        updateAvatar: (state, action) => {
        state.avatarUpdate = action.payload;
        },
    }
})
export const { updateUser, updateAvatar } = personalSlice.actions

export default personalSlice.reducer