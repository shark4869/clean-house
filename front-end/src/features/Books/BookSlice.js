import { createSlice } from '@reduxjs/toolkit';
export const bookSlice= createSlice({
    name: "books",
    initialState: {
        books: []
    },
    reducers: {
        getBooks: (state, action) => {
        state.books = action.payload;
        },
        addBook: (state, action) => {
            state.books.push(action.payload);
        },
        updateBookStatus: (state, action) => {
        const { bookId, update } = action.payload;
        const bookIndex = state.books.findIndex(item => item.id === bookId);
        if (bookIndex !== -1) {
            state.books[bookIndex].status_id = update.status_id;
            state.books[bookIndex].status_update = update.status_update;
        }
        },
    }
})
export const { getBooks, addBook, updateBookStatus } = bookSlice.actions

export default bookSlice.reducer