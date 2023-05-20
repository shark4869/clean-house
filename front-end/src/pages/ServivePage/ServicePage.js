import React from 'react';
import {
  Outlet
} from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import {Container, Grid, Typography} from "@mui/material";
import ServiceSidebar from '../../components/Services/ServiceSibar';
// import Services from '../../components/Services/Services';

const ServicePage = () => {
  return (
    <Layout>
        <Container maxWidth="lg" >
          <Grid container mt={"50px"} mb={"100px"} columnSpacing={2} >
            <Grid item xs={12} md={3} pl={0} >
              <Typography variant="h5" component="h1" sx={{ padding: "15px", color:"#cf881d", fontWeight: "bold" }}>
                Danh mục
              </Typography>
              <ServiceSidebar/>
            </Grid>
            <Grid item xs={12} md={9} >
              <Outlet />
            </Grid>
          </Grid>
        </Container>
    </Layout>
  )
}

export default ServicePage;