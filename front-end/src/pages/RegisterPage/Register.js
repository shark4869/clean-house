import React from 'react';
import {
  Box,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";

import logo from '../../assets/images/Logo1.png'
import register from '../../assets/images/Register.png'
import Register from '../../features/Register/RegisterForm';


const RegisterPage = () => {
  return (
       <Container maxWidth="lg">
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <Box sx={{ flex: 1, display: { xs: 'none', md: 'flex' }, flexDirection: 'column'}} height={"100%"}>
                <Box height={"100px"} width={"200px"}>
                  <Link to={"/"}>
                    <img src={logo} alt="logo" height={"100%"}  />
                  </Link>
                </Box>
                <Box height={"calc(100vh - 100px)"}>
                    <img src={register} alt="Login Page" height={"100%"} />
                </Box>
            </Box>
             <Register sx={{ flex: 1}}/>
        </Box>
    </Container>
  )
}

export default RegisterPage;