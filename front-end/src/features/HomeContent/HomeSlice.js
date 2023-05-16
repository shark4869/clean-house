import { createSlice } from '@reduxjs/toolkit';
export const homeSlice= createSlice({
    name: "home",
    initialState: {
        banner: []
    },
    reducers: {
        getBaner: (state, action) => {
        state.banner = action.payload;
        },
    }
})
export const { getBaner } = homeSlice.actions

export default homeSlice.reducer