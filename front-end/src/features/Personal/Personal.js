import React, { useState,useEffect  } from 'react';
import {useSelector, useDispatch  } from 'react-redux';
import { editUser, editAvatar } from './PersonalAPI';
import { fetchRoles } from '../GetRole/RoleAPI';
import {Typography, Box, Avatar,Grid, Select, MenuItem,Snackbar, Alert,Button, OutlinedInput,TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Container, InputAdornment } from "@mui/material";
import DateRangeIcon from "@mui/icons-material/DateRange";
import StyleFormControl from '../../components/FormControl/FormControl';
import './Personal.scss'

const Personal = () => {
    const dispatch = useDispatch();
    const [isUser, setUser] = useState(true);
    const [isEdit, setEdit] = useState(false);
   
    const userData = localStorage.getItem('user');
    const user = JSON.parse(userData);

    const [first_name, setfirst_name] = useState(user.first_name);
    const [last_name, setlast_name] = useState(user.last_name);
    const [email, setEmail] = useState(user.email);
    const [address, setAddress] = useState(user.address);
    const [birth_date, setbirth_date] = useState(user.birth_date);
    const [gender, setGender] = useState(user.gender);
    const [phone, setPhone] = useState(user.phone);
    const [role_id, setRole] = useState(user.role_id);
    const [avatar, setAvatar] = useState(user.avatar);
    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState(user.password);
  
    const { userUpdate, avatarUpdate } = useSelector(state => state.personal);
    const { roles } = useSelector(state => state.roles);

    useEffect(() => {
    if (userUpdate !== undefined && Object.keys(userUpdate).length > 0) {
        localStorage.setItem('user', JSON.stringify(userUpdate));
    }

    if (avatarUpdate !== undefined && Object.keys(avatarUpdate).length > 0) {
        localStorage.setItem('user', JSON.stringify(avatarUpdate));
    }
    }, [userUpdate, avatarUpdate, user,dispatch ]);

    useEffect(() => {
        dispatch(fetchRoles());
    }, []);
     
    const role = roles.find((item) => item.id === role_id)
    console.log('check role:', role)
     const handleEditUser = () =>{
        setEdit(true);
        setUser(false)
    }
    
    const handleFileChange = (event) =>{
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('avatar', file);
        dispatch(editAvatar(user.id, formData));
    }
 
    const  handleCancleEditUser = () =>{
        setEdit(false);
        setUser(true)
    }
  
    const handleSubmit = (e) =>{
        e.preventDefault();
        const updateUser = {
        first_name,
        last_name,
        email, 
        address,
        gender,
        phone,
        birth_date
        };
        dispatch(editUser(user.id, updateUser));
        setEdit(false);
        setUser(true);
    }
    
    
  return (
    <> 
    <Container maxWidth="lg" >
         <Typography mt={"50px"} mb={"50px"} variant="h3" component="h1" sx={{ color:"#cf881d", textAlign: "center" }}>
                Thông tin cá nhân
            </Typography>
        <Box className="user" mb={"50px"}>
             <Grid container columnSpacing={2} rowSpacing={4}>
                <Grid item xs={12} sm={4} md={4}>
                    <Box className="user-info">
                        <Avatar alt="avatar" src={user.avatar} className='user-avatar' />
                        <Typography  variant="body1"  sx={{ color:"#cf881d", textAlign: "center" }}>
                            {role.name}
                        </Typography>
                        <label htmlFor="file-input" className="custom-file-input">
                            Đổi ảnh
                        </label>
                        <input id="file-input" className="file-input" type="file" onChange={handleFileChange} />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={8}>
                        <Box className="user-detail">
                            {isUser && 
                            <Box className="user-content">
                                <Box className="user-item"> 
                                    <Typography variant="body1" component="p" className="user-title">
                                        Họ và tên: 
                                    </Typography>
                                    <Typography variant="body1" component="p" className="user-value">
                                        {user.first_name} {user.last_name}
                                    </Typography>
                                </Box>
                                <Box className="user-item"> 
                                    <Typography variant="body1" component="p" className="user-title">
                                            Ngày sinh:
                                    </Typography>
                                    <Typography variant="body1" component="p" className="user-value">
                                           {user.birth_date} 
                                    </Typography>
                                </Box>
                                <Box className="user-item"> 
                                    <Typography variant="body1" component="p" className="user-title">
                                            Giới tính:
                                    </Typography>
                                    <Typography variant="body1" component="p" className="user-value">
                                            {user.gender} 
                                    </Typography>
                                </Box>
                                <Box className="user-item"> 
                                    <Typography variant="body1" component="p" className="user-title">
                                            Số điện thoại:
                                    </Typography>
                                    <Typography variant="body1" component="p" className="user-value">
                                           {user.phone} 
                                    </Typography>
                                </Box>
                                <Box className="user-item"> 
                                    <Typography variant="body1" component="p" className="user-title">
                                            Email:
                                    </Typography>
                                    <Typography variant="body1" component="p" className="user-value">
                                          {user.email}
                                    </Typography>
                                </Box>
                                <Box className="user-item"> 
                                    <Typography variant="body1" component="p" className="user-title">
                                           Địa chỉ:
                                    </Typography>
                                    <Typography variant="body1" component="p" className="user-value">
                                          {user.address} 
                                    </Typography>
                                </Box>
                                <Button size="large"  variant="contained" onClick={handleEditUser} 
                                    sx={{  mt: 3, mb: 2, backgroundColor: "#cf881d", width: "300px",
                                        ":hover": {
                                        backgroundColor: "#cf881d"
                                        }
                                    }}
                                    >
                                        Chỉnh sửa
                                </Button>
                            </Box>   
                            }
                            {isEdit && 
                                 <Box component="form" onSubmit={handleSubmit} noValidate autoComplete='off' className="user-edit">
                                    <Box className="user-input">
                                        <Typography variant="body1" component="p" className="input-label">
                                                Họ: 
                                        </Typography>
                                         <StyleFormControl sx={{minWidth: 270,
                                        '.MuiOutlinedInput-root': {
                                                borderRadius: "5px"
                                            }
                                        }}>
                                        <OutlinedInput size='small' value={first_name} type='text' autoFocus className="input-value"
                                        onChange={(event) => setfirst_name(event.target.value)}
                                        />
                                         </StyleFormControl>
                                    </Box>
                                    <Box className="user-input">
                                        <Typography variant="body1" component="p" className="input-label">
                                                Tên: 
                                        </Typography>
                                         <StyleFormControl sx={{
                                         minWidth: 270,
                                        '.MuiOutlinedInput-root': {
                                                borderRadius: "5px"
                                            }
                                        }}>
                                        <OutlinedInput 
                                        size='small'
                                        value={last_name}
                                        type='text'
                                        className="input-value"
                                        onChange={(event) => setlast_name(event.target.value)}
                                        />
                                         </StyleFormControl>
                                    </Box>
                                    <Box className="user-input">
                                        <Typography variant="body1" component="p" className="input-label">
                                                Ngày sinh: 
                                        </Typography>
                                         <StyleFormControl sx={{
                                         minWidth: 270,
                                        '.MuiOutlinedInput-root': {
                                                borderRadius: "5px"
                                            }
                                        }}>
                                        <OutlinedInput
                                            size="small"
                                            id="birth_date"
                                            value={birth_date}
                                            name="date"
                                            type="date"
                                            startAdornment={
                                            <InputAdornment position="start">
                                                <DateRangeIcon />
                                            </InputAdornment>
                                            }
                                            className="input-value"
                                            onChange={(event) => setbirth_date(event.target.value)}
                                        />
                                        </StyleFormControl>
                                    </Box>
                                    <Box className="user-input">
                                        <Typography variant="body1" component="p" className="input-label">
                                                Giới tính: 
                                        </Typography>
                                        <FormControl className="input-value">
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-controlled-radio-buttons-group"
                                            name="controlled-radio-buttons-group"
                                            value={gender}
                                            onChange={(event) => setGender(event.target.value)}
                                        >
                                            <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
                                            <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
                                            <FormControlLabel value="Khác" control={<Radio />} label="Khác" />
                                        </RadioGroup>
                                        </FormControl>
                                    
                                    </Box>
                                    <Box className="user-input">
                                        <Typography variant="body1" component="p" className="input-label">
                                                Số điện thoại: 
                                        </Typography>
                                         <StyleFormControl sx={{
                                         minWidth: 270,
                                        '.MuiOutlinedInput-root': {
                                                borderRadius: "5px"
                                            }
                                        }}>
                                        <OutlinedInput 
                                        size='small'
                                        value={phone}
                                        type='text'
                                        className="input-value"
                                        onChange={(event) => setPhone(event.target.value)}
                                        />
                                         </StyleFormControl>
                                    </Box>
                                    <Box className="user-input">
                                        <Typography variant="body1" component="p" className="input-label">
                                                Email: 
                                        </Typography>
                                         <StyleFormControl sx={{
                                         minWidth: 270,
                                        '.MuiOutlinedInput-root': {
                                                borderRadius: "5px"
                                            }
                                        }}>
                                        <OutlinedInput 
                                        size='small'
                                        value={email}
                                        type='text'
                                        className="input-value"
                                        onChange={(event) => setEmail(event.target.value)}
                                        />
                                         </StyleFormControl>
                                    </Box>
                                    <Box className="user-input">
                                        <Typography variant="body1" component="p" className="input-label">
                                                Địa chỉ: 
                                        </Typography>
                                         <StyleFormControl sx={{
                                         minWidth: 270,
                                        '.MuiOutlinedInput-root': {
                                                borderRadius: "5px"
                                            }
                                        }}>
                                        <OutlinedInput 
                                        size='small'
                                        value={address}
                                        type='text'
                                        className="input-value"
                                        onChange={(event) => setAddress(event.target.value)}
                                        />
                                         </StyleFormControl>
                                    </Box>
                                
                                    <Box className="user-input">
                                    <Button type="submit" size="large" variant="contained" 
                                        sx={{  mt: 3, mb: 2, backgroundColor: "#cf881d",
                                            ":hover": {
                                            backgroundColor: "#cf881d"
                                            }
                                        }}>
                                        Lưu thay đổi
                                    </Button>
                                    <Button onClick={handleCancleEditUser} size="large" variant="contained" 
                                        sx={{  mt: 3, mb: 2, backgroundColor: "#cf881d",
                                            ":hover": {
                                            backgroundColor: "#cf881d"
                                            }
                                        }}>
                                        Hủy
                                    </Button>
                                    </Box>
                                </Box>         
                            }
                             
                        </Box>
                </Grid>
            </Grid>
        </Box> 
    </Container>
    </>
  
  )
}

export default Personal