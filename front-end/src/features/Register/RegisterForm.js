import React from 'react';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from './RegisterAPI';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel
} from "@mui/material";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { Link } from "react-router-dom";
import StyleFormControl from "../../components/FormControl/FormControl";
import './Register.scss'

const Register = () => {
  const [first_name, setfirst_name] = useState("");
  const [errorfirst_name, setErrorfirst_name] = useState(false);

  const [last_name, setlast_name] = useState("");
  const [errorlast_name, setErrorlast_name] = useState(false);

  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);

  const [address, setAddress] = useState("");

  const [birth_date, setbirth_date] = useState("");
  const [errorbirth_date, setErrorbirth_date] = useState(false);

  const [gender, setGender] = useState("Nữ");

  const [phone, setPhone] = useState("");
   const [errorPhone, setErrorPhone] = useState(false);

  const [role_id, setRole] = useState(3);
  const [avatar, setAvatar] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorName, setErrorName] = useState(false);
  const [errorPasswordEmpty, setErrorPasswordEmpty] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message } = useSelector(state => state.register);
  const handleKeyPress = (event) => {
    const pattern = /^[A-Za-z0-9]+$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
    };
    const handleKeyNumber = (event) => {
    const pattern = /^[0-9]+$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
    };
    if (message) {
        navigate('/login')
    }
const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
        username,
        password,
        first_name,
        last_name,
        email, 
        address,
        gender,
        phone,
        birth_date,
        avatar,
        role_id
        };
    //check username empty
    if (username === "") {
      setErrorName(true);
    } else {
      setErrorName(false);
    }
     if (first_name === "") {
      setErrorfirst_name(true);
    } else {
      setErrorfirst_name(false);
    }
    if (last_name === "") {
      setErrorlast_name(true);
    } else {
      setErrorlast_name(false);
    }
    if (email === "") {
      setErrorEmail(true);
    } else {
      setErrorEmail(false);
    }
    if (birth_date === "") {
      setErrorbirth_date(true);
    } else {
      setErrorbirth_date(false);
    }
    if (phone === "") {
      setErrorPhone(true);
    } else {
      setErrorPhone(false);
    }
    //check password empty
    if (password === "") {
      setErrorPasswordEmpty(true);
    } else {
      setErrorPasswordEmpty(false);
    }
    //check password < 6
    if (password && password.length < 4) {
      setErrorPassword(true);
    }

    if (first_name && last_name && email && birth_date && phone && username && password && password.length >= 4) {
        setErrorName(false);
        setErrorPassword(false);
        setErrorPasswordEmpty(false);
        setErrorfirst_name(false);
        setErrorlast_name(false);
        setErrorEmail(false);
        setErrorbirth_date(false);
        setErrorPhone(false);
        setfirst_name("");
        setlast_name("");
        setEmail("");
        setAddress("");
        setbirth_date("");
        setGender("Nữ");
        setRole(3);
        setUsername("");
        setPassword("");
        dispatch(registerAction(user))
    }
};
  return (

      <Box className="register">
            <Box mb={2}>
                <Typography
                variant="h5"
                sx={{ color: "#000", fontWeight: "500"}}
                
                >
                    Đăng ký
                </Typography>
                <Typography
                    variant="body1"
                    underline="hover"
                    sx={{ color: "#5a5a5a"}}
                
                >
                    Đã có tài khoản? 
                    <Link to="/login" className="register-link">
                            Đăng nhập
                    </Link>
                </Typography>    
            </Box>
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                autoComplete="off"
            >
                <Box sx={{display: 'flex', alignItems: 'baseline', gap: '0 10px'}} mb={2}>
                    <StyleFormControl fullWidth variant="outlined">
                    <OutlinedInput
                        size="small"
                        id="first_name"
                        value={first_name}
                        type="text"
                        placeholder="Họ"
                        autoFocus
                        onChange={(event) => setfirst_name(event.target.value)}
                    />
                    {errorfirst_name && (
                    <FormHelperText error={true}>
                        Bạn phải nhập họ!
                    </FormHelperText>
                    )}
                    </StyleFormControl>
                    <StyleFormControl fullWidth variant="outlined">
                    <OutlinedInput
                        size="small"
                        id="last_name"
                        value={last_name}
                        type="text"
                        placeholder="Tên"
                        onChange={(event) => setlast_name(event.target.value)}
                    />
                    {errorlast_name && (
                    <FormHelperText error={true}>
                        Bạn phải nhập tên!
                    </FormHelperText>
                    )}
                    </StyleFormControl>
                </Box>
                <StyleFormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                    <OutlinedInput
                        size="small"
                        id="email"
                        value={email}
                        type="email"
                        placeholder="Email"
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    {errorEmail && (
                    <FormHelperText error={true}>
                        Bạn phải nhập email!
                    </FormHelperText>
                    )}
                </StyleFormControl>
                <StyleFormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                    <OutlinedInput
                        size="small"
                        id="address"
                        value={address}
                        type="text"
                        placeholder="Địa chỉ"
                        onChange={(event) => setAddress(event.target.value)}
                    />
                </StyleFormControl>
                <Box sx={{display: 'flex', alignItems: 'baseline', gap: '0 10px'}} mb={2}>
                    <StyleFormControl fullWidth variant="outlined">
                    <OutlinedInput
                        size="small"
                        id="phone"
                        value={phone}
                        type="text"
                        placeholder="Số điện thoại"
                        onKeyPress={handleKeyNumber}
                        onChange={(event) => setPhone(event.target.value)}
                    />
                    {errorPhone && (
                    <FormHelperText error={true}>
                        Bạn phải nhập số ĐT!
                    </FormHelperText>
                    )}
                    </StyleFormControl>
                    <StyleFormControl fullWidth variant="outlined">
                        <Select
                        size="small"
                        id="role"
                        value={role_id}
                        name="role"
                        onChange={(event) => setRole(event.target.value)}
                    >
                        <MenuItem value={2}>Cộng tác viên</MenuItem>
                        <MenuItem value={3}>Khách hàng</MenuItem>
                    </Select>
                    </StyleFormControl>
                </Box>
                <FormControl sx={{ mb: 1 }}>
                <FormLabel >Giới tính</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={gender}
                    name="radio-buttons-group"
                    row
                    onChange={(event) => setGender(event.target.value)}
                >
                    <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
                    <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
                    <FormControlLabel value="Khác" control={<Radio />} label="Khác" />
                </RadioGroup>
                </FormControl>
                <StyleFormControl variant="outlined" sx={{ mb: 2 }}>
                     <FormLabel >Ngày sinh</FormLabel>
                    <OutlinedInput
                        size="small"
                        id="birth_date"
                        value={birth_date}
                        name="date"
                        type="date"
                        placeholder="Ngày sinh"
                        startAdornment={
                        <InputAdornment position="start">
                            <DateRangeIcon />
                        </InputAdornment>
                        }
                        onChange={(event) => setbirth_date(event.target.value)}
                    />
                     {errorbirth_date && (
                    <FormHelperText error={true}>
                        Bạn phải nhập ngày sinh!
                    </FormHelperText>
                    )}
                </StyleFormControl>
                <Box sx={{display: 'flex', alignItems: 'baseline', gap: '0 10px'}} mb={2}>
                <StyleFormControl fullWidth variant="outlined">
                <OutlinedInput
                    size="small"
                    id="username"
                    value={username}
                    type="text"
                    placeholder="Tên đăng nhập"
                    onKeyPress={handleKeyPress}
                    onChange={(event) => setUsername(event.target.value)}
                />
                {errorName && (
                <FormHelperText error={true}>
                    Bạn phải nhập tên tài khoản!
                </FormHelperText>
                )}
                </StyleFormControl>
                <StyleFormControl fullWidth>
                <OutlinedInput
                    size="small"
                    id="password"
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                {errorPassword ? (
                <FormHelperText error={true}>
                Mật khẩu phải có ít nhất 6 ký tự!
                </FormHelperText>
                ) : null}
                {errorPasswordEmpty ? (
                    <FormHelperText error={true}>
                    Bạn phải nhập mật khẩu!
                    </FormHelperText>
                ) : null}
                </StyleFormControl>
                </Box>
                <Button
                size="large"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                    backgroundColor: "#cf881d",
                    ":hover": {
                    backgroundColor: "#cf881d"
                    }
                }}
                >
                Đăng ký
                </Button>

            </Box>
           
        </Box> 
  
  )
}

export default Register;