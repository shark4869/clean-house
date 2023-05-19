import { createSlice } from '@reduxjs/toolkit';
export const serviceSlice= createSlice({
    name: "services",
    initialState: {
        services: [],
        message: ''
    },
    reducers: {
        getAllSerrvice: (state, action) => {
        state.services = action.payload;
        },
        updateSerrvice: (state, action) => {
            const index = state.services.findIndex(
                (service) => service.id === action.payload.service.id
            );
            state.services[index] = action.payload.service;
            state.message = action.payload.message;
        },
        addService: (state, action) => {
            state.services.push(action.payload);
        },
        deleteService: (state, action) => {
            const serviceId = action.payload;
            state.services = state.services.filter(service => service.id !== serviceId);
        },
    }
})
export const { getAllSerrvice, updateSerrvice, addService, deleteService } = serviceSlice.actions

export default serviceSlice.reducer