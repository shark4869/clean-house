import { getBooks, addBook, updateBookStatus } from "./BookSlice";
import axios from "axios";

export const fetchBooks = () => async dispatch => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get('http://127.0.0.1:5000/api/books', {}, config);
    dispatch(getBooks(response.data));
  } catch (error) {
    throw error;
  }
};

export const createBook = (info) => async dispatch => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post('http://127.0.0.1:5000/api/book', info , config);
    dispatch(addBook(response.data.book));
    console.log('res:',response.data)
  } catch (error) {
    throw error;
  }
};

export const UpdateStatus = (bookId, update) => async dispatch => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.put(`http://127.0.0.1:5000/api/book-status/${bookId}`, update, config);
    dispatch(updateBookStatus(update));
  } catch (error) {
    throw error;
  }
};
