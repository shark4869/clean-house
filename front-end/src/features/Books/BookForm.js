import React from 'react';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { fetchServices } from '../Services/ServiceAPI';
import { createBook } from './BookAPI';
import {
  Box,
  OutlinedInput,
  FormHelperText,
  Typography,
  Button,
  Dialog ,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import StyleFormControl from "../../components/FormControl/FormControl";
import './Book.scss'


const Book = ({id}) => {
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const userData = localStorage.getItem('user');
    const user = JSON.parse(userData);

     useEffect(() => {
        dispatch(fetchServices()) 
    }, [dispatch]);

    const { services } = useSelector(state => state.services);
    const handleKeyNumber = (event) => {
    const pattern = /^[0-9]+$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
    };
    
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Tháng được đếm từ 0, nên cần +1
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    const [selectedDateTime, setSelectedDateTime] = useState('');
    const [selectedError, setSelectedError] = useState(false);
    const [address, setAddress] = useState(user.address);
    const [addressError, setAddressEror] = useState(false);
    const [period, setPeriod] = useState(0);
    const [periodError, setPeriodError] = useState(false);
    const [sum, setSum] = useState(0);
    const [request, setRequest] = useState('');
    const [requestError, setRequestError] = useState(false);

    useEffect(() => {
        const total = period * service?.price
        setSum(total)
    }, [period]);

    const [openToast, setOpenToast] = useState(false);
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenToast(false);
    };

    const handleDateTimeChange = (event) => {
        const date = new Date(event.target.value);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        setSelectedDateTime(formattedDateTime);
    };
    const date = `${year}-${month}-${day}`;
    const dateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
 
const handleSubmit = (e) => {
    e.preventDefault();
    const service_id =id
    const customer_id = user.id
    const book_date = date
    const status_id = 1
    const workplace = address
    const start_time = selectedDateTime
    const timer = period
    const note = request
    const total = sum
    const payment_id = 1
    const status_update = dateTime

    const book = {
        service_id,
        customer_id,
        book_date,
        status_id,
        workplace, 
        start_time,
        timer,
        note,
        total,
        payment_id,
        status_update
        };
  
    if (request === "") {
      setRequestError(true);
    } else {
      setRequestError(false);
    }
    if (period === 0) {
      setPeriodError(true);
    } else {
      setPeriodError(false);
    }
    if (selectedDateTime === '') {
      setSelectedError(true);
    } else {
      setSelectedError(false);
    }
    if (address === '') {
      setAddressEror(true);
    } else {
      setAddressEror(false);
    }
    if(request && period && selectedDateTime && address){
        dispatch(createBook(book))
        setOpenToast(true)
    }
    
};
    const service = services ? services.find((item) => item.id === id) : null
    const customer = user?.first_name + " " + user?.last_name
    const handleSucces = () => {
        navigate('/');
    }
  return (

      <Box className="book" mt={"100px"} mb={"100px"}>
        <Dialog
        open={openToast}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Đặt dịch vụ thành công!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSucces} autoFocus >
            Về trang chủ 
          </Button>
        </DialogActions>
      </Dialog>
            <Box mb={2}>
                <Typography textAlign={"center"} mb={5}
                variant="h4"
                sx={{ color: "#cf881d", fontWeight: "500", textTransform: 'uppercase'}}
                >
                    Thông tin đặt lịch dịch vụ
                </Typography>  
            </Box>
            <Box component="form"  onSubmit={handleSubmit} noValidate autoComplete="off" className='form'
            sx={{width: {xs: "100%", md: "70%"}}}
            >
                <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, alignItems: 'baseline', gap: '0 10px'}}>
                    <Typography className='form-label'>
                    Tên dịch vụ
                    </Typography> 
                    <StyleFormControl fullWidth variant="outlined">
                    <OutlinedInput
                        size="small"
                        value={service?.name}
                        type="text"
                        disabled
                    />
                    </StyleFormControl>
                </Box>
                 <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, alignItems: 'baseline', gap: '0 10px'}}>
                    <Typography className='form-label'>
                    Tên người đặt:
                    </Typography> 
                     <StyleFormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                    <OutlinedInput
                        size="small"
                        value={customer}
                        disabled
                    />
                </StyleFormControl>
                </Box>
               <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, alignItems: 'baseline', gap: '0 10px'}} >
                    <Typography className='form-label'>
                    Ngày đặt:
                    </Typography> 
                     <StyleFormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                    <OutlinedInput
                        size="small"
                        value={date}
                        disabled
                    />
                </StyleFormControl>
                </Box>
                <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, alignItems: 'baseline', gap: '0 10px'}}>
                    <Typography className='form-label'>
                    Địa chỉ làm viêc/giao hàng:
                    </Typography> 
                     <StyleFormControl fullWidth variant="outlined">
                    <OutlinedInput
                        size="small"
                        value={address}
                        type="text"
                        onChange={(event) => setAddress(event.target.value)}
                    />
                     {addressError && (
                    <FormHelperText error={true}>
                        Bạn phải nhập địa chỉ!
                    </FormHelperText>
                    )}
                    </StyleFormControl>
                </Box>
                 <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, alignItems: 'baseline', gap: '0 10px'}}>
                    <Typography className='form-label'>
                    Các yêu cầu
                    </Typography> 
                     <StyleFormControl fullWidth variant="outlined" sx={{
                        ".MuiOutlinedInput-root": {
                            height: "auto"
                        }
                     }}>
                    <OutlinedInput
                    
                        size="small"
                        value={request}
                        type="text"
                        multiline
                        onChange={(event) => setRequest(event.target.value)}
                    />
                    {requestError && (
                    <FormHelperText error={true}>
                        Bạn phải nhập yêu cầu công việc!
                    </FormHelperText>
                    )}
                    </StyleFormControl>
                </Box>
                <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, alignItems: 'baseline', gap: '0 10px'}}>
                    <Typography className='form-label'>
                    Thời gian bắt đầu công việc:
                    </Typography> 
                     <StyleFormControl fullWidth variant="outlined">
                    <OutlinedInput
                        size="small"
                        type="datetime-local"
                        value={selectedDateTime}
                        onChange={handleDateTimeChange}
                    />
                    {selectedError && (
                    <FormHelperText error={true}>
                        Bạn phải nhập thời gian bắt đầu công việc!
                    </FormHelperText>
                    )}
                    </StyleFormControl>
                </Box>
                <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, alignItems: 'baseline', gap: '0 10px'}} >
                    <Typography className='form-label'>
                    Thời gian hoàn thành (giờ):
                    </Typography> 
                     <StyleFormControl fullWidth variant="outlined">
                    <OutlinedInput
                        size="small"
                        value={period}
                        type="text"
                        onKeyPress={handleKeyNumber}
                        onChange={(event) => setPeriod(event.target.value)}
                    />
                     {periodError && (
                    <FormHelperText error={true}>
                        Bạn phải nhập thời gian hoàn thành!
                    </FormHelperText>
                    )}
                    </StyleFormControl>
                </Box>
                <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, alignItems: 'baseline', gap: '0 10px'}} >
                    <Typography className='form-label'>
                    Phí dịch vụ/giờ:
                    </Typography> 
                     <StyleFormControl fullWidth variant="outlined">
                    <OutlinedInput
                        size="small"
                        value={service?.price}
                        type="text"
                        disabled
                    />
                    </StyleFormControl>
                </Box>
                <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, alignItems: 'baseline', gap: '0 10px'}} >
                    <Typography className='form-label'>
                    Tổng tiền (đồng VN):
                    </Typography> 
                     <StyleFormControl fullWidth variant="outlined">
                    <OutlinedInput
                        size="small"
                        value={sum}
                        type="text"
                        disabled
                        
                    />
                    </StyleFormControl>
                </Box>
                <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, alignItems: 'baseline', gap: '0 10px'}}>
                    <Typography className='form-label'>
                    Hình thức thanh toán:
                    </Typography> 
                     <StyleFormControl fullWidth variant="outlined">
                    <OutlinedInput
                        size="small"
                        value="Tiền mặt"
                        type="text"
                        disabled
                    />
                    </StyleFormControl>
                </Box>
            
                <Button
                size="large"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                    backgroundColor: "#cf881d",
                    marginTop: "20px",
                    ":hover": {
                    backgroundColor: "#cf881d"
                    }
                }}
                >
                Đặt dịch vụ
                </Button>

            </Box>
           
        </Box> 
  
  )
}

export default Book;