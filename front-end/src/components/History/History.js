import React from 'react';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from '../../features/Services/ServiceAPI';
import { fetchBooks } from '../../features/Books/BookAPI';
import { fetchStatus } from '../../features/Status/StatusAPI';
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Divider
} from "@mui/material";
import { StyledOutlineButton } from '../Button/Button';
const History = () => {
    const dispatch = useDispatch();
    const userData = localStorage.getItem('user');
    const user = JSON.parse(userData);

     useEffect(() => {
        dispatch(fetchServices()) 
        dispatch(fetchBooks()) 
        dispatch(fetchStatus()) 
    }, [dispatch]);

    const { books } = useSelector(state => state.books);
    const { services } = useSelector(state => state.services);
    const { status } = useSelector(state => state.status);
    const service = services && services.length > 0 && services.filter((i) => i.employee_id === user.id)
   
    const bookUser = user.role_id ==3 ? 
    (books && books.length > 0 && books.filter((i) => i.customer_id === user.id))
    :
    (books && books.length > 0 && books.filter((i) => service?.some((item) => item.id === i.service_id)))

  return (
    <Box>
         {bookUser && bookUser.length > 0 && bookUser.map((item)=>{
                const serviceBook = services && services.length > 0 && services.find((i) => i.id === item.service_id)
                const statusBook = status && status.length > 0 && status.find((i) => i.id === item.status_id)
                const dateObject = new Date(item.status_update);
                const year = dateObject.getFullYear();
                const month = String(dateObject.getMonth() + 1).padStart(2, '0');
                const day = String(dateObject.getDate()).padStart(2, '0');
                const hours = String(dateObject.getHours()).padStart(2, '0');
                const minutes = String(dateObject.getMinutes()).padStart(2, '0');
                const seconds = String(dateObject.getSeconds()).padStart(2, '0');
                const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;;
                return (
                    <Box mt={"100px"} mb={"100px"} >
                        <Box sx={{width: {xs: "100%", sm: "70%"}, margin: "0 auto", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", padding: "50px"}}  > 
                            <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, alignItems: 'center', justifyContent:'flex-end', gap: '20px 20px'}}>
                                 <Typography variant="body1"  textAlign={"center"} sx={{color: "#5a5a5a"}}>
                                    Trạng thái: 
                                </Typography>
                                 <Typography variant="body1"  textAlign={"center"} sx={{color: "#cf881d", fontWeight: 500}}>
                                    {statusBook.name}
                                </Typography>
                                <Typography variant="body1"  textAlign={"center"} sx={{color: "#5a5a5a"}}>
                                    Cập nhật: 
                                </Typography>
                                <Typography variant="body1"  textAlign={"center"} sx={{color: "#cf881d", fontWeight: 500}}>
                                     {formattedDate}
                                </Typography>   
                            </Box>  
                            <Divider></Divider>
                            <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, alignItems: 'center', justifyContent: 'space-between', gap: '20px 20px'}} mt={5}>
                                <Box sx={{display: 'flex',flexDirection: {xs: 'column', sm: 'row'}, alignItems: 'center', gap: '10px 20px'}}>
                                <Typography variant="h6" sx={{color: "#5a5a5a"}}   >
                                     Dịch vụ:
                                </Typography> 
                                 <Typography variant="h6"  sx={{color: "#cf881d", textTransform: "uppercase"}} >
                                      {serviceBook.name}
                                </Typography>
                                </Box>
                                 <Typography variant="body1" sx={{color: "#5a5a5a"}}   >
                                      Ngày đặt: {item.book_date}
                                </Typography>
                                <StyledOutlineButton size="large" variant="contained" sx={{marginBottom: "20px"}} >
                                   <Link to={`/history-detail/${item.id}`}>
                                        Chi tiết
                                    </Link> 
                                </StyledOutlineButton>
                            </Box>  
                               
                        
                        </Box>
                    </Box>
        
                )
            })}
    </Box>
  )
}

export default History;