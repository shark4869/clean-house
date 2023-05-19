import { createSlice } from '@reduxjs/toolkit';
export const rateSlice= createSlice({
    name: "rates",
    initialState: {
        rateService: [],
        rates: []
    },
    reducers: {
        getRateService: (state, action) => {
        state.rateService = action.payload;
        },
        getAllRate: (state, action) => {
        state.rates = action.payload;
        },
        addRate: (state, action) => {
        state.rates.push(action.payload);
        },
    }
})
export const { getRateService, getAllRate, addRate} = rateSlice.actions

export default rateSlice.reducer