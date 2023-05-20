import React from 'react';
import Layout from '../../components/Layout/Layout';
import { useParams } from 'react-router-dom';
import { Container  } from "@mui/material";
import RatingService from '../../components/Rating/Rating';

const RatingPage = () => {
    const { id } = useParams();
    const serviceId =parseInt(id)
  return (
    <Layout>
      <Container maxWidth="lg" >
        <RatingService id={serviceId} />
      </Container>
    </Layout>
  )
}

export default RatingPage;
