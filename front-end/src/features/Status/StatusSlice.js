import { createSlice } from '@reduxjs/toolkit';
export const statusSlice= createSlice({
    name: "status",
    initialState: {
        status: []
    },
    reducers: {
        getStatus: (state, action) => {
        state.status = action.payload;
        },
    }
})
export const { getStatus } = statusSlice.actions

export default statusSlice.reducer