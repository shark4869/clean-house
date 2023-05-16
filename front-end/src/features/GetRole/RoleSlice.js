import { createSlice } from '@reduxjs/toolkit';
export const roleSlice= createSlice({
    name: "roles",
    initialState: {
        roles: {}
    },
    reducers: {
        getRoles: (state, action) => {
        state.roles = action.payload;
        },
    }
})
export const { getRoles } = roleSlice.actions

export default roleSlice.reducer