import React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUser } from '../../features/Users/UserAPI';
import { fetchAllRate } from '../../features/Rates/RatesAPI';
import { fetchBooks } from '../../features/Books/BookAPI';
import { Box, Typography, Container } from "@mui/material";
import Diversity1Icon from '@mui/icons-material/Diversity1';
import Groups2Icon from '@mui/icons-material/Groups2';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import './Intro.scss'

const Intro = () => {
    const dispatch = useDispatch();
     useEffect(() => {
        dispatch(fetchAllUser()) 
        dispatch(fetchAllRate()) 
        dispatch(fetchBooks()) 
    }, [dispatch]);
    const { users } = useSelector(state => state.users);
    const { rates } = useSelector(state => state.rates);
    const { books } = useSelector(state => state.books);
    const employee = users?.filter(item => item.role_id === 2).length;
    const rate = rates?.filter(item => item.rate >= 3).length;
    const books_finish = books?.filter(item => item.status_id === 6).length;
  return (
    <Box className="intro" mt={"100px"} mb={"50px"}>
      <Container maxWidth="lg">
        <Box className='intro-content' sx={{display: 'flex' , flexDirection: {xs: 'column', sm: 'row'}, gap: {xs: '50px 0', sm: '0 50px'}, alignItems: {xs: 'flex-start', sm: 'center'}, margin: {xs: '0 20%', sm: '0'}}}>
            <Box className='intro-item'>
                <Box>
                    <Diversity1Icon sx={{fontSize: '60px'}}/>
                </Box>
                <Box>
                    <Typography className='intro-number'>{rate}+</Typography>
                    <Typography className='intro-info'>Khách hàng hài lòng</Typography>
                </Box>
            </Box>
            <Box className='intro-item'>
                <Box>
                    <AssignmentTurnedInIcon sx={{fontSize: '60px'}}/>
                </Box>
                <Box>
                    <Typography className='intro-number'>{books_finish}+</Typography>
                    <Typography className='intro-info'>Công việc được hoàn thành</Typography>
                </Box>
            </Box>
            <Box className='intro-item'>
                <Box>
                    <Groups2Icon sx={{fontSize: '60px'}}/>
                </Box>
                <Box>
                    <Typography className='intro-number'>{employee}+</Typography>
                    <Typography className='intro-info'>Cộng tác viên</Typography>
                </Box>
            </Box>
        </Box>
      </Container>
    </Box>
  );
};
export default Intro;
