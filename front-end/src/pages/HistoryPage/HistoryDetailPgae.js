import React from 'react';
import Layout from '../../components/Layout/Layout';
import { Container  } from "@mui/material";
import HistoryDetail from '../../components/History/HistoryDetail';
const HistoryDetailPage = () => {
  return (
    <Layout>
      <Container maxWidth="lg" >
        <HistoryDetail/>
      </Container>
    </Layout>
  )
}

export default HistoryDetailPage;