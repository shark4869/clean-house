import React from 'react';
import { useState, useEffect } from 'react';
import {useSelector, useDispatch  } from 'react-redux';
import { LoginSuccess } from '../../features/Login/LoginSlice';
import { handleLogout } from '../../features/Login/LoginAPI';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
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
  Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, Link } from "react-router-dom";
import logo from '../../assets/images/Logo1.png'
import './Header.scss'
import { StyledOutlineButton, StyledFillButton } from '../Button/Button';


function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin, user } = useSelector(state => state.login);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(null);


  useEffect(() => {
    // Kiểm tra xem có token trong localStorage không
    const token = localStorage.getItem('token');
    const isLogin = localStorage.getItem('isLogin');
   
    if (token && isLogin === 'true') {
      const decodedToken = jwt_decode(token);
      const user = localStorage.getItem('user');
      if (decodedToken.exp < Date.now() / 1000) {
        // Token đã hết hạn, xử lý tại đây (ví dụ: xóa token, đăng xuất người dùng)
        dispatch(handleLogout());
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('isLogin');
        navigate('/');
      }
      else {
        // Cập nhật trạng thái đăng nhập
        dispatch(LoginSuccess({ isLogin: true, user: JSON.parse(user), access_token: token }));
      }
    }
  }, [dispatch, navigate]);
  console.log('ckeck login:',isLogin)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleOpenUserMenu = (event)=>{
    setUserMenu(event.currentTarget)
  }
  const handleCloseUserMenu = ()=>{
    setUserMenu(null)
  }
  const Logout = ()=>{
    dispatch(handleLogout());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isLogin');
    navigate("/");
  }
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
      {!isLogin ?
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "30px 0" }} mt={5}>
            <StyledOutlineButton>
                <NavLink to={"/login"}>Đăng nhập</NavLink>
            </StyledOutlineButton>
            <StyledFillButton>
                <NavLink to={"/register"}>Đăng ký</NavLink>
            </StyledFillButton>
      </Box>
      : null}
      
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
        <Box height={"70px"} sx={{flexGrow: 1, display: { xs: 'flex', md: 'none' }}}>
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
        {!isLogin ?
        <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, alignItems: "center", gap: "0 20px" }}>
            <StyledOutlineButton>
                <NavLink to={"/login"}>Đăng nhập</NavLink>
            </StyledOutlineButton>
            <StyledFillButton>
                <NavLink to={"/register"}>Đăng ký</NavLink>
            </StyledFillButton>
        </Box>
        :
        <Box sx={{ flexGrow: 0 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0 10px", color: "#000", cursor: "pointer" }}
            onClick={handleOpenUserMenu}
            >
              <IconButton  sx={{ p: 0 }}>
                <Avatar alt="User name" src={user.avatar} />
              </IconButton>
              <Typography sx={{ display: { xs: "none", sm: "block" }}}>
                  {user.first_name} {user.last_name}
              </Typography>
            </Box>
            {user.role_id ===1 && 
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={userMenu}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(userMenu)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem >
                  <NavLink to="/admin">Quản trị</NavLink>
                </MenuItem>
                <MenuItem onClick={Logout}>
                  <Typography>Đăng xuất</Typography>
                </MenuItem>
            </Menu>}
            {user.role_id ===2 && 
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={userMenu}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(userMenu)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem >
                  <NavLink to="/personal">Trang cá nhân</NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink to="/user-service">Dịch vụ của tôi</NavLink>
                </MenuItem>
                <MenuItem >
                  <NavLink to="/user-history">Xem lịch sử</NavLink>
                </MenuItem>
                <MenuItem  onClick={Logout} >
                  <Typography >Đăng xuất</Typography>
                </MenuItem>
            </Menu>}
             {user.role_id ===3 && 
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={userMenu}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(userMenu)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem >
                  <NavLink to="/personal">Trang cá nhân</NavLink>
                </MenuItem>
                <MenuItem >
                  <NavLink to="/user-history">Xem lịch sử</NavLink>
                </MenuItem>
                <MenuItem  onClick={Logout} >
                  <Typography >Đăng xuất</Typography>
                </MenuItem>
            </Menu>}
        </Box>
        }   
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;