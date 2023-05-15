import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { loginAction } from "./LoginAPI";
import {
  Box,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  Typography,
  Button,
  Divider
} from "@mui/material";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Person2Icon from "@mui/icons-material/Person2";
import LockIcon from "@mui/icons-material/Lock";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import StyleFormControl from "../../components/FormControl/FormControl";
import './Login.scss'
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorName, setErrorName] = useState(false);
  const [errorPasswordEmpty, setErrorPasswordEmpty] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin, error, token, user } = useSelector(state => state.login);

  //show/hide password
const handleChangeShowPass = () => {
    setShowPass(!showPass);
};

const handleKeyPress = (event) => {
    const pattern = /^[A-Za-z0-9]+$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
};

const handleSubmit = (e) => {
    e.preventDefault();
    //check username empty
    if (username === "") {
      setErrorName(true);
    } else {
      setErrorName(false);
    }
    //check password empty
    if (password === "") {
      setErrorPasswordEmpty(true);
    } else {
      setErrorPasswordEmpty(false);
    }
    //check password < 6
    if (username && password && password.length < 4) {
      setErrorPassword(true);
    }

    if (username && password && password.length >= 4) {
        setErrorName(false);
        setErrorPassword(false);
        setErrorPasswordEmpty(false);
        setUsername("");
        setPassword("");
        dispatch(loginAction(username, password))
    }
};
    const  handleLoginSuccess = (token, user) => {
        navigate('/');
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isLogin', true);
    }
    if (isLogin) {
        handleLoginSuccess(token, user);
    }
  return (
    <>
        <Box className="login">
            <Box mb={3}>
                <Typography
                variant="h5"
                sx={{ color: "#000", fontWeight: "500"}}
                
                >
                    Đăng nhập
                </Typography>
                <Typography
                    variant="body1"
                    underline="hover"
                    sx={{ color: "#5a5a5a"}}
                
                >
                    Chưa có tài khoản? 
                    <Link to="/register" className="login-link">
                            Đăng ký
                    </Link>
                </Typography>    
            </Box>
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                autoComplete="off"
            >
                <StyleFormControl fullWidth variant="outlined">
                <OutlinedInput
                    size="small"
                    id="username"
                    value={username}
                    type="text"
                    placeholder="Tên đăng nhập"
                    autoFocus
                    onKeyPress={handleKeyPress}
                    startAdornment={
                    <InputAdornment position="start">
                        <Person2Icon />
                    </InputAdornment>
                    }
                    onChange={(event) => setUsername(event.target.value)}
                />
                {errorName && (
                    <FormHelperText error={true}>
                    Tên tài khoản không được trống!!!
                    </FormHelperText>
                )}
                </StyleFormControl>
                <StyleFormControl fullWidth sx={{ mt: 3 }}>
                <OutlinedInput
                    size="small"
                    id="password"
                    type={showPass ? "text" : "password"}
                    placeholder="Mật khẩu"
                    value={password}
                    startAdornment={
                    <InputAdornment position="start">
                        <LockIcon />
                    </InputAdornment>
                    }
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="tongle password"
                        sx={{ marginRight: 2 }}
                        onClick={handleChangeShowPass}
                        >
                        {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                    </InputAdornment>
                    }
                    onChange={(event) => setPassword(event.target.value)}
                />
                 {errorPassword ? (
                    <FormHelperText error={true}>
                    Mật khẩu phải có ít nhất 4 ký tự!!!
                    </FormHelperText>
                ) : null}
                {errorPasswordEmpty ? (
                    <FormHelperText error={true}>
                    Mật khẩu không được để trống!!!
                    </FormHelperText>
                ) : null}
                {error ? (
                    <FormHelperText error={true}>
                    Tên đăng nhập hoặc mật khẩu sai!!!
                    </FormHelperText>
                ) : null}
                </StyleFormControl>
                {/* Quên mật khẩu */}
                <Box align="right" mt={2}>
                    <Link to={"/"} className="login-link">
                        Quên mật khẩu?
                    </Link>
                </Box>
                <Button
                size="large"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                    mt: 3, 
                    mb: 2, 
                    backgroundColor: "#cf881d",
                    ":hover": {
                    backgroundColor: "#cf881d"
                    }
                }}
                >
                Đăng nhập
                </Button>
            
            </Box>
            {/* Đăng nhập với tài khoản mạng xã hội */}
            <Box>
                <Divider>HOẶC</Divider>
                <Box sx={{display: "flex", alignItems: "center", gap: " 0 30px"}}>
                     <Button
                        size="large"
                        type="submit"
                        variant="outline"
                        sx={{ 
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            lineHeight: 1,
                            mt: 3, 
                            mb: 2, 
                            color: '#FF4438',
                            border: "1px solid #FF4438",
                            ":hover": {
                            backgroundColor: "#fff"
                            }
                        }}
                        >
                        <GoogleIcon />Google
                        </Button>
                        <Button
                        size="large"
                        type="submit"
                        variant="outline"
                        sx={{ 
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            lineHeight: 1,
                            mt: 3, 
                            mb: 2, 
                            border: "1px solid #0187CE",
                            color: "#0187CE",
                            ":hover": {
                            backgroundColor: "#fff"
                            }
                        }}
                        >
                        <FacebookIcon />Facebook
                        </Button>
                </Box>
            </Box>
        </Box> 
    </>
  );
}

export default Login;