import React, { useEffect  } from 'react';
import {useSelector, useDispatch  } from 'react-redux';
import { fetchUser } from '../../features/Users/UserAPI';
import { Link } from "react-router-dom";
import { Box, Typography, Container, Grid } from "@mui/material";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import "./Footer.scss";
import logo from '../../assets/images/Logo1.png'

const Footer = () => {
    const dispatch = useDispatch();
     useEffect(() => {
        dispatch(fetchUser(2));
    }, [dispatch]);
    const { user } = useSelector(state => state.users);
  return (
    <footer className="footer">
      <Container maxWidth="lg">
        <Grid
          container
          rowSpacing={1}
          columnSpacing={1}
          className="footer-content"
          sx={{ textAlign: { xs: "center", sm: "left" } }}
        >
          <Grid item xs={12} sm={12} md={3} sx={{ display: 'flex',  justifyContent: {xs: 'center',sm: 'flex-start'}}}>
            <Box>
              <Link to={"/"} sx={{textAlign: 'center'}}>
                <img src={logo} alt="logo" className="logo" />
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Typography
              variant="h6"
              component="h5"
              mb={2}
              className="footer-heading"
            >
              Liên kết
            </Typography>
            <ul className="footer-link">
              <li>
                <Link to={"/"}>Trang chủ</Link>
              </li>
              <li>
                <Link to={"/service"}>Dịch vụ</Link>
              </li>
              <li>
                <Link to={"/about-us"}>Về chúng tôi</Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Typography
              variant="h6"
              component="h5"
              mb={2}
              className="footer-heading"
            >
              Dịch vụ
            </Typography>
            <ul className="footer-link">
              <li>
                <Link to={"/service"}>Dọn dẹp</Link>
              </li>
              <li>
                <Link to={"/service"}>Nấu ăn</Link>
              </li>
              <li>
                <Link to={"/service"}>Đi chợ</Link>
              </li>
              <li>
                <Link to={"/service"}>Giặt ủi</Link>
              </li>
            </ul>
          </Grid>
           <Grid item xs={12} sm={4} md={3}>
            <Typography
              variant="h6"
              component="h5"
              mb={2}
              className="footer-heading"
            >
              Liên hệ
            </Typography>
            <Box className="footer-contact">
                    <Box sx={{display: 'flex', alignItems: 'center',justifyContent: {xs: 'center',sm: 'flex-start'}, gap: '0 5px'}} className="contact-item">
                    <LocalPhoneIcon />{user.phone}
                    </Box>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: {xs: 'center',sm: 'flex-start'},gap: '0 5px'}}>
                <EmailIcon/>{user.email}
                </Box>
          
          
                <Box sx={{display: 'flex', alignItems: 'center',justifyContent: {xs: 'center',sm: 'flex-start'},  gap: '0 5px'}}>
                <LocationOnIcon/> {user.address}
                </Box>
           
            </Box>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};
export default Footer;
