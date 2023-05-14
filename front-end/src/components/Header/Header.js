import React from 'react';
import { useState } from 'react';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Container,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, Link } from "react-router-dom";
import logo from '../../assets/images/Logo1.png'
import './Header.scss'
import { StyledOutlineButton, StyledFillButton } from '../Button/Button';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} className="mobile">
      <Box height={"100px"} mb={5}>
        <Link to={"/"} >
          <img src={logo} alt="logo" height={"100%"} style={{margin: "0 auto"}} />
        </Link>
      </Box>
 
      <ul className="mobile-navigation">
        <li>
          <NavLink to={"/"}>Trang chủ</NavLink>
        </li>
        <li>
          <NavLink to={"/service"}>Dịch vụ</NavLink>
        </li>
        <li>
          <NavLink to={"/about-us"}>Về chúng tôi</NavLink>
        </li>
      </ul> 
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "30px 0" }} mt={5}>
            <StyledOutlineButton>
                <NavLink to={"/login"}>Đăng nhập</NavLink>
            </StyledOutlineButton>
            <StyledFillButton>
                <NavLink to={"/Register"}>Đăng ký</NavLink>
            </StyledFillButton>
        </Box>
    </Box>
  );
  return (
    <AppBar position="static" sx={{
        backgroundColor: "#fff"
    }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box height={"70px"} sx={{ display: { xs: 'none', md: 'flex' }, mr: 6 }}>
            <Link to={"/"}>
                <img src={logo} alt="logo" height={"100%"} />
            </Link>
          </Box>
        {/* mobile */}
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleDrawerToggle}
              color="#000"
            >
                <MenuIcon fontSize='large' />
            </IconButton>
        </Box>
        <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: "300px",
                },
              }}
            >
              {drawer}
        </Drawer>
        {/* mobile */}
        <Box height={"70px"} sx={{ display: { xs: 'flex', md: 'none' }}}>
            <Link to={"/"}>
                <img src={logo} alt="logo" height={"100%"} />
            </Link>
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <ul className="navigation">
                <li>
                <NavLink to={"/"}>Trang chủ</NavLink>
                </li>
                <li>
                <NavLink to={"/service"}>Dịch vụ</NavLink>
                </li>
                <li>
                <NavLink to={"/about-us"}>Về chúng tôi</NavLink>
                </li>
            </ul>
        </Box>
        <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, alignItems: "center", gap: "0 20px" }}>
            <StyledOutlineButton>
                <NavLink to={"/login"}>Đăng nhập</NavLink>
            </StyledOutlineButton>
            <StyledFillButton>
                <NavLink to={"/Register"}>Đăng ký</NavLink>
            </StyledFillButton>
        </Box>
            {/* user login */}
          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;