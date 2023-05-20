import React from 'react';
import Layout from '../../components/Layout/Layout';
import { useParams } from 'react-router-dom';
import { Container  } from "@mui/material";
import Book from '../../features/Books/BookForm';
const BookPage = () => {
  const { id } = useParams();
  const serviceId =parseInt(id)
  return (
    <Layout>
      <Container maxWidth="lg" >
        <Book id={serviceId} />
      </Container>
    </Layout>
  )
}

export default BookPage;