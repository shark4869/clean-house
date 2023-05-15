import React from 'react';
import {
  Box,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";
import Login from '../../features/Login/LoginForm';
import logo from '../../assets/images/Logo1.png'
import loginPage from '../../assets/images/LoginPage.png'
const LoginPage = () => {
  return (
    <Container maxWidth="lg">
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, flexDirection: 'column'}} height={"100%"}>
                <Box height={"100px"}  width={"200px"}>
                  <Link to={"/"}>
                    <img src={logo} alt="logo" height={"100%"}  />
                  </Link>
                </Box>
                <Box height={"calc(100vh - 100px)"}>
                    <img src={loginPage} alt="Login Page" height={"100%"} />
                </Box>
            </Box>
             <Login sx={{ flexGrow: 1}}/>
        </Box>
    </Container>
  )
}

export default LoginPage;