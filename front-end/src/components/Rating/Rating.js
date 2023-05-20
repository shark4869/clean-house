import React from 'react';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRate } from '../../features/Rates/RatesAPI';
import { useNavigate } from 'react-router-dom';
import { fetchServices } from '../../features/Services/ServiceAPI';
import {
  Box,
  OutlinedInput,
  Rating,
  Typography,
  Button,
  Dialog ,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import StyleFormControl from '../FormControl/FormControl';


const RatingService = ({id}) => {
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const userData = localStorage.getItem('user');
    const user = JSON.parse(userData);

     useEffect(() => {
        dispatch(fetchServices()) 
    }, [dispatch]);

    const { services } = useSelector(state => state.services);
    const [value, setValue] = useState(0);
    const [rating, setRating] = useState('');

    
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Tháng được đếm từ 0, nên cần +1
    const day = String(currentDate.getDate()).padStart(2, '0');
 

    const date = `${year}-${month}-${day}`;

    

    const handleSubmit = (e) => {
        e.preventDefault();
        const rate_date = date
        const service_id = id
        const customer_id = user.id
        const rate = value
        const comment = rating
        const data ={
            rate_date,
            service_id,
            customer_id,
            rate,
            comment
        }
        dispatch(createRate(data))
        setOpenToast(true)
    }

    const [openToast, setOpenToast] = useState(false);
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenToast(false);
    };

    const service = services ? services.find((item) => item.id === id) : null
    
 
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
            Đánh giá thành công!
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
                    Đánh giá chất lượng dịch vụ
                </Typography>  
            </Box>
            <Box component="form"  onSubmit={handleSubmit} noValidate autoComplete="off" 
            sx={{width: {xs: "100%", md: "70%"}, margin: "0 auto", display: 'flex', flexDirection: 'column', gap: "20px 0"}}
            >
                <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, alignItems: 'baseline', gap: '0 10px'}}>
                    <Typography sx={{width: '200px', color: '#cf881d', fontWeight: 500}}>
                    Tên dịch vụ:
                    </Typography> 
                    <StyleFormControl fullWidth variant="outlined" sx={{
                         ".MuiOutlinedInput-root": {
                            height: "auto"
                        }
                    }}>
                    <OutlinedInput
                        size="small"
                        value={service?.name}
                        type="text"
                        
                        disabled
                    />
                    </StyleFormControl>
                </Box>
                <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, alignItems: 'baseline', gap: '0 10px'}}>
                    <Typography sx={{width: '200px', color: '#cf881d', fontWeight: 500}}>
                    Bình luận:
                    </Typography> 
                    <StyleFormControl fullWidth variant="outlined">
                    <OutlinedInput
                        size="small"
                        value={rating}
                        type="text"
                        onChange={(event) => setRating(event.target.value)}    
                        multiline
                    />
                    </StyleFormControl>
                </Box>
                <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, alignItems: 'baseline', gap: '0 10px'}}>
                    <Typography sx={{width: '200px', color: '#cf881d', fontWeight: 500}}>
                    Đánh giá:
                    </Typography> 
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        />
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
                Gửi đánh giá
                </Button>

            </Box>
           
        </Box> 
  
  )
}

export default RatingService;