import { getBooks, addBook, updateBookStatus } from "./BookSlice";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
export const fetchBooks = () => async dispatch => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${backendUrl}/api/books`, {}, config);
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
    const response = await axios.post(`${backendUrl}/api/book`, info , config);
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
    await axios.put(`${backendUrl}/api/book-status/${bookId}`, update, config);
    dispatch(updateBookStatus(update));
  } catch (error) {
    throw error;
  }
};
