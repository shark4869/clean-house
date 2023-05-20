import React from 'react';
import { Container } from "@mui/material";
import Layout from '../../components/Layout/Layout';
import UserService from '../../features/Services/UserSerrvice';
const UserSerrvicePage = () => {
  return (
    <Layout>
      <Container maxWidth="lg">
        <UserService />
      </Container>
    </Layout>
 
  );
};
export default UserSerrvicePage;
