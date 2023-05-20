import React from 'react';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from '../../features/Services/ServiceAPI';
import { fetchBooks, UpdateStatus } from '../../features/Books/BookAPI';
import { fetchStatus } from '../../features/Status/StatusAPI';
import { fetchAllUser } from '../../features/Users/UserAPI';
import { fetchAllRate } from '../../features/Rates/RatesAPI';
import { updateBookStatus } from '../../features/Books/BookSlice';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Divider,
  Select,
  MenuItem
} from "@mui/material";
import { StyledOutlineButton } from '../Button/Button';
import { StyledFillButton } from '../Button/Button';
const HistoryDetail = () => {
    const { id } = useParams();
    const bookId =parseInt(id)
    const dispatch = useDispatch();
    const userData = localStorage.getItem('user');
    const user = JSON.parse(userData);

     useEffect(() => {
        dispatch(fetchServices()) 
        dispatch(fetchBooks()) 
        dispatch(fetchStatus()) 
        dispatch(fetchAllUser()) 
        dispatch(fetchAllRate()) 
    }, [dispatch]);

    const { books } = useSelector(state => state.books);
    const { users } = useSelector(state => state.users);
    const { rates } = useSelector(state => state.rates);
    const { services } = useSelector(state => state.services);
    const { status } = useSelector(state => state.status);
    const book = books && books.length > 0 && books.find((i) => i.id === bookId)
    const customer = users && users.length > 0 && users.find((i) => i.id === book.customer_id)
    const serviceBook = services && services.length > 0 && services.find((i) => i.id === book.service_id)
    const employee = users && users.length > 0 && users.find((i) => i.id === serviceBook.employee_id)
    const statusBook = status && status.length > 0 && status.find((i) => i.id === book.status_id)
    // workdate
    const workdate = new Date(book.start_time);
    const work_year = workdate.getFullYear();
    const work_month = String(workdate.getMonth() + 1).padStart(2, '0');
    const work_day = String(workdate.getDate()).padStart(2, '0');
    const work_hours = String(workdate.getHours()).padStart(2, '0');
    const work_minutes = String(workdate.getMinutes()).padStart(2, '0');
    const work_seconds = String(workdate.getSeconds()).padStart(2, '0');
    const start_time = `${work_year}-${work_month}-${work_day} ${work_hours}:${work_minutes}:${work_seconds}`;
    
    // update date
    const date = new Date(book.status_update);
    const status_year = date.getFullYear();
    const status_month = String(date.getMonth() + 1).padStart(2, '0');
    const status_day = String(date.getDate()).padStart(2, '0');
    const status_hours = String(date.getHours()).padStart(2, '0');
    const status_minutes = String(date.getMinutes()).padStart(2, '0');
    const status_seconds = String(date.getSeconds()).padStart(2, '0');
    const update_status = `${status_year}-${status_month}-${status_day} ${status_hours}:${status_minutes}:${status_seconds}`;


    

  
   const check_rate = rates.some(i => i.service_id === serviceBook.id && i.customer_id === user.id  );

//    cập nhật trạng thái
    const [open, setOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(statusBook);
    const [updateStatus, setUpdateStatus] = useState(update_status);
   const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };
  const handleClickOpen = () => {
    setOpen(true);
  };
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Tháng được đếm từ 0, nên cần +1
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const dateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    
    const handleChangeStatus = (event) => {
    const status = event.target.value;
    const status_update = dateTime
    setOpen(false);
    setSelectedStatus(status);
    setUpdateStatus(status_update)
    const status_id = status.id
    const update ={
        status_id,
        status_update
    }
    dispatch(UpdateStatus(bookId, update)) 
  };

  const isMenuItemDisabled = (menuItemIndex) => {
  return menuItemIndex < selectedStatus.id - 1;
};
  const disable = selectedStatus.id === 6 || selectedStatus.id === 7
  return (
    <Box mt={"100px"} mb={"100px"}>    
        <Typography variant="h4"  textAlign={"center"} sx={{color: "#cf881d",textTransform: "uppercase"}} mb={5}>
                    Chi tiết đơn đặt dịch vụ
        </Typography>  
          
        <Box sx={{width: {xs: "100%", sm: "70%"}, margin: "0 auto", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", padding: "50px"}}  > 
            <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, alignItems: {xs: 'flex-start', sm: 'center'}, justifyContent: 'space-between', gap: '20px 20px'}} mb={3}>
                <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, alignItems: {xs: 'flex-start', sm: 'center'}, justifyContent:'flex-start', gap: '20px 20px'}}>
                    <Typography variant="body1"  textAlign={"center"} sx={{color: "#5a5a5a"}}>
                        Trạng thái: 
                    </Typography>
                    <Typography variant="body1"  textAlign={"center"} sx={{color: "#cf881d", fontWeight: 500}}>
                            {selectedStatus.name ? selectedStatus.name : statusBook.name}
                    </Typography>
                    <Typography variant="body1"  textAlign={"center"} sx={{color: "#5a5a5a"}}>
                            Cập nhật: 
                    </Typography>
                    <Typography variant="body1"  textAlign={"center"} sx={{color: "#cf881d", fontWeight: 500}}>
                            {updateStatus}
                    </Typography>   
                </Box>  
                {user.role_id === 2 ? 
                <>
                {!open ? 
                <StyledFillButton size="large" variant="contained"  disabled={disable ? true : false} onClick={handleClickOpen}>
                        Cập nhật
                </StyledFillButton>
                :
                <Select
                      value={selectedStatus.id}
                      variant="standard"
                      label="Tiến độ"
                     onChange={handleChangeStatus}
                     onClose={handleClose}
                      sx={{
                        borderColor: "#fa8d22",
                          '&:before': {
                            borderBottom: 'none', 
                          },
                          '&:after': {
                            borderBottom: 'none', 
                          },
                          '&:hover:not(.Mui-disabled):before': {
                            borderBottom: 'none', 
                          },
                          '& .MuiInputBase-input': {
                            textDecoration: 'none', 
                          },
                        '& .MuiSelect-select': {
                          height: '20px',
                        },
                      }}
                  >
                      {status && status.length > 0 && status.map((i, index) => (
                          <MenuItem
                          key={i.id}
                          value={i}
                          disabled={isMenuItemDisabled(index)}
                          >
                          {i.name}
                          </MenuItem>
                      ))}
                  </Select>
            
                }
                </>
                : null
                }
            
            </Box>
            <Divider></Divider>
            <Box sx={{display: 'flex', flexDirection: {xs: 'column'}, justifyContent: 'space-between', gap: '20px 20px'}} mt={5}>
                 <Typography variant="h6"  sx={{color: "#cf881d", textTransform: "uppercase"}} >
                        {serviceBook?.name}
                </Typography>
                <Box sx={{display: 'flex',flexDirection: {xs: 'column', sm: 'row'}, gap: '10px 20px'}}>
                   <Typography variant="body1"    >
                             Ngày đặt: 
                    </Typography>
                     <Typography variant="body1"  sx={{color: "#5a5a5a"}}  >
                            {book?.book_date}
                    </Typography>
                </Box>
                <Box sx={{display: 'flex',flexDirection: {xs: 'column', sm: 'row'}, gap: '10px 20px'}}>
                   <Typography variant="body1"    >
                             Nơi làm việc/giao hàng: 
                    </Typography>
                     <Typography variant="body1"  sx={{color: "#5a5a5a"}}  >
                            {book?.workplace}
                    </Typography>
                </Box>
                <Box sx={{display: 'flex',flexDirection: {xs: 'column', sm: 'row'}, alignItems: {xs: 'flex-start', sm: 'center'}, gap: '10px 20px'}}>
                   <Typography variant="body1"    >
                             Bắt đầu công việc từ lúc: 
                    </Typography>
                     <Typography variant="body1"  sx={{color: "#5a5a5a"}}  >
                            {start_time}
                    </Typography>
                </Box>
                <Box sx={{display: 'flex',flexDirection: {xs: 'column', sm: 'row'}, alignItems: {xs: 'flex-start', sm: 'center'}, gap: '10px 20px'}}>
                   <Typography variant="body1"    >
                             Thời gian hoàn thành công việc: 
                    </Typography>
                     <Typography variant="body1"  sx={{color: "#5a5a5a"}}  >
                            {book?.timer} tiếng
                    </Typography>
                </Box>
                 <Box sx={{display: 'flex',flexDirection: {xs: 'column', sm: 'row'}, alignItems: {xs: 'flex-start', sm: 'center'}, gap: '10px 20px'}}>
                   <Typography variant="body1"    >
                             Các yêu cầu: 
                    </Typography>
                     <Typography variant="body1"  sx={{color: "#5a5a5a"}}  >
                            {book?.note}
                    </Typography>
                </Box>
                <Box sx={{display: 'flex',flexDirection: {xs: 'column', sm: 'row'}, alignItems: {xs: 'flex-start', sm: 'center'}, gap: '10px 20px'}}>
                   <Typography variant="body1"    >
                             Hình thức thanh toán: 
                    </Typography>
                     <Typography variant="body1"  sx={{color: "#5a5a5a"}}  >
                            Tiền mặt
                    </Typography>
                </Box>
                 <Typography variant="body1"  sx={{color: "#cf881d"}}  >
                             Cộng tác viên: 
                </Typography>
                 <Box sx={{display: 'flex',flexDirection: {xs: 'column', sm: 'row'}, alignItems: {xs: 'flex-start', sm: 'center'}, gap: '10px 20px'}}>
                    <Typography variant="body1" >
                                Họ tên: 
                    </Typography>
                    <Typography variant="body1"  sx={{color: "#5a5a5a"}}  >
                                {employee?.first_name} {employee?.last_name}
                    </Typography>
                </Box>
                <Box sx={{display: 'flex',flexDirection: {xs: 'column', sm: 'row'}, alignItems: {xs: 'flex-start', sm: 'center'}, gap: '10px 20px'}}>
                    <Typography variant="body1"  >
                                Địa chỉ liên hệ: 
                    </Typography>
                    <Typography variant="body1"  sx={{color: "#5a5a5a"}}  >
                                {employee?.address}
                    </Typography>
                </Box>
                <Box sx={{display: 'flex',flexDirection: {xs: 'column', sm: 'row'},alignItems: {xs: 'flex-start', sm: 'center'}, gap: '10px 20px'}}>
                    <Typography variant="body1" >
                                Email: 
                    </Typography>
                    <Typography variant="body1"  sx={{color: "#5a5a5a"}}  >
                                {employee?.email}
                    </Typography>
                </Box>
                <Box sx={{display: 'flex',flexDirection: {xs: 'column', sm: 'row'}, alignItems: {xs: 'flex-start', sm: 'center'}, gap: '10px 20px'}}>
                    <Typography variant="body1"  >
                                Điện thoại: 
                    </Typography>
                    <Typography variant="body1"  sx={{color: "#5a5a5a"}}  >
                                {employee?.phone}
                    </Typography>
                </Box>
                <Typography variant="body1"  sx={{color: "#cf881d"}}  >
                             Khách hàng: 
                </Typography>
                 <Box sx={{display: 'flex',flexDirection: {xs: 'column', sm: 'row'}, alignItems: {xs: 'flex-start', sm: 'center'}, gap: '10px 20px'}}>
                   <Typography variant="body1"   >
                            Họ tên:
                    </Typography>
                    <Typography variant="body1"  sx={{color: "#5a5a5a"}}  >
                            {customer?.first_name} {customer?.last_name}
                    </Typography>
                </Box>      
                <Box sx={{display: 'flex',flexDirection: {xs: 'column', sm: 'row'}, alignItems: {xs: 'flex-start', sm: 'center'}, gap: '10px 20px'}}>
                   <Typography variant="body1"   >
                            Địa chỉ:
                    </Typography>
                      <Typography variant="body1"  sx={{color: "#5a5a5a"}}  >
                            {customer?.address}
                    </Typography>
                </Box>   
                <Box sx={{display: 'flex',flexDirection: {xs: 'column', sm: 'row'}, alignItems: {xs: 'flex-start', sm: 'center'}, gap: '10px 20px'}}>
                   <Typography variant="body1"   >
                            Email:
                    </Typography>
                      <Typography variant="body1"  sx={{color: "#5a5a5a"}}  >
                            {customer?.email}
                    </Typography>
                </Box>  
                <Box sx={{display: 'flex',flexDirection: {xs: 'column', sm: 'row'}, gap: '10px 20px'}}>
                   <Typography variant="body1"   >
                            Số điện thoại:
                    </Typography>
                      <Typography variant="body1"  sx={{color: "#5a5a5a"}}  >
                            {customer?.phone}
                    </Typography>
                </Box> 
                 {user.role_id === 3 && selectedStatus.id ===6 ? 
                <StyledFillButton size="large" variant="contained"  disabled={check_rate ? true : false}>
                       <Link to={`/rating-service/${serviceBook.id}`}>
                            Đánh giá
                        </Link> 
                </StyledFillButton>
                : null
            }  
            </Box>                                         
        </Box>     
    </Box>
  )
}



export default HistoryDetail;