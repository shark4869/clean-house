import React from 'react';
import Layout from '../../components/Layout/Layout';
import { Container  } from "@mui/material";
import History from '../../components/History/History';
const HistoryPage = () => {
  return (
    <Layout>
      <Container maxWidth="lg" >
        <History/>
      </Container>
    </Layout>
  )
}

export default HistoryPage;